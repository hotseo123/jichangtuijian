"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BookMarked, FileText, Info } from "lucide-react"

const menuItems = [
  { name: "首页", href: "/", icon: Home },
  { name: "机场推荐", href: "/collections", icon: BookMarked },
  { name: "更新日志", href: "/changelog", icon: FileText },
  { name: "关于", href: "/about", icon: Info },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Button key={item.href} variant={isActive ? "default" : "ghost"} size="sm" className="gap-2" asChild>
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                    <span className="sm:hidden">{item.name.split("")[0]}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
