import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Trophy } from "lucide-react"
import { Navigation } from "@/components/navigation"

const collections = [
  {
    name: "设计师必备工具箱",
    description: "精选设计师日常工作中最常用的设计、原型、协作工具",
    sites: [
      { name: "Figma", url: "https://figma.com" },
      { name: "Framer", url: "https://framer.com" },
      { name: "Spline", url: "https://spline.design" },
      { name: "Principle", url: "https://principleformac.com" },
    ],
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    name: "开发者工具集",
    description: "提升开发效率的代码托管、部署、调试工具",
    sites: [
      { name: "GitHub", url: "https://github.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "Railway", url: "https://railway.app" },
      { name: "Postman", url: "https://postman.com" },
    ],
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "AI 助手精选",
    description: "最实用的 AI 工具，提升工作和学习效率",
    sites: [
      { name: "ChatGPT", url: "https://chat.openai.com" },
      { name: "Claude", url: "https://claude.ai" },
      { name: "Perplexity", url: "https://perplexity.ai" },
      { name: "Cursor", url: "https://cursor.sh" },
    ],
    color: "from-green-500/10 to-emerald-500/10",
  },
  {
    name: "学习资源库",
    description: "优质的编程学习平台和技术文档",
    sites: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      { name: "freeCodeCamp", url: "https://freecodecamp.org" },
      { name: "Frontend Mentor", url: "https://frontendmentor.io" },
      { name: "Roadmap.sh", url: "https://roadmap.sh" },
    ],
    color: "from-orange-500/10 to-red-500/10",
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">优秀网站合集</h1>
            <p className="text-lg text-muted-foreground text-balance">
              精心整理的主题网站集合，帮助你快速找到最优质的在线工具
            </p>
          </div>

          <div className="space-y-6">
            {collections.map((collection, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${collection.color}`} />
                <CardHeader>
                  <CardTitle className="text-2xl">{collection.name}</CardTitle>
                  <CardDescription className="text-base">{collection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {collection.sites.map((site) => (
                      <Button
                        key={site.name}
                        variant="outline"
                        className="justify-between h-auto py-3 bg-transparent"
                        asChild
                      >
                        <a href={site.url} target="_blank" rel="noopener noreferrer">
                          <span className="font-medium">{site.name}</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
