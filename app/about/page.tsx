import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Heart, Mail, Github } from "lucide-react"
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
            <h1 className="text-4xl font-bold text-foreground mb-4">靠谱机场导航</h1>
            <p className="text-lg text-muted-foreground text-balance">机场推荐与优惠码一站式整理</p>
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
                  在信息爆炸的时代，我们每天都会接触到大量的网站和在线工具。WebNav
                  的诞生，就是为了帮助大家快速找到真正优质、实用的网络资源。
                </p>
                <p>
                  我们精心筛选每一个收录的网站，确保它们在各自领域都具有代表性和实用价值。无论你是设计师、开发者，还是普通用户，都能在这里找到适合自己的工具。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>特色功能</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5">
                      01
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">智能搜索</div>
                      <div className="text-sm text-muted-foreground">支持实时搜索，快速定位你需要的资源</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5">
                      02
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">分类浏览</div>
                      <div className="text-sm text-muted-foreground">按类别组织，让查找更有针对性</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5">
                      03
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">精选推荐</div>
                      <div className="text-sm text-muted-foreground">标记最受欢迎的资源，节省你的时间</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-0.5">
                      04
                    </Badge>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">主题合集</div>
                      <div className="text-sm text-muted-foreground">按主题整理的网站集合，一站式解决方案</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>技术栈</CardTitle>
                <CardDescription>使用现代化的技术构建</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Next.js 16</Badge>
                  <Badge>React 19</Badge>
                  <Badge>Tailwind CSS</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>shadcn/ui</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
                <CardDescription>欢迎反馈建议或推荐优质网站</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:contact@example.com">
                    <Mail className="h-4 w-4 mr-2" />
                    邮件联系
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
