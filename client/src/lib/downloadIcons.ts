import {
  Briefcase,
  Building,
  Car,
  FileText,
  Globe,
  Heart,
  Shield,
  type LucideIcon,
} from "lucide-react";

const downloadIconMap: Record<string, LucideIcon> = {
  "file-text": FileText,
  car: Car,
  heart: Heart,
  building: Building,
  shield: Shield,
  briefcase: Briefcase,
  globe: Globe,
};

export const downloadIconOptions = [
  { value: "file-text", label: "Document" },
  { value: "car", label: "Motor" },
  { value: "heart", label: "Health" },
  { value: "building", label: "Property" },
  { value: "shield", label: "Protection" },
  { value: "briefcase", label: "Business" },
  { value: "globe", label: "Travel / Marine" },
] as const;

export function getDownloadIcon(name: string): LucideIcon {
  return downloadIconMap[name] ?? FileText;
}
