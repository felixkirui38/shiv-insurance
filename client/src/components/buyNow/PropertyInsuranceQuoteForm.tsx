import { useState } from "react";
import {
  BenefitsGrid,
  BlueSection,
  DateField,
  FieldLabel,
  OptionPicker,
  SelectField,
  SubmitButton,
  TextField,
  YesNoField,
  buildSubmission,
  createYesNoDefaults,
  useBuyNowQuoteSubmit,
  type YesNo,
} from "./buyNowFormPrimitives";

const propertyTypes = [
  { id: "residential", label: "Residential Home" },
  { id: "commercial", label: "Commercial Building" },
  { id: "warehouse", label: "Warehouse / Industrial" },
  { id: "domestic-package", label: "Domestic Package" },
] as const;

const constructionTypes = [
  { value: "stone", label: "Stone / Concrete" },
  { value: "timber", label: "Timber" },
  { value: "mixed", label: "Mixed Construction" },
  { value: "other", label: "Other" },
];

const coverFields = [
  { key: "fire", label: "Fire & Allied Perils", column: "left" as const },
  { key: "burglary", label: "Burglary / Theft", column: "right" as const },
  { key: "allRisks", label: "All Risks Cover", column: "left" as const },
  { key: "businessInterruption", label: "Business Interruption", column: "right" as const },
];

type PropertyType = (typeof propertyTypes)[number]["id"];

interface FormState {
  propertyType: PropertyType;
  clientName: string;
  email: string;
  phone: string;
  idPassport: string;
  physicalAddress: string;
  propertyLocation: string;
  buildingValue: string;
  contentsValue: string;
  yearBuilt: string;
  constructionType: string;
  covers: Record<string, YesNo>;
  insuranceStartDate: string;
}

function createInitialState(): FormState {
  return {
    propertyType: "residential",
    clientName: "",
    email: "",
    phone: "",
    idPassport: "",
    physicalAddress: "",
    propertyLocation: "",
    buildingValue: "",
    contentsValue: "",
    yearBuilt: "",
    constructionType: "",
    covers: createYesNoDefaults(coverFields.map((field) => field.key)),
    insuranceStartDate: "",
  };
}

export function PropertyInsuranceQuoteForm() {
  const [formData, setFormData] = useState<FormState>(createInitialState);
  const quoteMutation = useBuyNowQuoteSubmit("Property Insurance", () =>
    setFormData(createInitialState()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const propertyLabel =
      propertyTypes.find((type) => type.id === formData.propertyType)?.label ??
      formData.propertyType;
    const constructionLabel =
      constructionTypes.find((type) => type.value === formData.constructionType)?.label ??
      formData.constructionType;

    quoteMutation.mutate(
      buildSubmission(
        "Property Insurance",
        {
          name: formData.clientName,
          email: formData.email,
          phone: formData.phone,
        },
        [
          `Property type: ${propertyLabel}`,
          `ID/Passport: ${formData.idPassport}`,
          `Physical address: ${formData.physicalAddress}`,
          `Property location: ${formData.propertyLocation}`,
          `Building value (KES): ${formData.buildingValue}`,
          `Contents value (KES): ${formData.contentsValue}`,
          `Year built: ${formData.yearBuilt}`,
          `Construction type: ${constructionLabel || "—"}`,
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
      data-testid="property-insurance-quote-form"
    >
      <BlueSection title="What type of property do you want to insure?">
        <OptionPicker
          label="Property type"
          options={[...propertyTypes]}
          value={formData.propertyType}
          onChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
        />
      </BlueSection>

      <BlueSection title="Client Information">
        <div className="buy-now-split-columns">
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="prop-clientName" required>
                Client Name
              </FieldLabel>
              <TextField
                id="prop-clientName"
                value={formData.clientName}
                onChange={(value) => setFormData((prev) => ({ ...prev, clientName: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="prop-email">Email Address</FieldLabel>
              <TextField
                id="prop-email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="prop-idPassport">ID/Passport Number</FieldLabel>
              <TextField
                id="prop-idPassport"
                value={formData.idPassport}
                onChange={(value) => setFormData((prev) => ({ ...prev, idPassport: value }))}
              />
            </div>
          </div>
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="prop-phone">Telephone / Mobile Number</FieldLabel>
              <TextField
                id="prop-phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="prop-physicalAddress">Physical Address</FieldLabel>
              <TextField
                id="prop-physicalAddress"
                value={formData.physicalAddress}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, physicalAddress: value }))
                }
              />
            </div>
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Property Details">
        <div className="buy-now-form-grid-2">
          <div>
            <FieldLabel htmlFor="prop-location" required>
              Property Location
            </FieldLabel>
            <TextField
              id="prop-location"
              value={formData.propertyLocation}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, propertyLocation: value }))
              }
              placeholder="Town, estate, or street address"
              required
            />
          </div>
          <div>
            <FieldLabel htmlFor="prop-yearBuilt">Year Built</FieldLabel>
            <TextField
              id="prop-yearBuilt"
              type="number"
              min="1900"
              value={formData.yearBuilt}
              onChange={(value) => setFormData((prev) => ({ ...prev, yearBuilt: value }))}
              placeholder="e.g. 2015"
            />
          </div>
          <div>
            <FieldLabel htmlFor="prop-buildingValue" required>
              Building Value (KES)
            </FieldLabel>
            <TextField
              id="prop-buildingValue"
              type="number"
              min="0"
              value={formData.buildingValue}
              onChange={(value) => setFormData((prev) => ({ ...prev, buildingValue: value }))}
              placeholder="e.g. 12000000"
              required
            />
          </div>
          <div>
            <FieldLabel htmlFor="prop-contentsValue">Contents Value (KES)</FieldLabel>
            <TextField
              id="prop-contentsValue"
              type="number"
              min="0"
              value={formData.contentsValue}
              onChange={(value) => setFormData((prev) => ({ ...prev, contentsValue: value }))}
              placeholder="e.g. 2500000"
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="prop-construction">Construction Type</FieldLabel>
            <SelectField
              id="prop-construction"
              value={formData.constructionType}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, constructionType: value }))
              }
              options={constructionTypes}
              placeholder="Select construction type"
            />
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Cover Required">
        <BenefitsGrid
          left={leftCovers.map(({ key, label }) => (
            <YesNoField
              key={key}
              name={`prop-cover-${key}`}
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
                name={`prop-cover-${key}`}
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
              <FieldLabel htmlFor="prop-startDate">Insurance Start Date</FieldLabel>
              <DateField
                id="prop-startDate"
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
        disabled={!formData.insuranceStartDate}
      />
    </form>
  );
}
