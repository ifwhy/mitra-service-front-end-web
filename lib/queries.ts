export const getCustomerIdByClerkId = (clerkId: string) => `
  *[_type == "customer" && clerkId == "${clerkId}"][0] {
    _id
  }
`;

export const getRepairOrdersByCustomer = (customerId: string) => `
  *[_type == "repair" && customer._ref == "${customerId}"] | order(dateCreated desc) {
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
      email,
      phone
    },
    rating,
    pricing {
      total,
      paid,
      remaining
    }
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
    customer->{
      _id,
      name,
      email,
      phone,
      address,
    },
    technician->{
      _id,
      name,
      email,
      phone
    }
  }
`;
