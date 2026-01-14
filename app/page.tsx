import fs from "fs"
import path from "path"
import NavigationPage from "./page-nav"

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

function getSites(): Site[] {
  const filePath = path.join(process.cwd(), "data", "sites.json")
  const fileContent = fs.readFileSync(filePath, "utf8")
  const jsonData = JSON.parse(fileContent)
  return jsonData.sites
}

export default async function HomePage() {
  const sites = getSites()
  return <NavigationPage websites={sites} />
}
