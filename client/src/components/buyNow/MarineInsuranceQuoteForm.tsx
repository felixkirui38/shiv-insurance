import { useState } from "react";
import {
  BenefitsGrid,
  BlueSection,
  DateField,
  FieldLabel,
  OptionPicker,
  SelectField,
  SubmitButton,
  TextAreaField,
  TextField,
  YesNoField,
  buildSubmission,
  createYesNoDefaults,
  useBuyNowQuoteSubmit,
  type YesNo,
} from "./buyNowFormPrimitives";

const shipmentTypes = [
  { id: "import", label: "Import" },
  { id: "export", label: "Export" },
  { id: "domestic", label: "Domestic Transit" },
  { id: "goods-in-transit", label: "Goods in Transit" },
] as const;

const transportModes = [
  { value: "sea", label: "Sea" },
  { value: "road", label: "Road" },
  { value: "air", label: "Air" },
  { value: "rail", label: "Rail" },
  { value: "multimodal", label: "Multimodal" },
];

const coverFields = [
  { key: "marineCargo", label: "Marine Cargo All Risks", column: "left" as const },
  { key: "goodsInTransit", label: "Goods in Transit", column: "right" as const },
  { key: "hullMachinery", label: "Hull & Machinery", column: "left" as const },
  { key: "freightLiability", label: "Freight Forwarder Liability", column: "right" as const },
];

type ShipmentType = (typeof shipmentTypes)[number]["id"];

interface FormState {
  shipmentType: ShipmentType;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  kraPin: string;
  cargoDescription: string;
  origin: string;
  destination: string;
  transportMode: string;
  cargoValue: string;
  weightVolume: string;
  covers: Record<string, YesNo>;
  departureDate: string;
}

function createInitialState(): FormState {
  return {
    shipmentType: "import",
    clientName: "",
    contactPerson: "",
    email: "",
    phone: "",
    kraPin: "",
    cargoDescription: "",
    origin: "",
    destination: "",
    transportMode: "",
    cargoValue: "",
    weightVolume: "",
    covers: createYesNoDefaults(coverFields.map((field) => field.key)),
    departureDate: "",
  };
}

export function MarineInsuranceQuoteForm() {
  const [formData, setFormData] = useState<FormState>(createInitialState);
  const quoteMutation = useBuyNowQuoteSubmit("Marine Insurance", () =>
    setFormData(createInitialState()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shipmentLabel =
      shipmentTypes.find((type) => type.id === formData.shipmentType)?.label ??
      formData.shipmentType;
    const transportLabel =
      transportModes.find((mode) => mode.value === formData.transportMode)?.label ??
      formData.transportMode;

    quoteMutation.mutate(
      buildSubmission(
        "Marine Insurance",
        {
          name: formData.contactPerson || formData.clientName,
          email: formData.email,
          phone: formData.phone,
        },
        [
          `Shipment type: ${shipmentLabel}`,
          `Client / company: ${formData.clientName}`,
          `Contact person: ${formData.contactPerson}`,
          `KRA PIN: ${formData.kraPin}`,
          `Cargo description: ${formData.cargoDescription}`,
          `Origin: ${formData.origin}`,
          `Destination: ${formData.destination}`,
          `Mode of transport: ${transportLabel || "—"}`,
          `Estimated cargo value (KES): ${formData.cargoValue}`,
          `Weight / volume: ${formData.weightVolume}`,
          ...coverFields.map(
            ({ key, label }) => `${label}: ${formData.covers[key] === "yes" ? "Yes" : "No"}`,
          ),
          `Expected departure / shipping date: ${formData.departureDate}`,
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
      data-testid="marine-insurance-quote-form"
    >
      <BlueSection title="What type of marine cover do you need?">
        <OptionPicker
          label="Shipment type"
          options={[...shipmentTypes]}
          value={formData.shipmentType}
          onChange={(value) => setFormData((prev) => ({ ...prev, shipmentType: value }))}
        />
      </BlueSection>

      <BlueSection title="Client Information">
        <div className="buy-now-split-columns">
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="marine-clientName" required>
                Client / Company Name
              </FieldLabel>
              <TextField
                id="marine-clientName"
                value={formData.clientName}
                onChange={(value) => setFormData((prev) => ({ ...prev, clientName: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="marine-email">Email Address</FieldLabel>
              <TextField
                id="marine-email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="marine-kraPin">KRA Pin Number</FieldLabel>
              <TextField
                id="marine-kraPin"
                value={formData.kraPin}
                onChange={(value) => setFormData((prev) => ({ ...prev, kraPin: value }))}
              />
            </div>
          </div>
          <div className="buy-now-split-column">
            <div>
              <FieldLabel htmlFor="marine-contactPerson" required>
                Contact Person
              </FieldLabel>
              <TextField
                id="marine-contactPerson"
                value={formData.contactPerson}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, contactPerson: value }))
                }
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="marine-phone">Telephone / Mobile Number</FieldLabel>
              <TextField
                id="marine-phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                required
              />
            </div>
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Shipment Details">
        <div className="space-y-5">
          <div>
            <FieldLabel htmlFor="marine-cargoDescription" required>
              Cargo Description
            </FieldLabel>
            <TextAreaField
              id="marine-cargoDescription"
              value={formData.cargoDescription}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, cargoDescription: value }))
              }
              placeholder="Describe the goods being shipped"
              required
            />
          </div>

          <div className="buy-now-form-grid-2">
            <div>
              <FieldLabel htmlFor="marine-origin" required>
                Origin
              </FieldLabel>
              <TextField
                id="marine-origin"
                value={formData.origin}
                onChange={(value) => setFormData((prev) => ({ ...prev, origin: value }))}
                placeholder="e.g. Mombasa, Kenya"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="marine-destination" required>
                Destination
              </FieldLabel>
              <TextField
                id="marine-destination"
                value={formData.destination}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, destination: value }))
                }
                placeholder="e.g. Kampala, Uganda"
                required
              />
            </div>
            <div>
              <FieldLabel htmlFor="marine-transportMode" required>
                Mode of Transport
              </FieldLabel>
              <SelectField
                id="marine-transportMode"
                value={formData.transportMode}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, transportMode: value }))
                }
                options={transportModes}
                placeholder="Select transport mode"
              />
            </div>
            <div>
              <FieldLabel htmlFor="marine-cargoValue" required>
                Estimated Cargo Value (KES)
              </FieldLabel>
              <TextField
                id="marine-cargoValue"
                type="number"
                min="0"
                value={formData.cargoValue}
                onChange={(value) => setFormData((prev) => ({ ...prev, cargoValue: value }))}
                placeholder="e.g. 5000000"
                required
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel htmlFor="marine-weightVolume">Weight / Volume</FieldLabel>
              <TextField
                id="marine-weightVolume"
                value={formData.weightVolume}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, weightVolume: value }))
                }
                placeholder="e.g. 12 tonnes or 40ft container"
              />
            </div>
          </div>
        </div>
      </BlueSection>

      <BlueSection title="Cover Required">
        <BenefitsGrid
          left={leftCovers.map(({ key, label }) => (
            <YesNoField
              key={key}
              name={`marine-cover-${key}`}
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
                name={`marine-cover-${key}`}
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
            <div key="departure-date">
              <FieldLabel htmlFor="marine-departureDate">
                Expected Departure / Shipping Date
              </FieldLabel>
              <DateField
                id="marine-departureDate"
                value={formData.departureDate}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, departureDate: value }))
                }
                required
              />
            </div>,
          ]}
        />
      </BlueSection>

      <SubmitButton
        isPending={quoteMutation.isPending}
        disabled={
          !formData.transportMode || !formData.departureDate || !formData.cargoDescription
        }
      />
    </form>
  );
}
