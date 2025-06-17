import { client } from "@/sanity/client";
export const getCustomerIdByClerkId = (clerkId: string) => `
  *[_type == "customer" && clerkId == "${clerkId}"][0] {
    _id,
    clerkId,
    name,
    email,
    phone,
    address,
    registeredAt
  }
`;

export const getRepairOrdersByCustomer = (customerId: string) => `
  *[_type == "repair" && customer == "${customerId}"] | order(dateCreated desc) {
    _id,
    orderId,
    device,
    brand,
    model,
    issue,
    status,
    estimatedCompletion,
    dateCreated,
    technician->{
      name,
    },
    rating,
    pricing {
      total,
      paid,
      remaining
    },
    timeline[]
  }
`;

export const getRepairOrderById = (orderId: string) => `
  *[_type == "repair" && orderId == "${orderId}"][0] {
    _id,
    orderId,
    device,
    brand,
    model,
    issue,
    status,
    priority,
    dateCreated,
    estimatedCompletion,
    actualCompletion,
    rating,
    pricing,
    warranty,
    images[],
    notes[],
    timeline[],
    services[],
    technician->{
      _id,
      name,
      phone,
      specialization
    },
    customer
  }
`;

// Query untuk mendapatkan customer berdasarkan clerkId
export const getCustomerByClerkId = (clerkId: string) => `
  *[_type == "customer" && clerkId == "${clerkId}"][0] {
    _id,
    name,
    email,
    phone,
    address,
    clerkId
  }
`;

// Query untuk membuat customer baru
export const createCustomerMutation = `
  mutation CreateCustomer($customer: CustomerInput!) {
    createCustomer(customer: $customer) {
      _id
      name
      email
      phone
      address
      clerkId
    }
  }
`;

// Query untuk mendapatkan semua teknisi
export const getAllTechnicians = () => `
  *[_type == "technician"] {
    _id,
    id,
    name,
    phone,
    specialization
  }
`;

// Query untuk membuat repair order baru
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRepairOrderMutation = (orderData: any) => ({
  _type: "repair",
  orderId: orderData.orderId,
  device: orderData.device,
  brand: orderData.brand,
  model: orderData.model,
  issue: orderData.issue,
  status: "received",
  priority: "normal",
  dateCreated: new Date().toISOString(),
  customer: orderData.customerId,
  images: orderData.images || [],
  timeline: [
    {
      _type: "timelineEvent",
      date: new Date().toISOString(),
      status: "received",
      title: "Pesanan Diterima",
      description: "Pesanan telah diterima dan akan segera diproses",
      by: "System",
    },
  ],
  notes: [],
  services: [],
});

// Query untuk membuat pickup order
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPickupOrderMutation = (pickupData: any) => ({
  _type: "pickup",
  customer: pickupData.customerId,
  repair_id: {
    _type: "reference",
    _ref: pickupData.repairId,
  },
  address: pickupData.address,
  status: "scheduled",
  createdAt: new Date().toISOString(),
});

export const getOrderWithReviewById = async (orderId: string) => {
  const query = `
    *[_type == "repair" && orderId == $orderId][0]{
      _id,
      orderId,
      device,
      issue,
      status,
      date,
      estimatedCompletion,
      technician,
      price,
      "review": *[_type == "review" && order._ref == ^._id][0]{
        score,
        review
      }
    }
  `;

  return await client.fetch(query, { orderId });
};

export const getReviewsByCustomerId = (customerId: string) => `
    *[_type == "review" && order->customer == "${customerId}"] | order(date desc) {
      _id,
      score,
      review,
    }
  `;
  // return client.fetch(query, { customerId });
// };
export const getAllReviews = `
  *[_type == "review" && score >2]{
    _id,
    score,
    review,
    order->{
      _id,
      customer,
      "customerName": *[_type == "customer" && clerkId == ^.customer][0].name
    }
  }
`;
