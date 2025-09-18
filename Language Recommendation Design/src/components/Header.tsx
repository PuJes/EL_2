import { motion } from "motion/react";
import { ArrowLeft, Globe, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container max-w-6xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo和返回按钮 */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">返回</span>
            </Button>
          </motion.div>

          <div className="h-6 w-px bg-slate-300 hidden sm:block" />

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur opacity-60"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                语言推荐
              </span>
              <div className="text-xs text-slate-500 font-medium">
                Language Recommendation
              </div>
            </div>
          </div>
        </div>

        {/* 设置菜单 */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 h-11 px-4 rounded-xl hover:bg-slate-100/80 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span className="font-medium hidden sm:inline">设置</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white/95 backdrop-blur-xl border-slate-200/60"
            >
              <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
                <Globe className="h-4 w-4" />
                <span>重新评估</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 py-3 cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                <span>返回首页</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}