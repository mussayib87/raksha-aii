import type { RiskLevel } from "../types/intelligence";

export interface IncidentClassificationInput {
  title: string;
  description?: string | null;
  type: string;
  severity?: string | null;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface IncidentClassification {
  severity: RiskLevel;
  priority: RiskLevel;
  source: "deterministic" | "ai";
  confidence: number;
  reasoning: string[];
}

export interface IncidentClassifier {
  classify(input: IncidentClassificationInput): Promise<IncidentClassification>;
}

const riskLevels: RiskLevel[] = ["low", "medium", "high", "critical"];

const normalize = (value: string | null | undefined): string =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const asRiskLevel = (value: string | null | undefined): RiskLevel => {
  const normalized = normalize(value);
  return riskLevels.includes(normalized as RiskLevel)
    ? (normalized as RiskLevel)
    : "medium";
};

const levelScore = (level: RiskLevel): number =>
  riskLevels.indexOf(level);

const deterministicClassifier: IncidentClassifier = {
  async classify(input) {
    const severity = asRiskLevel(input.severity);
    const text = normalize(
      [input.title, input.description, input.type, input.location].join(" ")
    );
    let priorityScore = levelScore(severity);
    const reasoning = [`Priority starts from ${severity} severity.`];

    if (/(mass casualty|casualt|trapped|collapse|chemical|hazmat)/i.test(text)) {
      priorityScore += 2;
      reasoning.push("Life-safety or hazardous-material indicators increase priority.");
    } else if (/(flood|fire|landslide|earthquake|cyclone|tsunami|explosion)/i.test(text)) {
      priorityScore += 1;
      reasoning.push("High-impact incident indicators increase priority.");
    }

    if (input.latitude !== null && input.latitude !== undefined &&
        input.longitude !== null && input.longitude !== undefined) {
      reasoning.push("Location coordinates are available for response routing.");
    }

    const priority = riskLevels[Math.min(priorityScore, riskLevels.length - 1)];

    return {
      severity,
      priority,
      source: "deterministic",
      confidence: 0.6,
      reasoning,
    };
  },
};

export const classifyIncident = (
  input: IncidentClassificationInput
): Promise<IncidentClassification> => deterministicClassifier.classify(input);