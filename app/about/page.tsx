import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Heart, Shield, Zap, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Info className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">关于机场导航</h1>
            <p className="text-lg text-muted-foreground text-balance">专业的机场推荐与优惠信息聚合平台</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  项目初衷
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  在互联网全球化的今天，访问国际网络资源已经成为学习、工作和生活中的刚需。然而，市面上机场服务质量参差不齐，价格不透明，用户很难找到真正稳定、安全、性价比高的服务。
                </p>
                <p>
                  本站致力于为用户提供客观、详实的机场评测与推荐信息。我们持续跟踪各大机场的服务质量、价格变动、优惠活动，并汇总最新的优惠码信息，帮助用户做出明智的选择。
                </p>
                <p>我们不收取任何推广费用，所有推荐均基于实际测试和用户反馈，确保信息的真实性和可靠性。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>核心功能</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 flex-shrink-0">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">机场状态监控</div>
                      <div className="text-sm text-muted-foreground">
                        实时跟踪机场运行状态，标记正常、不稳定、失联等状态，帮助用户避开问题服务
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 flex-shrink-0">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">优惠码聚合</div>
                      <div className="text-sm text-muted-foreground">
                        收集整理各大机场的最新优惠码和折扣信息，让用户以更优惠的价格享受服务
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 flex-shrink-0">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">客户端下载指南</div>
                      <div className="text-sm text-muted-foreground">
                        提供全平台客户端下载链接和使用教程，支持Windows、macOS、iOS、Android等
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 flex-shrink-0">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">详细机场信息</div>
                      <div className="text-sm text-muted-foreground">
                        展示机场截图、联系方式、活跃时间、用户评价等全方位信息
                      </div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>网站特色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground mb-2">🔍 智能搜索</div>
                    <div className="text-sm text-muted-foreground">支持机场名称、描述、标签多维度搜索</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground mb-2">🏷️ 标签分类</div>
                    <div className="text-sm text-muted-foreground">通过标签快速筛选高速、稳定、性价比机场</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground mb-2">📊 状态监控</div>
                    <div className="text-sm text-muted-foreground">实时监控机场可用性，及时更新状态信息</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground mb-2">💰 优惠聚合</div>
                    <div className="text-sm text-muted-foreground">汇总所有优惠码，帮助用户节省开支</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground mb-2">📱 移动优化</div>
                    <div className="text-sm text-muted-foreground">完美适配手机端，随时随地查看信息</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-foreground mb-2">❓ FAQ问答</div>
                    <div className="text-sm text-muted-foreground">详细的常见问题解答和使用教程</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>技术栈</CardTitle>
                <CardDescription>使用现代化技术构建的高性能网站</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Next.js 16</Badge>
                  <Badge>React 19</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Tailwind CSS v4</Badge>
                  <Badge>shadcn/ui</Badge>
                  <Badge>Server Components</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>联系我们</CardTitle>
                <CardDescription>如有机场推荐、问题反馈或合作意向，欢迎联系</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <a href="mailto:contact@example.com">
                      <Mail className="h-4 w-4 mr-2" />
                      邮件联系
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <a href="https://t.me/example" target="_blank" rel="noopener noreferrer">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.098.155.23.171.324.016.094.036.308.02.475z" />
                      </svg>
                      Telegram频道
                    </a>
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">免责声明：</strong>
                    本站仅提供机场信息聚合服务，不提供任何代理服务。所有机场信息来源于公开渠道，用户需自行判断服务质量。请遵守当地法律法规，合理使用网络服务。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
