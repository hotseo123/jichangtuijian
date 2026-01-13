import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, RefreshCw, Bug } from "lucide-react"
import { Navigation } from "@/components/navigation"

const changelog = [
  {
    version: "1.2.0",
    date: "2025-01-13",
    changes: [
      { type: "feature", text: "添加优秀网站合集页面，按主题分类展示精选资源" },
      { type: "feature", text: "新增顶部导航菜单，方便页面间快速切换" },
      { type: "improvement", text: "优化搜索功能，支持模糊匹配资源名称和描述" },
    ],
  },
  {
    version: "1.1.0",
    date: "2025-01-10",
    changes: [
      { type: "feature", text: "添加精选标签功能，标记最受欢迎的资源" },
      { type: "feature", text: "新增分类筛选按钮，快速定位所需类别" },
      { type: "improvement", text: "改进卡片悬停效果，提升交互体验" },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-01-01",
    changes: [
      { type: "feature", text: "网站正式上线，提供 50+ 优质网站导航" },
      { type: "feature", text: "实现实时搜索功能" },
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
