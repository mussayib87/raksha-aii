export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface IntelligenceAssessment {
  incidentId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  escalationProbability: number;
  affectedPopulation: number;
  confidence: number;
  trend: "decreasing" | "stable" | "increasing" | "rapidly_increasing";
  reasoning: string[];
  recommendedActions: RecommendedAction[];
  updatedAt: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: RiskLevel;
  confidence: number;
  status: "pending" | "approved" | "rejected" | "completed";
  reason: string;
}

export interface SituationBrief {
  summary: string;
  criticalIncidents: number;
  peopleAtRisk: number;
  activeResponders: number;
  activeAlerts: number;
  topPriority: string | null;
  }
