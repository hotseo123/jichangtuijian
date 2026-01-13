import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WebNav - 精选网站导航 | 设计、开发、AI工具大全",
  description:
    "WebNav 是一个精选的网站导航目录，收录设计工具、开发工具、AI助手、学习资源等优质网站。支持分类浏览、实时搜索，帮助您快速找到所需的在线工具和资源。",
  keywords: ["网站导航", "设计工具", "开发工具", "AI工具", "在线工具", "资源导航", "web导航", "网址大全"],
  authors: [{ name: "WebNav" }],
  creator: "WebNav",
  publisher: "WebNav",
  generator: "v0.app",
  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    title: "WebNav - 精选网站导航 | 设计、开发、AI工具大全",
    description: "精选的网站导航目录，收录设计工具、开发工具、AI助手、学习资源等优质网站",
    siteName: "WebNav",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebNav - 精选网站导航",
    description: "精选的网站导航目录，收录设计工具、开发工具、AI助手、学习资源等优质网站",
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
