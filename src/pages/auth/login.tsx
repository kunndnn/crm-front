import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../hooks/use-auth"
import { authService } from "../../services/auth.service"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Loader } from "../../components/ui/loader"

export function LoginPage() {
  const [email, setEmail] = useState("demo@crm.com")
  const [password, setPassword] = useState("password")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const navigate = useNavigate()
  const login = useAuth((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { user, token } = await authService.login(email, password)
      login(user, token)
      navigate("/dashboard")
    } catch (err) {
      setError("Invalid credentials. Try demo@crm.com / password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email address
        </label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to="/auth/forgot-password"
            className="font-medium text-primary hover:text-primary/80"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader size="sm" className="mr-2" /> : null}
          Sign in
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
         Use <strong>demo@crm.com</strong> / <strong>password</strong>
      </div>
    </form>
  )
}
