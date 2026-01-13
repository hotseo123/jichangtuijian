"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, ExternalLink, Star, Mail, Send, Tag, ImageIcon, Info } from "lucide-react"
import { Navigation } from "@/components/navigation"
// import sitesData from "@/data/sites.json"

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

const categories = [
  {
    id: "design-tools",
    name: "Design Tools",
    description: "Essential design and prototyping tools",
  },
  {
    id: "dev-tools",
    name: "Developer Tools",
    description: "Essential tools for developers",
  },
  {
    id: "ai-tools",
    name: "AI & Productivity",
    description: "AI-powered productivity enhancers",
  },
  {
    id: "learning",
    name: "Learning Resources",
    description: "Educational platforms and documentation",
  },
  {
    id: "inspiration",
    name: "Design Inspiration",
    description: "Beautiful design galleries and inspiration",
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Handy web utilities and converters",
  },
]

const getStatusColor = (status: Site["status"]) => {
  switch (status) {
    case "normal":
      return "bg-green-500"
    case "unstable":
      return "bg-yellow-500"
    case "offline":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusLabel = (status: Site["status"]) => {
  switch (status) {
    case "normal":
      return "正常"
    case "unstable":
      return "不稳定"
    case "offline":
      return "失联"
    default:
      return "未知"
  }
}

type Props = { sites: Site[] }

import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fs = await import('fs');
  const path = await import('path');
  const file = path.join(process.cwd(),'data','sites.json');
  const sites = JSON.parse(fs.readFileSync(file,'utf8')).sites;
  return { props:{sites} };
}

export default function NavigationPage({ sites }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredScreenshot, setHoveredScreenshot] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)

  const sites: Site[] = sitesData.sites

  const filteredSites = sites.filter((site) => {
    if (activeCategory === "featured") return site.featured
    if (activeCategory !== "all" && site.category !== activeCategory) return false
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      site.name.toLowerCase().includes(query) ||
      site.description.toLowerCase().includes(query) ||
      site.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  const groupedSites = categories.map((category) => ({
    ...category,
    sites: filteredSites.filter((site) => site.category === category.id),
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">WebNav</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Your curated web directory</p>
              </div>
              <Badge variant="secondary" className="hidden sm:flex text-xs">
                {sites.length} Resources
              </Badge>
            </div>

            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
                className="flex-shrink-0"
              >
                All
              </Button>
              <Button
                variant={activeCategory === "featured" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("featured")}
                className="flex-shrink-0"
              >
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex-shrink-0 text-xs sm:text-sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="space-y-8 sm:space-y-12">
          {groupedSites.map((category) => {
            if (category.sites.length === 0) return null

            return (
              <section key={category.id} id={category.id}>
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{category.name}</h2>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {category.sites.map((site) => (
                    <div key={site.id} className="relative">
                      <Card
                        className="group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/60 hover:-translate-y-1 relative overflow-visible"
                        onMouseEnter={() => setHoveredCard(site.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {hoveredScreenshot === site.id && site.screenshot && (
                          <div className="absolute inset-0 z-50 bg-background/95 p-4 flex flex-col rounded-lg border-2 border-primary shadow-2xl">
                            <div className="flex-1 overflow-hidden rounded-lg border border-border">
                              <img
                                src={site.screenshot || "/placeholder.svg"}
                                alt={`${site.name} screenshot`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {site.promoCode && (
                              <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-semibold text-primary">优惠码</span>
                                  <Badge variant="secondary" className="font-mono text-xs">
                                    {site.promoCode}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{site.promoDescription}</p>
                                {site.promoExpiry && (
                                  <p className="text-xs text-muted-foreground mt-1">有效期至: {site.promoExpiry}</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 items-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                            onClick={() => setSelectedSite(site)}
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          {site.discount && (
                            <Badge variant="destructive" className="text-xs font-bold">
                              {site.discount}
                            </Badge>
                          )}
                          {site.tags.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {site.tags[0]}
                            </Badge>
                          )}
                        </div>

                        {site.promoCode && (
                          <div className="absolute top-3 left-3 z-20">
                            <Badge variant="default" className="text-xs bg-primary">
                              优惠
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <img
                              src={site.icon || "/placeholder.svg"}
                              alt={`${site.name} icon`}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                <span className="truncate">{site.name}</span>
                                {site.featured && <Star className="h-4 w-4 fill-primary text-primary flex-shrink-0" />}
                              </CardTitle>
                              <div className="flex items-center gap-2 mt-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(site.status)}`} />
                                <span className="text-xs text-muted-foreground">{getStatusLabel(site.status)}</span>
                              </div>
                            </div>
                          </div>
                          <CardDescription className="mt-3 text-pretty text-sm line-clamp-2 sm:line-clamp-none">
                            {site.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                              {site.contact.email && (
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate max-w-[100px] sm:max-w-[120px]">{site.contact.email}</span>
                                </div>
                              )}
                              {site.contact.telegram && (
                                <div className="flex items-center gap-1">
                                  <Send className="h-3 w-3 flex-shrink-0" />
                                  <span>{site.contact.telegram}</span>
                                </div>
                              )}
                              {site.screenshot && (
                                <div
                                  className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors relative"
                                  onMouseEnter={() => setHoveredScreenshot(site.id)}
                                  onMouseLeave={() => setHoveredScreenshot(null)}
                                >
                                  <ImageIcon className="h-3 w-3 flex-shrink-0" />
                                  <span>截图</span>
                                </div>
                              )}
                            </div>

                            <div className="text-xs text-muted-foreground">最近活跃: {site.lastActive}</div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent text-xs sm:text-sm"
                              asChild
                            >
                              <a href={site.url} target="_blank" rel="noopener noreferrer">
                                Visit Site
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {hoveredCard === site.id && (
                        <div className="absolute left-0 right-0 top-full mt-2 z-30 pointer-events-none">
                          <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border max-w-md mx-auto">
                            <p className="text-sm text-pretty">{site.description}</p>
                            {site.tags.length > 1 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {site.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {filteredSites.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-muted-foreground text-base sm:text-lg">No resources found matching your search.</p>
          </div>
        )}
      </main>

      {/* Detailed Info Dialog */}
      <Dialog open={selectedSite !== null} onOpenChange={() => setSelectedSite(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSite && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={selectedSite.icon || "/placeholder.svg"}
                    alt={`${selectedSite.name} icon`}
                    className="w-16 h-16 rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      {selectedSite.name}
                      {selectedSite.featured && <Star className="h-5 w-5 fill-primary text-primary" />}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedSite.status)}`} />
                      <span className="text-sm text-muted-foreground">{getStatusLabel(selectedSite.status)}</span>
                    </div>
                  </div>
                </div>
                <DialogDescription className="text-base mt-4">{selectedSite.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {selectedSite.screenshot && (
                  <div className="rounded-lg border border-border overflow-hidden">
                    <img
                      src={selectedSite.screenshot || "/placeholder.svg"}
                      alt={`${selectedSite.name} screenshot`}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">分类</h4>
                    <p className="text-sm text-muted-foreground">
                      {categories.find((c) => c.id === selectedSite.category)?.name}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">最近活跃</h4>
                    <p className="text-sm text-muted-foreground">{selectedSite.lastActive}</p>
                  </div>
                </div>

                {selectedSite.tags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSite.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSite.promoCode && (
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm text-primary">优惠信息</h4>
                      {selectedSite.discount && (
                        <Badge variant="destructive" className="font-bold">
                          {selectedSite.discount}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">优惠码:</span>
                        <Badge variant="secondary" className="font-mono">
                          {selectedSite.promoCode}
                        </Badge>
                      </div>
                      <p className="text-sm">{selectedSite.promoDescription}</p>
                      {selectedSite.promoExpiry && (
                        <p className="text-xs text-muted-foreground">有效期至: {selectedSite.promoExpiry}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">联系方式</h4>
                  <div className="space-y-2">
                    {selectedSite.contact.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${selectedSite.contact.email}`} className="text-primary hover:underline">
                          {selectedSite.contact.email}
                        </a>
                      </div>
                    )}
                    {selectedSite.contact.telegram && (
                      <div className="flex items-center gap-2 text-sm">
                        <Send className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`https://t.me/${selectedSite.contact.telegram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedSite.contact.telegram}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <a href={selectedSite.url} target="_blank" rel="noopener noreferrer">
                    访问网站
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-border mt-12 sm:mt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center text-xs sm:text-sm text-muted-foreground">
            <p>A curated collection of useful web resources</p>
            <p className="mt-2">Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
