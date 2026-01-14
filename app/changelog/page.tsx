import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, RefreshCw, Bug } from "lucide-react"
import { Navigation } from "@/components/navigation"

const changelog = [
  {
    version: "2.1.0",
    date: "2025-01-14",
    changes: [
      { type: "feature", text: "新增机场FAQ模块，解答机场、VPN、客户端等常见问题" },
      { type: "feature", text: "添加机场客户端下载指南，支持多平台客户端推荐" },
      { type: "improvement", text: "优化机场推荐页面SEO，增强搜索引擎友好度" },
      { type: "improvement", text: "完善机场详情展示，新增优惠码、截图预览等功能" },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-01-13",
    changes: [
      { type: "feature", text: "重构机场推荐系统，采用JSON数据驱动" },
      { type: "feature", text: "新增机场状态监控（正常/不稳定/失联）" },
      { type: "feature", text: "添加优惠码折扣显示功能，支持悬浮查看详情" },
      { type: "feature", text: "实现机场标签分类，方便快速筛选" },
      { type: "improvement", text: "优化移动端体验，适配小屏幕设备" },
    ],
  },
  {
    version: "1.5.0",
    date: "2025-01-10",
    changes: [
      { type: "feature", text: "新增机场联系方式展示（邮箱、Telegram）" },
      { type: "feature", text: "添加机场最近活跃时间跟踪" },
      { type: "feature", text: "实现机场截图预览功能" },
      { type: "improvement", text: "优化卡片布局，支持每行显示6个站点" },
    ],
  },
  {
    version: "1.2.0",
    date: "2025-01-05",
    changes: [
      { type: "feature", text: "添加机场合集页面，按主题分类展示精选机场" },
      { type: "feature", text: "新增顶部导航菜单，包含首页、推荐、日志、关于" },
      { type: "improvement", text: "优化搜索功能，支持机场名称、描述、标签搜索" },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-01-01",
    changes: [
      { type: "feature", text: "网站正式上线，提供优质机场导航服务" },
      { type: "feature", text: "实现机场分类筛选功能" },
      { type: "feature", text: "支持响应式布局，完美适配各种设备" },
    ],
  },
]

const getChangeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Plus className="h-4 w-4" />
    case "improvement":
      return <RefreshCw className="h-4 w-4" />
    case "fix":
      return <Bug className="h-4 w-4" />
    default:
      return null
  }
}

const getChangeBadge = (type: string) => {
  switch (type) {
    case "feature":
      return "新功能"
    case "improvement":
      return "优化"
    case "fix":
      return "修复"
    default:
      return type
  }
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">更新日志</h1>
            <p className="text-lg text-muted-foreground text-balance">记录每一次改进，持续优化用户体验</p>
          </div>

          <div className="space-y-8">
            {changelog.map((entry, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">版本 {entry.version}</CardTitle>
                    <Badge variant="outline" className="text-sm">
                      {entry.date}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-3">
                        <div className="flex items-center gap-2 min-w-[80px]">
                          <div className="text-primary">{getChangeIcon(change.type)}</div>
                          <Badge variant="secondary" className="text-xs">
                            {getChangeBadge(change.type)}
                          </Badge>
                        </div>
                        <span className="text-muted-foreground flex-1">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
