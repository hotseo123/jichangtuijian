import fs from "fs"
import path from "path"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Shield,
  Zap,
  DollarSign,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Wifi,
  Globe,
  Clock,
  Users,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "2026年靠谱机场推荐 | 稳定高速机场优惠码合集 - 机场推荐导航",
  description:
    "精选2026年最稳定靠谱的机场推荐，提供一枝红杏、奈云、Cyberguard等老牌机场真实测评与最新优惠码。支持Shadowsocks、V2Ray、Trojan协议，解锁Netflix、ChatGPT等流媒体服务，IEPL专线低延迟，适合工作学习使用。",
  keywords: [
    "机场推荐",
    "靠谱机场",
    "机场优惠码",
    "翻墙工具",
    "VPN推荐",
    "一枝红杏",
    "奈云机场",
    "Shadowsocks",
    "V2Ray",
    "Trojan",
    "流媒体解锁",
    "IEPL专线",
    "机场测评",
    "稳定机场",
  ],
  openGraph: {
    title: "2026年靠谱机场推荐 | 稳定高速机场优惠码合集",
    description: "精选2026年最稳定靠谱的机场推荐，提供真实测评与最新优惠码，支持多种协议，解锁流媒体服务。",
    type: "website",
  },
}

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

export default function CollectionsPage() {
  const sites = getSites()
  const featuredSites = sites.filter((site) => site.featured)
  const allAirports = sites.filter((site) => site.category === "kaopu-airports")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              2026年靠谱机场推荐与优惠码合集
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              精选长期稳定运营的优质机场推荐，提供真实使用体验与最新优惠码信息。支持 Shadowsocks、V2Ray、Trojan
              等主流协议，覆盖全球节点，解锁 Netflix、Disney+、ChatGPT 等流媒体与 AI 服务。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{allAirports.length}+</div>
                <div className="text-sm text-muted-foreground">精选机场</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{featuredSites.length}</div>
                <div className="text-sm text-muted-foreground">推荐机场</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">10年+</div>
                <div className="text-sm text-muted-foreground">最长运营</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">10万+</div>
                <div className="text-sm text-muted-foreground">服务用户</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              精选推荐机场
            </h2>
            <p className="text-muted-foreground">
              经过长期测试验证，以下机场在稳定性、速度、客服响应等方面表现优异，适合长期使用
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredSites.map((site) => (
              <Card key={site.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center gap-2">
                        {site.name}
                        {site.featured && <Badge variant="default">推荐</Badge>}
                        <Badge
                          variant={site.status === "normal" ? "default" : "secondary"}
                          className={
                            site.status === "normal"
                              ? "bg-green-500"
                              : site.status === "unstable"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {site.status === "normal" ? "运行正常" : site.status === "unstable" ? "偶尔不稳" : "暂时失联"}
                        </Badge>
                      </CardTitle>
                      {site.discount && (
                        <Badge variant="destructive" className="mb-2">
                          {site.discount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-base">{site.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {site.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {site.promoCode && (
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-sm">优惠信息</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            优惠码：<code className="bg-background px-2 py-1 rounded">{site.promoCode}</code>
                          </div>
                          <div className="text-muted-foreground">{site.promoDescription}</div>
                          {site.promoExpiry && (
                            <div className="text-xs text-muted-foreground">有效期：{site.promoExpiry}</div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>最近活跃：{site.lastActive}</span>
                    </div>

                    <Button className="w-full" asChild>
                      <a href={site.url} target="_blank" rel="noopener noreferrer">
                        访问官网
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              全部机场列表
            </h2>
            <p className="text-muted-foreground">更多机场选择，满足不同需求和预算</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAirports
              .filter((site) => !site.featured)
              .map((site) => (
                <Card key={site.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{site.name}</span>
                      <Badge
                        variant="outline"
                        className={
                          site.status === "normal"
                            ? "border-green-500 text-green-500"
                            : site.status === "unstable"
                              ? "border-yellow-500 text-yellow-500"
                              : "border-red-500 text-red-500"
                        }
                      >
                        {site.status === "normal" ? "正常" : site.status === "unstable" ? "不稳定" : "失联"}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{site.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {site.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href={site.url} target="_blank" rel="noopener noreferrer">
                        查看详情
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* What is Airport */}
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Wifi className="h-6 w-6 text-primary" />
              什么是机场服务？
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  机场（Airport）是提供网络加速服务的平台，通过部署在全球各地的服务器节点，帮助用户实现科学上网。机场服务通常支持
                  Shadowsocks、V2Ray、Trojan 等多种代理协议，可以解锁 Netflix、Disney+、YouTube、ChatGPT
                  等国际互联网服务。
                </p>
                <p className="text-muted-foreground">
                  相比传统
                  VPN，机场服务具有速度更快、延迟更低、稳定性更好的优势，特别适合需要长期使用、对网络质量要求较高的用户。
                </p>
              </CardContent>
            </Card>
          </section>

          {/* How to Choose */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              如何选择靠谱机场？
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    运营时长
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    优先选择运营 1 年以上的机场，老牌机场经过市场验证，跑路风险更低，服务更稳定。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    线路质量
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    IEPL、IPLC 等专线线路速度快、延迟低、稳定性好，适合长期使用。CN2 GIA
                    线路性价比高，适合预算有限的用户。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    用户评价
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    查看其他用户的真实评价和使用体验，了解机场的实际表现，避免踩坑。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    价格合理
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    根据自己的需求选择合适的套餐，不要盲目追求低价，也不必选择过于昂贵的服务。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Usage Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-primary" />
              使用建议与注意事项
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">准备备用机场：</strong>
                      建议同时购买 2-3 个机场服务，避免单一机场出现问题时无法使用。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">选择月付套餐：</strong>
                      新用户建议先购买月付套餐试用，确认稳定可用后再考虑年付以获得更多优惠。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">合理使用流量：</strong>
                      避免下载 BT、做种等大流量操作，可能导致账号被限速或封禁。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">保护个人隐私：</strong>
                      不要在使用代理时登录国内平台账号，避免账号异常风险。
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">关注官方公告：</strong>
                      及时关注机场官方 Telegram 频道或网站公告，了解节点更新和维护信息。
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Preview */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">常见问题</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">机场和 VPN 有什么区别？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    机场使用 Shadowsocks、V2Ray 等轻量级代理协议，速度更快、延迟更低，适合日常使用。VPN
                    使用完整的加密隧道，安全性更高但速度相对较慢，更适合企业办公场景。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">如何使用优惠码？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    在机场官网注册账号后，进入购买页面选择套餐，在结算页面找到"优惠码"或"折扣码"输入框，填入优惠码后点击应用即可享受折扣。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">推荐使用什么客户端？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Windows 推荐 Clash Verge、V2rayN；macOS 推荐 Clash Verge Rev、ClashX Pro；Android 推荐 Clash
                    Meta、V2rayNG；iOS 推荐 Shadowrocket、Stash。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Update Notice */}
          <section className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              更新说明
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              本页面持续更新维护，所有机场推荐均经过真实测试。我们会定期检查机场运行状态，及时更新优惠信息和节点情况。
            </p>
            <p className="text-sm text-muted-foreground">最后更新时间：2026年1月 | 下次更新：每周一次</p>
          </section>
        </div>
      </div>
    </div>
  )
}
