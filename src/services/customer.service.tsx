export interface Customer {
  id: string
  name: string
  email: string
  company: string
  status: "active" | "inactive" | "lead"
  lastContact: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Tech Corp",
    status: "active",
    lastContact: "2023-10-25",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@design.io",
    company: "Design Studio",
    status: "lead",
    lastContact: "2023-10-20",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@retail.co",
    company: "Retail Inc",
    status: "inactive",
    lastContact: "2023-09-15",
  },
]

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCustomers]), 800)
    })
  },

  createCustomer: async (customer: Omit<Customer, "id">): Promise<Customer> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCustomer = { ...customer, id: Math.random().toString(36).substr(2, 9) }
        mockCustomers.push(newCustomer)
        resolve(newCustomer)
      }, 800)
    })
  },

  updateCustomer: async (id: string, updates: Partial<Customer>): Promise<Customer> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex((c) => c.id === id)
        if (index === -1) {
            reject(new Error("Customer not found"))
            return
        }
        mockCustomers[index] = { ...mockCustomers[index], ...updates }
        resolve(mockCustomers[index])
      }, 800)
    })
  },

  deleteCustomer: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex((c) => c.id === id)
        if (index !== -1) mockCustomers.splice(index, 1)
        resolve()
      }, 800)
    })
  },
}
