import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "靠谱机场导航｜机场推荐与优惠码一站式整理",
  description:
    "整理长期稳定的靠谱机场推荐，汇总最新机场优惠码与套餐信息，支持 Clash、V2Ray、Shadowrocket 等客户端，提供真实使用体验与对比参考，一站式选机场更省心。",
  keywords: ["靠谱机场导航", "机场推荐", "机场推荐与优惠码", "机场推荐与优惠码一站式整理"],
  authors: [{ name: "靠谱机场导航" }],
  creator: "靠谱机场导航",
  publisher: "靠谱机场导航",
  generator: "机场主",
  // metadataBase: new URL("https://"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    title: "靠谱机场导航｜机场推荐与优惠码一站式整理",
    description: "整理长期稳定的靠谱机场推荐，汇总最新机场优惠码与套餐信息，支持 Clash、V2Ray、Shadowrocket 等客户端，提供真实使用体验与对比参考，一站式选机场更省心。",
    siteName: "靠谱机场导航",
  },
  twitter: {
    card: "summary_large_image",
    title: "靠谱机场导航",
    description: "整理长期稳定的靠谱机场推荐，汇总最新机场优惠码与套餐信息，支持 Clash、V2Ray、Shadowrocket 等客户端，提供真实使用体验与对比参考，一站式选机场更省心。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
