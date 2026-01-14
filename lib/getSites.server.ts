// Server-side function to load site data from JSON
import fs from "fs"
import path from "path"

interface Site {
  id: string
  name: string
  description: string
  icon: string
  url: string
  category: string
  tags: string[]
  promoCode: string
  discount: string
  promoDescription: string
  promoExpiry: string
  status: "normal" | "unstable" | "offline"
  contact: {
    email: string
    telegram: string
  }
  screenshot: string
  lastActive: string
  featured: boolean
}

// Named export for getSites function
export function getSites(): Site[] {
  const filePath = path.join(process.cwd(), "data", "sites.json")
  const fileContent = fs.readFileSync(filePath, "utf8")
  const jsonData = JSON.parse(fileContent)
  return jsonData.sites
}

// Also export as default for compatibility
export default getSites
