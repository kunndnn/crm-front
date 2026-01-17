// Mock Service simulating API latency
export const authService = {
  login: async (email: string, password: string) => {
    return new Promise<{ user: any; token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email === "demo@crm.com" && password === "password") {
          resolve({
            user: {
              id: "1",
              name: "Demo User",
              email: "demo@crm.com",
              role: "admin",
              avatar: "https://i.pravatar.cc/150?u=demo",
            },
            token: "mock-jwt-token-12345",
          })
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  },
}
