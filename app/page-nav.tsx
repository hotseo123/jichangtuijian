"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ExternalLink, Star, Mail, Send, Tag, ImageIcon, Info, HelpCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
// import sitesData from "@/data/sites.json"
import AirportLink from "@/components/ui/link"

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
    id: "kaopu-airports",
    name: "靠谱机场",
    description: "靠谱机场，拼的不是噱头和低价，而是长期稳定的速度、节点在线率和用得住的体验。",
  },
  {
    id: "cheap-airports",
    name: "便宜机场",
    description: "便宜机场，不只是低价，更是能让你用得顺心、稳定且少踩坑的实惠选择。",
  },
  {
    id: "free-airports",
    name: "免费机场",
    description: "免费机场，看似零成本，但稳定性和速度才是检验价值的关键，选对了才能真正安心使用。",
  },
  {
    id: "find-airports",
    name: "找机场",
    description: "GitHub机场信息以及专门机场推荐的一些网站资源",
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

type Props = { websites: Site[] }

// import type { GetStaticProps } from 'next'

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   const fs = await import('fs');
//   const path = await import('path');
//   const file = path.join(process.cwd(),'data','sites.json');
//   const sites = JSON.parse(fs.readFileSync(file,'utf8')).sites;
//   return { props:{sites} };
// }

export default function NavigationPage({ websites }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [hoveredScreenshot, setHoveredScreenshot] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [sites, setSites] = useState<Site[]>([])

  useEffect(() => {
    // console.log("-----", websites)
    if (websites) {
      setSites(websites)
    }
  }, [websites])

  // const sites: Site[] = sitesData.sites

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
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  靠谱机场导航｜机场推荐与优惠码一站式整理
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  精选稳定机场 · 实时更新优惠码 · 少踩坑的机场指南
                </p>
              </div>
              <Badge variant="secondary" className="hidden sm:flex text-xs">
                {sites.length} 个机场资源
              </Badge>
            </div>

            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索机场..."
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
                优惠
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
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">{category.description}</p>
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

                        <div className="absolute top-0 right-0 z-20 flex flex-col gap-1 items-end">
                              {site.discount && (
                                <Badge variant="destructive" className="text-xs font-bold">
                                  {site.discount}
                                </Badge>
                              )}
                        </div>

                        {site.promoCode && (
                          <div className="absolute top-0 left-3 z-20">
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
                              className="w-10 h-10 sm:w-10 sm:h-10 rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                <h4><span className="truncate">{site.name}</span></h4>
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
                            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-nowrap">
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
                              {site.tags.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {site.tags[0]}
                                </Badge>
                              )}
                              {site.screenshot && (
                                <div
                                  className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors relative"
                                  onMouseEnter={() => setHoveredScreenshot(site.id)}
                                  onMouseLeave={() => setHoveredScreenshot(null)}
                                >
                                  <ImageIcon className="h-3 w-3 flex-shrink-0" />
                                  {/* <span>截图</span> */}
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground backdrop-blur-sm"
                                onClick={() => setSelectedSite(site)}
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-xs text-muted-foreground">最近活跃: {site.lastActive}</div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent text-xs sm:text-sm"
                              asChild
                            >
                              {/* <a href={site.url} target="_blank" rel="noopener noreferrer">
                                官网地址
                                <ExternalLink className="h-3 w-3 ml-2" />
                              </a> */}
                              { 
                                 site.category === 'find-airports'
                                  ? (
                                      <a href={site.url} target="_blank" rel="noopener noreferrer">
                                        官网地址
                                        <ExternalLink className="h-3 w-3 ml-2" />
                                      </a>
                                    )
                                  : (
                                      <AirportLink url={site.url} title="进入机场官网" />
                                    )
                              }
                              
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

          {filteredSites.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-muted-foreground text-base sm:text-lg">没有找到你搜索关键词匹配的机场！</p>
            </div>
          )}

          {/* Airport Clients Section */}
          <section className="mt-12 sm:mt-16 border-t border-border pt-8">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">机场客户端</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                机场客户端是连接机场服务的重要工具，不同的客户端支持不同的平台和协议。以下客户端列表来自
                <a
                  href="https://github.com/clash-download/clash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline mx-1"
                >
                  GitHub开源项目
                </a>
                的整理，包含 Clash 和 Clash Meta (Mihomo) 内核的主流客户端。
              </p>
              <p className="text-sm text-muted-foreground">
                建议根据您的设备系统选择合适的客户端，推荐使用活跃维护的项目以获得更好的稳定性和功能支持。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Clash Verge Rev */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Clash Verge Rev</span>
                    <Badge variant="default" className="text-xs">
                      推荐
                    </Badge>
                  </CardTitle>
                  <CardDescription>活跃维护的全平台客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                    <Badge variant="secondary">Linux</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href="https://github.com/clash-verge-rev/clash-verge-rev/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* FlClash */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>FlClash</span>
                    <Badge variant="default" className="text-xs">
                      推荐
                    </Badge>
                  </CardTitle>
                  <CardDescription>跨平台的现代化客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                    <Badge variant="secondary">Android</Badge>
                    <Badge variant="secondary">Linux</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href="https://github.com/chen08209/FlClash/releases" target="_blank" rel="noopener noreferrer">
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Clash Meta for Android */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Clash Meta for Android</CardTitle>
                  <CardDescription>专为 Android 优化</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Android</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Clash Mi */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Clash Mi</CardTitle>
                  <CardDescription>全平台支持的轻量客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                    <Badge variant="secondary">Android</Badge>
                    <Badge variant="secondary">Linux</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href="https://github.com/KaringX/clashmi" target="_blank" rel="noopener noreferrer">
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Clash Party */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Clash Party</CardTitle>
                  <CardDescription>Mihomo Party 客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                    <Badge variant="secondary">Linux</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href="https://github.com/mihomo-party-org/mihomo-party/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* v2rayN */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>v2rayN</CardTitle>
                  <CardDescription>支持多协议的桌面客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                    <Badge variant="secondary">Linux</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href="https://github.com/2dust/v2rayN/releases" target="_blank" rel="noopener noreferrer">
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* v2rayNG */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>v2rayNG</CardTitle>
                  <CardDescription>Android 平台多协议客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Android</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href="https://github.com/2dust/v2rayNG/releases" target="_blank" rel="noopener noreferrer">
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* GUI.for.Clash */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>GUI.for.Clash</CardTitle>
                  <CardDescription>图形化界面 Clash 客户端</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                    <Badge variant="secondary">Linux</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href="https://github.com/GUI-for-Cores/GUI.for.Clash/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      下载客户端 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Clash for Windows (Legacy) */}
              <Card className="hover:shadow-lg transition-shadow opacity-75">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Clash for Windows</span>
                    <Badge variant="outline" className="text-xs">
                      已停更
                    </Badge>
                  </CardTitle>
                  <CardDescription>经典客户端（已停止更新）</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Windows</Badge>
                    <Badge variant="secondary">macOS</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href="https://github.com/clash-download/Clash-for-Windows"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      查看备份 <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                💡 <strong>使用建议：</strong>推荐优先选择标记为"推荐"的活跃维护项目，如 Clash Verge Rev 和
                FlClash。已停更的客户端可能存在兼容性和安全性问题，建议谨慎使用。不同客户端的配置方法可能略有差异，请参考各项目的官方文档。
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-12 sm:mt-16 border-t border-border pt-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">常见问题 FAQ</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                关于机场、VPN、客户端等常见问题的解答，帮助你更好地了解和使用机场服务。
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  什么是机场？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">
                    "机场"是代理服务提供商的俗称，主要提供科学上网服务。之所以被称为"机场"，是因为早期这类服务使用"SS"（Shadowsocks）协议，其图标像飞机，而提供服务的节点被称为"登机口"，因此整体被形象地称为"机场"。
                  </p>
                  <p className="mb-3">机场服务通常包括：</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>多个不同地区的服务器节点（香港、台湾、美国、日本等）</li>
                    <li>支持多种协议（Shadowsocks、V2Ray、Trojan、Hysteria等）</li>
                    <li>提供订阅链接，方便客户端一键导入</li>
                    <li>不同套餐的流量包和带宽限制</li>
                    <li>客服支持和使用教程</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  机场和 VPN 有什么区别？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">虽然机场和 VPN 都能实现"科学上网"，但它们在技术原理和使用场景上有明显区别：</p>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">机场（代理服务）</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>基于代理协议（如 Shadowsocks、V2Ray、Trojan）</li>
                        <li>可以灵活配置分流规则（只代理特定网站）</li>
                        <li>速度通常更快，延迟更低</li>
                        <li>更容易被检测和封锁，需要频繁更新节点</li>
                        <li>价格相对便宜，按流量或时间计费</li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">VPN（虚拟专用网络）</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>基于 VPN 协议（如 OpenVPN、WireGuard、IKEv2）</li>
                        <li>全局代理所有网络流量</li>
                        <li>更注重隐私和安全加密</li>
                        <li>商业 VPN 通常更稳定，但速度可能较慢</li>
                        <li>价格相对较贵，按月或年订阅</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3">
                    <strong>总结：</strong>如果你主要是为了访问特定网站（如 Google、YouTube、Twitter
                    等），机场服务通常是更好的选择；如果你需要全局加密保护隐私，或者在公共 WiFi 环境下使用，VPN 更合适。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  如何选择合适的机场？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">选择机场时，建议从以下几个方面综合考虑：</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">1. 稳定性</h4>
                      <p className="ml-4">
                        查看机场的运营时长和用户评价，优先选择运营时间较长、口碑较好的机场。本站标记为"正常"状态的机场通常较为稳定。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">2. 速度和延迟</h4>
                      <p className="ml-4">
                        根据你的使用场景选择：看视频需要大带宽，玩游戏需要低延迟。大多数机场提供试用或退款保证，可以先测试再决定。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">3. 节点分布</h4>
                      <p className="ml-4">
                        根据你的需求选择节点位置：访问国外网站优先选择香港、台湾、新加坡等亚洲节点；看 Netflix、Disney+
                        等流媒体需要有专门的解锁节点。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">4. 价格和套餐</h4>
                      <p className="ml-4">
                        不要只看价格，要综合考虑流量、速度、设备数量限制等。本站整理了各机场的优惠码，可以帮你节省费用。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">5. 客服和售后</h4>
                      <p className="ml-4">
                        选择有完善客服支持（如 Telegram 群组、工单系统）的机场，遇到问题能及时解决。
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm">
                      💡 <strong>建议：</strong>不要把所有需求都寄托在一个机场上，可以准备 2-3
                      个机场作为备选，确保网络访问的连续性。
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  什么是机场客户端？如何选择？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">
                    机场客户端是用于连接和使用机场服务的应用程序。购买机场服务后，需要下载对应的客户端，导入机场提供的订阅链接，才能正常使用。
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">常见的客户端类型：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong>Clash 系列：</strong>支持规则分流，适合进阶用户（Clash Verge Rev、FlClash、Clash Meta
                          等）
                        </li>
                        <li>
                          <strong>V2Ray 系列：</strong>支持多种协议，功能强大（v2rayN、v2rayNG 等）
                        </li>
                        <li>
                          <strong>Shadowsocks 系列：</strong>轻量简单，适合新手（ShadowsocksX-NG、ShadowsocksR 等）
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">选择建议：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>
                          <strong>Windows/Mac/Linux：</strong>推荐 Clash Verge Rev 或 v2rayN（功能全面，持续更新）
                        </li>
                        <li>
                          <strong>Android：</strong>推荐 Clash Meta for Android 或 v2rayNG
                        </li>
                        <li>
                          <strong>iOS：</strong>推荐 Shadowrocket、Surge 或 Quantumult X（需要美区账号购买）
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      ⚠️ <strong>注意：</strong>Clash for Windows 已停止更新，不建议继续使用。请选择活跃维护的客户端，如
                      Clash Verge Rev。
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  使用机场服务安全吗？有什么风险？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">使用机场服务存在一定风险，需要注意以下几点：</p>
                  <div className="space-y-3">
                    <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">潜在风险：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-red-700 dark:text-red-400">
                        <li>机场可能随时跑路或被封锁</li>
                        <li>不良机场可能记录你的上网数据</li>
                        <li>违反当地法律法规可能面临处罚</li>
                        <li>不当使用可能导致账号被封（如游戏账号、社交媒体账号）</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">安全建议：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-green-700 dark:text-green-400">
                        <li>选择口碑好、运营时间长的机场</li>
                        <li>不要在机场上进行敏感操作（如网银、支付等）</li>
                        <li>使用加密通讯工具保护隐私</li>
                        <li>遵守当地法律法规，合理合法使用</li>
                        <li>不要在公共场合或社交媒体上公开讨论翻墙</li>
                        <li>定期更换密码，不要在多个平台使用相同密码</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3">
                    <strong>重要提示：</strong>
                    本站仅提供信息整理服务，不对任何机场的安全性和可靠性做出保证。使用机场服务的风险需由用户自行承担。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  为什么机场节点会经常失效？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">机场节点失效是很常见的现象，主要原因包括：</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
                    <li>
                      <strong>IP 被封锁：</strong>大规模的网络审查会封锁机场使用的服务器 IP
                    </li>
                    <li>
                      <strong>服务器维护：</strong>机场需要定期维护和升级服务器
                    </li>
                    <li>
                      <strong>流量过载：</strong>用户过多导致服务器负载过高
                    </li>
                    <li>
                      <strong>协议特征被识别：</strong>代理协议的流量特征被检测和封锁
                    </li>
                    <li>
                      <strong>敏感时期：</strong>特殊时期网络审查会加强，导致大量节点失效
                    </li>
                  </ul>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">应对方法：</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>选择更新频率高、节点多的机场</li>
                      <li>及时更新客户端和订阅链接</li>
                      <li>准备 2-3 个备用机场</li>
                      <li>关注机场的公告和 Telegram 群组，及时了解节点状态</li>
                      <li>尝试不同的协议和端口（如 443、80 等常用端口）</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  免费机场可以用吗？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">免费机场可以用于临时应急或轻度使用，但不建议长期依赖。免费机场的主要问题：</p>
                  <div className="space-y-3">
                    <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">免费机场的缺点：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-yellow-700 dark:text-yellow-400">
                        <li>速度慢，延迟高，经常断线</li>
                        <li>节点数量少，可用性低</li>
                        <li>隐私安全无保障，可能记录用户数据</li>
                        <li>随时可能关闭，没有售后支持</li>
                        <li>可能包含广告或恶意代码</li>
                        <li>流量限制严格，无法满足正常使用需求</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">适用场景：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>临时应急使用（主力机场暂时不可用）</li>
                        <li>轻度浏览网页、查资料</li>
                        <li>测试和学习代理工具的配置</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-3">
                    <strong>建议：</strong>
                    如果有长期稳定的需求，建议选择付费机场。即使是便宜机场，也比免费机场的体验好很多。本站的"便宜机场"分类整理了性价比较高的选择。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:no-underline py-4">
                  如何使用机场的优惠码？
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                  <p className="mb-3">使用优惠码可以帮你节省机场订阅费用，通常可以获得 8-9 折的优惠。使用步骤：</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">使用流程：</h4>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li>在本站找到你想购买的机场，查看优惠码信息</li>
                        <li>点击"进入机场官网"，注册账号</li>
                        <li>选择合适的套餐，进入结算页面</li>
                        <li>在"优惠码"或"Coupon Code"输入框中填入优惠码</li>
                        <li>点击"应用"或"Apply"按钮，确认折扣已生效</li>
                        <li>完成支付，开始使用服务</li>
                      </ol>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">注意事项：</h4>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>优惠码通常有时效性，请注意有效期</li>
                        <li>部分优惠码可能有使用条件（如仅限新用户、特定套餐等）</li>
                        <li>不同机场的优惠码使用规则可能不同，请仔细阅读说明</li>
                        <li>如果优惠码失效，可以联系机场客服获取最新优惠</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm">
                      💡 <strong>提示：</strong>本站会持续更新各机场的最新优惠码，建议收藏本站以便随时查看。
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>还有其他问题？</strong>欢迎通过我们的联系方式反馈，我们会不断完善 FAQ
                内容。同时也建议加入各机场的 Telegram 群组，那里通常有更及时的技术支持和使用经验分享。
              </p>
            </div>
          </section>
        </div>
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
                  {/* <a href={selectedSite.url} target="_blank" rel="noopener noreferrer">
                    访问网站
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a> */}
                  <AirportLink url={selectedSite.url} title={"进入机场官网"} />
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
            <p>
              本站内容来源于公开信息与用户反馈整理，仅作为信息参考使用。机场服务的稳定性、速度与可用性可能因时间与地区不同而有所变化，建议在购买前自行判断是否符合自身需求。
            </p>
            <p className="mt-2">
              本站仅提供机场信息整理与推荐导航服务，不提供任何网络代理或加速服务。所有机场服务均由第三方独立运营，使用过程中产生的任何问题或风险，需由用户自行承担。
            </p>
            <p>© 2026 靠谱机场导航 · 机场推荐与优惠码一站式整理. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
