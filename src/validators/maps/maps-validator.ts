import { z } from "zod";

export const mapsSchema = z.object({
    longitude: z.string(),
    latitude: z.string(),
    address: z.string(),
    kelurahan: z.string(),
    rw: z.string()
});

export type MapsType = z.infer<typeof mapsSchema>;