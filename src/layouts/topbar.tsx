import { Menu, Sun, Moon, User } from "lucide-react"
import { useTheme } from "../components/theme-provider"
import { Button } from "../components/ui/button"
import { Dropdown } from "../components/ui/dropdown"

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Dropdown
          trigger={
             <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                   <User className="h-4 w-4" />
                </span>
             </Button>
          }
          items={[
            { label: "Profile", href: "/settings" },
            { label: "Settings", href: "/settings" },
            { label: "Sign out", onClick: () => console.log("Sign out") }, // Mock functionality
          ]}
        />
      </div>
    </header>
  )
}
