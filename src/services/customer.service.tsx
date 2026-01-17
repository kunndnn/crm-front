export interface Customer {
  id: string
  name: string
  email: string
  company: string
  status: "active" | "inactive" | "lead"
  lastContact: string
}

const mockCustomers: Customer[] = Array.from({ length: 50 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  company: `Company ${i + 1}`,
  status: i % 3 === 0 ? "active" : i % 3 === 1 ? "lead" : "inactive",
  lastContact: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    .toISOString()
    .split("T")[0],
}));

export const customerService = {
  getCustomers: async (
    page = 1,
    limit = 10,
    search = "",
  ): Promise<{ data: Customer[]; total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockCustomers;
        if (search) {
          const lowerSearch = search.toLowerCase();
          filtered = filtered.filter(
            (c) =>
              c.name.toLowerCase().includes(lowerSearch) ||
              c.email.toLowerCase().includes(lowerSearch) ||
              c.company.toLowerCase().includes(lowerSearch),
          );
        }

        const total = filtered.length;
        const start = (page - 1) * limit;
        const end = start + limit;
        const data = filtered.slice(start, end);

        resolve({ data, total });
      }, 800);
    });
  },

  createCustomer: async (customer: Omit<Customer, "id">): Promise<Customer> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCustomer = {
          ...customer,
          id: Math.random().toString(36).substr(2, 9),
        };
        mockCustomers.push(newCustomer);
        resolve(newCustomer);
      }, 800);
    });
  },

  updateCustomer: async (
    id: string,
    updates: Partial<Customer>,
  ): Promise<Customer> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex((c) => c.id === id);
        if (index === -1) {
          reject(new Error("Customer not found"));
          return;
        }
        mockCustomers[index] = { ...mockCustomers[index], ...updates };
        resolve(mockCustomers[index]);
      }, 800);
    });
  },

  deleteCustomer: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex((c) => c.id === id);
        if (index !== -1) mockCustomers.splice(index, 1);
        resolve();
      }, 800);
    });
  },
};
