import { Button } from "./ui/button";
import {
  Globe,
  Menu,
  Settings,
  User,
  Heart,
  Sparkles,
  Home,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(
    null,
  );

  const navigationItems = [
    { title: "首页", href: "/" },
    { title: "语言探索", href: "/languages" },
    { title: "文化世界", href: "/culture" },
    { title: "学习指导", href: "/learning" },
    { title: "资源工具", href: "/resources" },
  ];

  // 导航菜单内容配置
  const navigationMenuContent = {
    语言探索: {
      items: [
        {
          title: "热门语言推荐",
          href: "/languages/popular",
          description: "发现最受欢迎的学习语言",
        },
        {
          title: "语言难度评估",
          href: "/languages/difficulty",
          description: "了解不同语言的学习难度",
        },
        {
          title: "学习路径规划",
          href: "/languages/path",
          description: "制定个性化学习计划",
        },
        {
          title: "语言交换社区",
          href: "/languages/community",
          description: "与母语者交流互动",
        },
      ],
    },
    文化世界: {
      items: [
        {
          title: "文化探索精选",
          href: "/culture/featured",
          description: "精选文化内容推荐",
        },
        {
          title: "节日庆典",
          href: "/culture/festivals",
          description: "世界各地节日文化",
        },
        {
          title: "传统艺术",
          href: "/culture/arts",
          description: "传统艺术形式欣赏",
        },
        {
          title: "美食文化",
          href: "/culture/cuisine",
          description: "品味各国特色美食",
        },
      ],
    },
    学习指导: {
      items: [
        {
          title: "学习方法推荐",
          href: "/learning/methods",
          description: "科学高效的学习方法",
        },
        {
          title: "记忆技巧",
          href: "/learning/memory",
          description: "增强记忆的实用技巧",
        },
        {
          title: "发音练习",
          href: "/learning/pronunciation",
          description: "标准发音训练指导",
        },
        {
          title: "语法精讲",
          href: "/learning/grammar",
          description: "系统语法知识梳理",
        },
      ],
    },
    资源工具: {
      items: [
        {
          title: "工具浏览",
          href: "/resources/browse",
          description: "精选学习工具推荐",
        },
        {
          title: "在线词典",
          href: "/resources/dictionary",
          description: "多语言在线词典",
        },
        {
          title: "语言测试",
          href: "/resources/tests",
          description: "语言水平测试工具",
        },
        {
          title: "学习应用",
          href: "/resources/apps",
          description: "优质学习应用推荐",
        },
      ],
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur opacity-60"></div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent text-[14px]">
              语言世界
            </span>
            <div className="text-xs text-slate-500 font-medium text-[11px]">
              Language World
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const hasDropdown = item.title !== "首页";

            if (!hasDropdown) {
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="relative px-6 py-3 text-slate-700 font-medium transition-all duration-200 hover:text-slate-900 group"
                >
                  <span className="relative z-10">
                    {item.title}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </a>
              );
            }

            return (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-2 px-6 py-3 text-slate-700 font-medium transition-all duration-200 hover:text-slate-900 group">
                  <span className="relative z-10">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${activeMenu === item.title ? "rotate-180" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                    activeMenu === item.title
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-2xl shadow-slate-900/10 p-6 w-96">
                    <div className="grid gap-3">
                      {navigationMenuContent[
                        item.title as keyof typeof navigationMenuContent
                      ]?.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/60 transition-colors"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors mb-1">
                              {subItem.title}
                            </div>
                            <div className="text-xs text-slate-600 group-hover:text-slate-700 leading-relaxed">
                              {subItem.description}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0" />
                        </a>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/60">
                      <a
                        href={item.href}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02]"
                      >
                        <span>查看全部{item.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* User Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-xl hover:bg-slate-100/80 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="font-medium">设置</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white/95 backdrop-blur-xl border-slate-200/60"
            >
              <DropdownMenuItem className="gap-3 py-3">
                <User className="h-4 w-4" />
                <span>调研问卷重新填写</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-3">
                <Globe className="h-4 w-4" />
                <span>重新选择母语</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden w-11 h-11 rounded-xl"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-white/95 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-8 py-8">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-200/60">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      语言世界
                    </div>
                    <div className="text-xs text-slate-500">
                      Language World
                    </div>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 text-slate-700 hover:text-slate-900 font-medium transition-all duration-200"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  ))}
                </nav>

                <div className="pt-6 border-t border-slate-200/60 space-y-3">
                  <button className="flex items-center w-full py-4 px-4 rounded-xl hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 font-medium transition-colors">
                    <User className="h-5 w-5 mr-3" />
                    调研问卷重新填写
                  </button>
                  <button className="flex items-center w-full py-4 px-4 rounded-xl hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 font-medium transition-colors">
                    <Globe className="h-5 w-5 mr-3" />
                    重新选择母语
                  </button>

                  <Button className="w-full mt-6 h-12 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary/90">
                    开始学习
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}