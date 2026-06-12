import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./buyNowFormPrimitives";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { FormSubmission } from "@shared/schema";

const FORM_NAME = "Buy Now Quote Request";
const CHILD_COUNT = 4;

type YesNo = "yes" | "no";

const medicalBenefitFields = [
  { key: "inpatient", label: "Inpatient Benefit", column: "left" as const },
  { key: "maternity", label: "Maternity Benefit", column: "right" as const },
  { key: "outpatient", label: "Outpatient Benefit", column: "left" as const },
  { key: "opticalDental", label: "Optical/Dental Benefit", column: "right" as const },
  { key: "lastExpense", label: "Last Expense Benefit", column: "left" as const },
];

const lifeBenefitFields = [
  { key: "lifeCover", label: "Life Cover Benefit", column: "left" as const },
  { key: "educationSavings", label: "Education Savings Benefit", column: "right" as const },
  { key: "criticalIllness", label: "Critical Illness Benefit", column: "left" as const },
  { key: "disability", label: "Disability Benefit", column: "right" as const },
  { key: "lastExpense", label: "Last Expense Benefit", column: "left" as const },
];

interface ChildEntry {
  name: string;
  dateOfBirth: string;
}

interface FormState {
  clientName: string;
  physicalAddress: string;
  postalAddress: string;
  idPassport: string;
  kraPin: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  occupation: string;
  spouseName: string;
  spouseDateOfBirth: string;
  children: ChildEntry[];
  benefits: Record<string, YesNo>;
  insuranceStartDate: string;
}

function createInitialBenefits(keys: string[]): Record<string, YesNo> {
  return Object.fromEntries(keys.map((key) => [key, "no"]));
}

function createInitialState(benefitKeys: string[]): FormState {
  return {
    clientName: "",
    physicalAddress: "",
    postalAddress: "",
    idPassport: "",
    kraPin: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    occupation: "",
    spouseName: "",
    spouseDateOfBirth: "",
    children: Array.from({ length: CHILD_COUNT }, () => ({ name: "", dateOfBirth: "" })),
    benefits: createInitialBenefits(benefitKeys),
    insuranceStartDate: "",
  };
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) {
    return { firstName: trimmed, lastName: "-" };
  }
  return {
    firstName: trimmed.slice(0, space),
    lastName: trimmed.slice(space + 1).trim() || "-",
  };
}

function BlueSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="buy-now-form-section">
      <h3 className="buy-now-form-blue-title">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <Label htmlFor={htmlFor} className="buy-now-field-label-normal">
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </Label>
  );
}

function TextField({
  id,
  value,
  onChange,
  required = false,
  type = "text",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="buy-now-standard-input mt-1.5"
    />
  );
}

function DateField({
  id,
  value,
  onChange,
  required = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div className="buy-now-date-field-wrap mt-1.5">
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="buy-now-standard-input buy-now-date-input"
      />
      <Calendar className="buy-now-date-icon" aria-hidden />
    </div>
  );
}

function YesNoBenefit({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
}) {
  return (
    <fieldset className="buy-now-yes-no-field">
      <legend className="buy-now-field-label-normal">{label}</legend>
      <div className="buy-now-yes-no-options" role="radiogroup" aria-label={label}>
        {(["yes", "no"] as const).map((option) => (
          <label key={option} className="buy-now-yes-no-option">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option === "yes" ? "Yes" : "No"}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function HealthLifeInsuranceQuoteForm({
  insuranceType,
}: {
  insuranceType: "Life Insurance" | "Medical Insurance";
}) {
  const benefitFields =
    insuranceType === "Medical Insurance" ? medicalBenefitFields : lifeBenefitFields;
  const benefitKeys = useMemo(
    () => benefitFields.map((field) => field.key),
    [benefitFields],
  );

  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>(() => createInitialState(benefitKeys));

  const quoteMutation = useMutation({
    mutationFn: async (submission: FormSubmission) => {
      const response = await apiRequest("POST", "/api/submit-form", submission);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Quote request received",
        description:
          data.message ||
          `Thank you! Our team will contact you shortly regarding your ${insuranceType.toLowerCase()} quote request.`,
      });
      setFormData(createInitialState(benefitKeys));
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const updateChild = (index: number, field: keyof ChildEntry, value: string) => {
    setFormData((prev) => {
      const children = [...prev.children];
      children[index] = { ...children[index], [field]: value };
      return { ...prev, children };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName } = splitFullName(formData.clientName);

    const childrenLines = formData.children
      .map((child, index) => {
        if (!child.name && !child.dateOfBirth) return null;
        return `Child ${index + 1}: ${child.name || "—"}, DOB: ${child.dateOfBirth || "—"}`;
      })
      .filter(Boolean);

    const benefitLines = benefitFields.map(
      ({ key, label }) => `${label}: ${formData.benefits[key] === "yes" ? "Yes" : "No"}`,
    );

    const message = [
      `Application type: ${insuranceType}`,
      `Physical address: ${formData.physicalAddress}`,
      `Postal address: ${formData.postalAddress}`,
      `ID/Passport: ${formData.idPassport}`,
      `KRA PIN: ${formData.kraPin}`,
      `Date of birth: ${formData.dateOfBirth}`,
      `Occupation: ${formData.occupation}`,
      formData.spouseName || formData.spouseDateOfBirth
        ? `Spouse: ${formData.spouseName || "—"}, DOB: ${formData.spouseDateOfBirth || "—"}`
        : null,
      childrenLines.length ? `Children:\n${childrenLines.join("\n")}` : null,
      `Benefits:\n${benefitLines.join("\n")}`,
      `Insurance start date: ${formData.insuranceStartDate}`,
    ]
      .filter(Boolean)
      .join("\n");

    quoteMutation.mutate({
      formName: FORM_NAME,
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      insuranceType,
      message,
    });
  };

  const leftBenefits = benefitFields.filter((field) => field.column === "left");
  const rightBenefits = benefitFields.filter((field) => field.column === "right");

  return (
    <form
      onSubmit={handleSubmit}
      className="buy-now-health-form"
      data-testid={`${insuranceType.toLowerCase().replace(/\s+/g, "-")}-quote-form`}
    >
      <BlueSection title="Client Information">
        <div className="buy-now-split-columns">
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="hl-clientName" required>
                Client Name
              </FieldLabel>
              <TextField
                id="hl-clientName"
                value={formData.clientName}
                onChange={(value) => setFormData((prev) => ({ ...prev, clientName: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-physicalAddress">Physical Address</FieldLabel>
              <TextField
                id="hl-physicalAddress"
                value={formData.physicalAddress}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, physicalAddress: value }))
                }
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-idPassport">ID/Passport Number</FieldLabel>
              <TextField
                id="hl-idPassport"
                value={formData.idPassport}
                onChange={(value) => setFormData((prev) => ({ ...prev, idPassport: value }))}
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-email">Email Address</FieldLabel>
              <TextField
                id="hl-email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-occupation">Occupation</FieldLabel>
              <TextField
                id="hl-occupation"
                value={formData.occupation}
                onChange={(value) => setFormData((prev) => ({ ...prev, occupation: value }))}
              />
            </div>
          </div>

          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="hl-postalAddress">Postal Address</FieldLabel>
              <TextField
                id="hl-postalAddress"
                value={formData.postalAddress}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, postalAddress: value }))
                }
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-kraPin">KRA Pin Number</FieldLabel>
              <TextField
                id="hl-kraPin"
                value={formData.kraPin}
                onChange={(value) => setFormData((prev) => ({ ...prev, kraPin: value }))}
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-phone">Telephone / Mobile Number</FieldLabel>
              <TextField
                id="hl-phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="hl-dob">Date of Birth</FieldLabel>
              <DateField
                id="hl-dob"
                value={formData.dateOfBirth}
                onChange={(value) => setFormData((prev) => ({ ...prev, dateOfBirth: value }))}
              />
            </div>
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Spouse Information (Optional)">
        <div className="buy-now-form-grid-2">
          <div>
            <FieldLabel htmlFor="hl-spouseName">Spouse Name</FieldLabel>
            <TextField
              id="hl-spouseName"
              value={formData.spouseName}
              onChange={(value) => setFormData((prev) => ({ ...prev, spouseName: value }))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="hl-spouseDob">Spouse Date of Birth</FieldLabel>
            <DateField
              id="hl-spouseDob"
              value={formData.spouseDateOfBirth}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, spouseDateOfBirth: value }))
              }
            />
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Children Information">
        <div className="space-y-5">
          {formData.children.map((child, index) => (
            <div key={index} className="buy-now-form-grid-2">
              <div>
                <FieldLabel htmlFor={`hl-child-name-${index}`}>
                  {`Child ${index + 1} Name`}
                </FieldLabel>
                <TextField
                  id={`hl-child-name-${index}`}
                  value={child.name}
                  onChange={(value) => updateChild(index, "name", value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor={`hl-child-dob-${index}`}>
                  {`Child ${index + 1} Date of Birth`}
                </FieldLabel>
                <DateField
                  id={`hl-child-dob-${index}`}
                  value={child.dateOfBirth}
                  onChange={(value) => updateChild(index, "dateOfBirth", value)}
                />
              </div>
            </div>
          ))}
        </div>
      </BlueSection>

      <BlueSection title="Insurance Benefits">
        <div className="buy-now-split-columns">
          <div className="buy-now-split-column space-y-5">
            {leftBenefits.map(({ key, label }) => (
              <YesNoBenefit
                key={key}
                name={`benefit-${key}`}
                label={label}
                value={formData.benefits[key]}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    benefits: { ...prev.benefits, [key]: value },
                  }))
                }
              />
            ))}
          </div>

          <div className="buy-now-split-column space-y-5">
            {rightBenefits.map(({ key, label }) => (
              <YesNoBenefit
                key={key}
                name={`benefit-${key}`}
                label={label}
                value={formData.benefits[key]}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    benefits: { ...prev.benefits, [key]: value },
                  }))
                }
              />
            ))}

            <div>
              <FieldLabel htmlFor="hl-startDate">Insurance Start Date</FieldLabel>
              <DateField
                id="hl-startDate"
                value={formData.insuranceStartDate}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, insuranceStartDate: value }))
                }
                required
              />
            </div>
          </div>
        </div>
      </BlueSection>

      <SubmitButton isPending={quoteMutation.isPending} />
    </form>
  );
}
