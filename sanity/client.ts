import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ozyqsoog",
  dataset: "production",
  apiVersion: "2025-06-04",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
}