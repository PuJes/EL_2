import Link from "next/link"
import { Globe } from "lucide-react"

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-muted/30 dark:bg-card text-foreground py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold">语言世界</span>
            </div>
            <p className="text-muted-foreground text-sm">
              个性化的语言学习指导，深入的文化探索体验。让每一次学习都成为通向更广阔世界的桥梁。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.017 0C18.624 0 20 1.376 20 8.017v3.966C20 18.624 18.624 20 12.017 20H7.983C1.376 20 0 18.624 0 11.983V8.017C0 1.376 1.376 0 7.983 0h4.034zm0 1.8H7.983C2.27 1.8 1.8 2.27 1.8 7.983v4.034c0 5.713.47 6.183 6.183 6.183h4.034c5.713 0 6.183-.47 6.183-6.183V7.983c0-5.713-.47-6.183-6.183-6.183z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">学习资源</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/survey" className="text-muted-foreground hover:text-foreground transition-colors">语言推荐</Link></li>
              <li><Link href="/recommendation" className="text-muted-foreground hover:text-foreground transition-colors">AI推荐</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">学习计划</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">难度评估</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">学习工具</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">文化探索</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/culture" className="text-muted-foreground hover:text-foreground transition-colors">世界文化</Link></li>
              <li><Link href="/languages" className="text-muted-foreground hover:text-foreground transition-colors">语言列表</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">语言历史</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">文化对比</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">节日习俗</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">关于我们</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">联系方式</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">合作伙伴</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 语言世界. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}