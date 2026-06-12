import { Calendar } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { FormSubmission } from "@shared/schema";

export const BUY_NOW_FORM_NAME = "Buy Now Quote Request";

export type YesNo = "yes" | "no";

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
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

export function createYesNoDefaults(keys: string[]): Record<string, YesNo> {
  return Object.fromEntries(keys.map((key) => [key, "no"]));
}

export function BlueSection({
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

export function FieldLabel({
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

export function TextField({
  id,
  value,
  onChange,
  required = false,
  type = "text",
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      className="buy-now-standard-input mt-1.5"
    />
  );
}

export function TextAreaField({
  id,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 3,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <Textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className="buy-now-standard-input mt-1.5 min-h-[88px]"
    />
  );
}

export function DateField({
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

export function SelectField({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="buy-now-standard-input buy-now-select-trigger mt-1.5">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function YesNoField({
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

export function OptionPicker<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <div className="buy-now-vehicle-class-grid">
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <label
              key={option.id}
              className={`buy-now-vehicle-class-option${isSelected ? " buy-now-vehicle-class-option-active" : ""}`}
            >
              <input
                type="radio"
                name={label}
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <span className="buy-now-vehicle-class-radio" aria-hidden />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function SubmitButton({
  isPending,
  label = "Submit quote request",
  disabled = false,
}: {
  isPending: boolean;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <div className="buy-now-form-actions">
      <Button
        type="submit"
        className="btn-cta w-full sm:w-auto normal-case tracking-normal"
        disabled={isPending || disabled}
      >
        {isPending ? "Sending…" : label}
      </Button>
    </div>
  );
}

export function useBuyNowQuoteSubmit(insuranceType: string, onReset: () => void) {
  const { toast } = useToast();

  return useMutation({
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
      onReset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });
}

export function buildSubmission(
  insuranceType: string,
  contact: { name: string; email: string; phone: string },
  messageLines: (string | null | undefined)[],
): FormSubmission {
  const { firstName, lastName } = splitFullName(contact.name);
  return {
    formName: BUY_NOW_FORM_NAME,
    firstName,
    lastName,
    email: contact.email,
    phone: contact.phone,
    insuranceType,
    message: messageLines.filter(Boolean).join("\n"),
  };
}

export function BenefitsGrid({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="buy-now-split-columns">
      <div className="buy-now-split-column space-y-5">{left}</div>
      <div className="buy-now-split-column space-y-5">{right}</div>
    </div>
  );
}
