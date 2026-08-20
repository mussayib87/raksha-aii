import { z } from "zod";

export const riskLevelSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.enum(["low", "medium", "high", "critical"]));

export const incidentStatusSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z.enum([
      "open",
      "active",
      "pending",
      "assigned",
      "responding",
      "in_progress",
      "in progress",
      "resolved",
      "closed",
      "completed",
    ])
  );

export const coordinateSchema = z.object({
  latitude: z.number().finite().min(-90).max(90).nullable().optional(),
  longitude: z.number().finite().min(-180).max(180).nullable().optional(),
});

export const uuidSchema = z.string().uuid();

export const responderInputSchema = z
  .object({
    id: uuidSchema.optional(),
    name: z.string().trim().min(1).max(160),
    role: z.string().trim().max(100).nullable().optional(),
    contact_phone: z.string().trim().max(40).nullable().optional(),
    contact_email: z.string().trim().email().max(254).nullable().optional(),
    status: z.string().trim().min(1).max(32),
    location: z.string().trim().max(300).nullable().optional(),
    ...coordinateSchema.shape,
  })
  .superRefine((value, context) => {
    if ((value.latitude === null) !== (value.longitude === null)) {
      context.addIssue({
        code: "custom",
        message: "Latitude and longitude must be provided together.",
        path: [value.latitude === null ? "latitude" : "longitude"],
      });
    }
  });

export const resourceInputSchema = z
  .object({
    id: uuidSchema.optional(),
    name: z.string().trim().min(1).max(160),
    resource_type: z.string().trim().min(1).max(80),
    quantity: z.number().finite().nonnegative(),
    status: z.string().trim().min(1).max(32),
    location: z.string().trim().max(300).nullable().optional(),
    ...coordinateSchema.shape,
  })
  .superRefine((value, context) => {
    if ((value.latitude === null) !== (value.longitude === null)) {
      context.addIssue({
        code: "custom",
        message: "Latitude and longitude must be provided together.",
        path: [value.latitude === null ? "latitude" : "longitude"],
      });
    }
  });

export const alertInputSchema = z.object({
  id: uuidSchema.optional(),
  incident_id: z.string().trim().min(1).max(100).nullable().optional(),
  alert_type: z.string().trim().min(1).max(80),
  severity: riskLevelSchema,
  priority: riskLevelSchema,
  message: z.string().trim().min(1).max(5000),
  recipient: z.string().trim().max(160).nullable().optional(),
  target: z.string().trim().max(160).nullable().optional(),
  is_read: z.boolean().optional(),
});

export type ResponderInput = z.infer<typeof responderInputSchema>;
export type ResourceInput = z.infer<typeof resourceInputSchema>;
export type AlertInput = z.infer<typeof alertInputSchema>;
