import * as React from "react"
import { Menu, Transition } from "@headlessui/react"
import { cn } from "../../lib/utils"

interface DropdownItem {
  label: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  href?: string
}

interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: "left" | "right"
  className?: string
}

export function Dropdown({
  trigger,
  items,
  align = "right",
  className,
}: DropdownProps) {
  return (
    <Menu as="div" className={cn("relative inline-block text-left", className)}>
      <div>
        <Menu.Button as={React.Fragment}>
          {trigger}
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={cn(
            "absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-popover shadow-lg ring-1 ring-black/5 focus:outline-none z-50 border",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="px-1 py-1">
            {items.map((item, index) => (
              <Menu.Item key={index} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={cn(
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                      active ? "bg-accent text-accent-foreground" : "text-popover-foreground",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {item.icon && <span className="mr-2 h-4 w-4">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
