import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "18ium23p",
  dataset: "mitra_dev",
  apiVersion: "2025-06-04",
  useCdn: false,
});