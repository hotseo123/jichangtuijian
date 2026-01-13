
// app/page.tsx  ← 这是服务端组件，顶部不要写 "use client"
import { getSites } from '@/lib/getSites.server'; // 顶部可以 import Node 模块
import NavigationPage from './page-nav';

export default async function HomePage() {
  const sites = getSites(); // 服务端运行
  return <NavigationPage sites={sites} />;
}
