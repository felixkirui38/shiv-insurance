import { useState } from "react";
import {
  Calendar,
  CheckSquare,
  Gauge,
  Mail,
  Smartphone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { FormSubmission } from "@shared/schema";

const FORM_NAME = "Buy Now Quote Request";

const vehicleClasses = [
  { id: "private-car", label: "Private Car" },
  { id: "commercial", label: "Commercial Vehicles" },
  { id: "psv", label: "PSV" },
  { id: "motorbike", label: "Motorbike" },
  { id: "tuk-tuk", label: "Tuk Tuk" },
] as const;

const currentYear = new Date().getFullYear();
const manufactureYears = Array.from({ length: currentYear - 1984 }, (_, i) =>
  String(currentYear - i),
);

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

function FormSection({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="buy-now-form-section">
      <div className="buy-now-form-section-header">
        <span className="buy-now-form-step" aria-hidden>
          {step}
        </span>
        <h3 className="buy-now-form-section-title">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <Label htmlFor={htmlFor} className="buy-now-field-label">
      {children} <span className="text-red-500">*</span>
    </Label>
  );
}

export function MotorInsuranceQuoteForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    vehicleClass: "private-car",
    fullName: "",
    email: "",
    phone: "",
    vehicleValue: "",
    yearOfManufacture: "",
    professionallyValued: "no",
  });

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
          "Thank you! Our team will contact you shortly with motor insurance options and pricing.",
      });
      setFormData({
        vehicleClass: "private-car",
        fullName: "",
        email: "",
        phone: "",
        vehicleValue: "",
        yearOfManufacture: "",
        professionallyValued: "no",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicleLabel =
      vehicleClasses.find((v) => v.id === formData.vehicleClass)?.label ?? formData.vehicleClass;
    const { firstName, lastName } = splitFullName(formData.fullName);

    const message = [
      `Motor insurance class: ${vehicleLabel}`,
      `Vehicle value (KES): ${formData.vehicleValue}`,
      `Year of manufacture: ${formData.yearOfManufacture}`,
      `Valued by professional in last 18 months: ${formData.professionallyValued === "yes" ? "Yes" : "No"}`,
    ].join("\n");

    quoteMutation.mutate({
      formName: FORM_NAME,
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      insuranceType: "Motor Insurance",
      message,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="buy-now-motor-form" data-testid="motor-quote-form">
      <FormSection step={1} title="What class of motor insurance do you need?">
        <div
          className="buy-now-vehicle-class-grid"
          role="radiogroup"
          aria-label="Motor insurance class"
        >
          {vehicleClasses.map((option) => {
            const isSelected = formData.vehicleClass === option.id;
            return (
              <label
                key={option.id}
                className={`buy-now-vehicle-class-option${isSelected ? " buy-now-vehicle-class-option-active" : ""}`}
              >
                <input
                  type="radio"
                  name="vehicleClass"
                  value={option.id}
                  checked={isSelected}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, vehicleClass: option.id }))
                  }
                  className="sr-only"
                />
                <span className="buy-now-vehicle-class-radio" aria-hidden />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      </FormSection>

      <FormSection step={2} title="Personal details">
        <div className="buy-now-form-grid-3">
          <div>
            <RequiredLabel htmlFor="motor-fullName">Full name</RequiredLabel>
            <div className="buy-now-field-icon-wrap">
              <User className="buy-now-field-icon" aria-hidden />
              <Input
                id="motor-fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                required
                className="buy-now-field-input"
              />
            </div>
          </div>

          <div>
            <RequiredLabel htmlFor="motor-email">Email address</RequiredLabel>
            <div className="buy-now-field-icon-wrap">
              <Mail className="buy-now-field-icon" aria-hidden />
              <Input
                id="motor-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="buy-now-field-input"
              />
            </div>
          </div>

          <div>
            <RequiredLabel htmlFor="motor-phone">Phone number</RequiredLabel>
            <div className="buy-now-field-icon-wrap">
              <Smartphone className="buy-now-field-icon" aria-hidden />
              <Input
                id="motor-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
                className="buy-now-field-input"
              />
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection step={3} title="Vehicle details">
        <div className="buy-now-form-grid-2">
          <div>
            <RequiredLabel htmlFor="motor-vehicleValue">Vehicle value (KES)</RequiredLabel>
            <div className="buy-now-field-icon-wrap">
              <Gauge className="buy-now-field-icon" aria-hidden />
              <Input
                id="motor-vehicleValue"
                type="number"
                min="0"
                value={formData.vehicleValue}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, vehicleValue: e.target.value }))
                }
                required
                className="buy-now-field-input"
              />
            </div>
          </div>

          <div>
            <RequiredLabel htmlFor="motor-year">Year of manufacture</RequiredLabel>
            <div className="buy-now-field-icon-wrap buy-now-field-icon-wrap-select">
              <Calendar className="buy-now-field-icon" aria-hidden />
              <Select
                value={formData.yearOfManufacture}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, yearOfManufacture: value }))
                }
                required
              >
                <SelectTrigger id="motor-year" className="buy-now-field-input buy-now-select-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {manufactureYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="motor-valued" className="buy-now-field-label">
            Valued by professional in last 18 months?
          </Label>
          <div className="buy-now-field-icon-wrap buy-now-field-icon-wrap-select">
            <CheckSquare className="buy-now-field-icon" aria-hidden />
            <Select
              value={formData.professionallyValued}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, professionallyValued: value }))
              }
            >
              <SelectTrigger id="motor-valued" className="buy-now-field-input buy-now-select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      <div className="buy-now-form-actions">
        <Button
          type="submit"
          className="btn-cta w-full sm:w-auto normal-case tracking-normal"
          disabled={quoteMutation.isPending || !formData.yearOfManufacture}
        >
          {quoteMutation.isPending ? "Sending…" : "Submit quote request"}
        </Button>
      </div>
    </form>
  );
}
