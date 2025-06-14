import { createClient } from "next-sanity";

// Create a separate client for write operations with explicit token
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ozyqsoog",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-04",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

// Upload foto ke back-end
export const uploadImageToSanity = async (file: File): Promise<string> => {
  try {
    const asset = await writeClient.assets.upload("image", file, {
      filename: file.name,
    });
    return asset._id;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

// Konversi file ke based64 string
export const base64ToFile = (base64String: string, filename: string): File => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Function to generate unique key for array items
export const generateUniqueKey = (prefix: string = "item"): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Generate order ID
export const generateOrderId = (): string => {
  const prefix = "SRV";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `${prefix}-${timestamp}${random}`;
};

// Generate customer jika belum ada
export const createOrGetCustomer = async (userData: {
  clerkId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}) => {
  try {
    // Check if customer already exists
    const existingCustomer = await writeClient.fetch(`
      *[_type == "customer" && clerkId == "${userData.clerkId}"][0] {
        _id,
        name,
        email,
        phone,
        address,
        clerkId
      }
    `);

    if (existingCustomer) {
      return existingCustomer;
    }

    // Create new customer
    console.log(
      "Creating new customer with token:",
      process.env.SANITY_API_TOKEN ? "Token present" : "No token"
    );
    const newCustomer = await writeClient.create({
      _type: "customer",
      clerkId: userData.clerkId,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "",
      address: userData.address || "",
      registeredAt: new Date().toISOString(),
    });

    return newCustomer;
  } catch (error) {
    console.error("Error creating/getting customer:", error);
    throw new Error("Failed to process customer data");
  }
};

// Function to create repair order
export const createRepairOrder = async (orderData: {
  customerId: string;
  device: string;
  brand: string;
  model: string;
  issue: string;
  images: string[];
  deliveryOption: "pickup" | "delivery";
  address?: string;
}) => {
  try {
    const orderId = generateOrderId(); // Process images - sesuai dengan skema repairImage
    const processedImages = orderData.images.map((imageId, index) => ({
      _key: generateUniqueKey("image"), // Use utility function
      _type: "repairImage",
      url: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageId,
        },
      },
      caption: `Foto kondisi awal ${index + 1}`,
      type: "before",
      uploadedAt: new Date().toISOString(),
    }));

    // Create timeline event - sesuai dengan skema timelineEvent
    const initialTimeline = [
      {
        _key: generateUniqueKey("timeline"), // Use utility function
        _type: "timelineEvent",
        date: new Date().toISOString(),
        status: "received",
        title: "Pesanan Diterima",
        description:
          "Pesanan telah diterima dan akan segera diproses oleh teknisi",
        by: "System",
      },
    ];

    // Create pricing object - sesuai dengan skema pricing
    const initialPricing = {
      _type: "pricing",
      diagnosticFee: 0,
      repairFee: 0,
      partsCost: 0,
      total: 0,
      paid: 0,
      remaining: 0,
    };

    // Create repair order
    console.log(
      "Creating repair order with token:",
      process.env.SANITY_API_TOKEN ? "Token present" : "No token"
    );
    const repairOrder = await writeClient.create({
      _type: "repair",
      orderId: orderId,
      device: orderData.device,
      brand: orderData.brand,
      model: orderData.model,
      issue: orderData.issue,
      status: "received",
      priority: "normal",
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      customer: orderData.customerId,
      deliveryOption: orderData.deliveryOption,
      images: processedImages,
      timeline: initialTimeline,
      notes: [], // array kosong untuk notes
      services: [], // array kosong untuk services
      pricing: initialPricing,
      // warranty akan diset oleh admin nanti
    });

    // If pickup is needed, create pickup order
    if (orderData.deliveryOption === "pickup" && orderData.address) {
      console.log(
        "Creating pickup order with token:",
        process.env.SANITY_API_TOKEN ? "Token present" : "No token"
      );
      await writeClient.create({
        _type: "pickup",
        customer: orderData.customerId,
        repair_id: {
          _type: "reference",
          _ref: repairOrder._id,
        },
        address: orderData.address,
        status: "scheduled",
        createdAt: new Date().toISOString(),
      });
    }

    return repairOrder;
  } catch (error) {
    console.error("Error creating repair order:", error);
    throw new Error("Failed to create repair order");
  }
};
