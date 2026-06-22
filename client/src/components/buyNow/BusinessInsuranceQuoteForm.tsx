import { useState } from "react";
import { companyData } from "@/lib/data";
import {
  BenefitsGrid,
  BlueSection,
  DateField,
  FieldLabel,
  SelectField,
  SubmitButton,
  TextField,
  YesNoField,
  buildSubmission,
  createYesNoDefaults,
  useBuyNowQuoteSubmit,
  type YesNo,
} from "./buyNowFormPrimitives";

const premisesTypes = [
  { value: "owned", label: "Owned" },
  { value: "leased", label: "Leased" },
  { value: "shared", label: "Shared / Co-working" },
];

const coverFields = [
  { key: "publicLiability", label: "Public Liability", column: "left" as const },
  { key: "professionalIndemnity", label: "Professional Indemnity", column: "right" as const },
  { key: "wiba", label: "WIBA / Employer Liability", column: "left" as const },
  { key: "productLiability", label: "Product Liability", column: "right" as const },
  { key: "cyber", label: "Cyber Insurance", column: "left" as const },
  { key: "directorsOfficers", label: "Directors & Officers", column: "right" as const },
];

const industryOptions = companyData.clientIndustries.map((industry) => ({
  value: industry.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  label: industry,
}));

interface FormState {
  businessName: string;
  registrationNumber: string;
  industry: string;
  contactPerson: string;
  email: string;
  phone: string;
  physicalAddress: string;
  employeeCount: string;
  annualTurnover: string;
  premisesType: string;
  covers: Record<string, YesNo>;
  insuranceStartDate: string;
}

function createInitialState(): FormState {
  return {
    businessName: "",
    registrationNumber: "",
    industry: "",
    contactPerson: "",
    email: "",
    phone: "",
    physicalAddress: "",
    employeeCount: "",
    annualTurnover: "",
    premisesType: "",
    covers: createYesNoDefaults(coverFields.map((field) => field.key)),
    insuranceStartDate: "",
  };
}

export function BusinessInsuranceQuoteForm() {
  const [formData, setFormData] = useState<FormState>(createInitialState);
  const quoteMutation = useBuyNowQuoteSubmit("Business Insurance", () =>
    setFormData(createInitialState()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const industryLabel =
      industryOptions.find((option) => option.value === formData.industry)?.label ??
      formData.industry;
    const premisesLabel =
      premisesTypes.find((option) => option.value === formData.premisesType)?.label ??
      formData.premisesType;

    quoteMutation.mutate(
      buildSubmission(
        "Business Insurance",
        {
          name: formData.contactPerson || formData.businessName,
          email: formData.email,
          phone: formData.phone,
        },
        [
          `Business name: ${formData.businessName}`,
          `Registration number: ${formData.registrationNumber}`,
          `Industry: ${industryLabel || "—"}`,
          `Physical address: ${formData.physicalAddress}`,
          `Number of employees: ${formData.employeeCount}`,
          `Annual turnover (KES): ${formData.annualTurnover}`,
          `Premises: ${premisesLabel || "—"}`,
          ...coverFields.map(
            ({ key, label }) => `${label}: ${formData.covers[key] === "yes" ? "Yes" : "No"}`,
          ),
          `Insurance start date: ${formData.insuranceStartDate}`,
        ],
      ),
    );
  };

  const leftCovers = coverFields.filter((field) => field.column === "left");
  const rightCovers = coverFields.filter((field) => field.column === "right");

  return (
    <form
      onSubmit={handleSubmit}
      className="buy-now-health-form"
      data-testid="business-insurance-quote-form"
    >
      <BlueSection title="Company Information">
        <div className="buy-now-split-columns">
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="biz-businessName" required>
                Business Name
              </FieldLabel>
              <TextField
                id="biz-businessName"
                value={formData.businessName}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, businessName: value }))
                }
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="biz-industry" required>
                Industry / Sector
              </FieldLabel>
              <SelectField
                id="biz-industry"
                value={formData.industry}
                onChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                options={industryOptions}
              />
            </div>
            <div>
              <FieldLabel htmlFor="biz-email">Email Address</FieldLabel>
              <TextField
                id="biz-email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="biz-address">Physical Address</FieldLabel>
              <TextField
                id="biz-address"
                value={formData.physicalAddress}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, physicalAddress: value }))
                }
              />
            </div>
          </div>
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="biz-registration">Registration Number</FieldLabel>
              <TextField
                id="biz-registration"
                value={formData.registrationNumber}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, registrationNumber: value }))
                }
              />
            </div>
            <div>
              <FieldLabel htmlFor="biz-contactPerson" required>
                Contact Person
              </FieldLabel>
              <TextField
                id="biz-contactPerson"
                value={formData.contactPerson}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, contactPerson: value }))
                }
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="biz-phone">Telephone / Mobile Number</FieldLabel>
              <TextField
                id="biz-phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="biz-employees">Number of Employees</FieldLabel>
              <TextField
                id="biz-employees"
                type="number"
                min="0"
                value={formData.employeeCount}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, employeeCount: value }))
                }
              />
            </div>
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Business Operations">
        <div className="buy-now-form-grid-2">
          <div>
            <FieldLabel htmlFor="biz-turnover">Annual Turnover (KES)</FieldLabel>
            <TextField
              id="biz-turnover"
              type="number"
              min="0"
              value={formData.annualTurnover}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, annualTurnover: value }))
              }
            />
          </div>
          <div>
            <FieldLabel htmlFor="biz-premises">Premises Owned or Leased?</FieldLabel>
            <SelectField
              id="biz-premises"
              value={formData.premisesType}
              onChange={(value) => setFormData((prev) => ({ ...prev, premisesType: value }))}
              options={premisesTypes}
            />
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Cover Required">
        <BenefitsGrid
          left={leftCovers.map(({ key, label }) => (
            <YesNoField
              key={key}
              name={`biz-cover-${key}`}
              label={label}
              value={formData.covers[key]}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  covers: { ...prev.covers, [key]: value },
                }))
              }
            />
          ))}
          right={[
            ...rightCovers.map(({ key, label }) => (
              <YesNoField
                key={key}
                name={`biz-cover-${key}`}
                label={label}
                value={formData.covers[key]}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    covers: { ...prev.covers, [key]: value },
                  }))
                }
              />
            )),
            <div key="start-date">
              <FieldLabel htmlFor="biz-startDate">Insurance Start Date</FieldLabel>
              <DateField
                id="biz-startDate"
                value={formData.insuranceStartDate}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, insuranceStartDate: value }))
                }
                required
              />
            </div>,
          ]}
        />
      </BlueSection>

      <SubmitButton
        isPending={quoteMutation.isPending}
        disabled={!formData.industry || !formData.insuranceStartDate}
      />
    </form>
  );
}
