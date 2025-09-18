import { Button } from "./ui/button";
import {
  ArrowRight,
  Sparkles,
  Globe,
  BookOpen,
  Stars,
  Heart,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-bg-hero">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          

          {/* Main heading */}
          <h1 className="md:text-7xl font-bold mb-8 leading-tight text-[48px]">
            <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
              发现语言
            </span>
            <br />
            <span className="text-white">探索世界</span>
          </h1>

          {/* Subtitle */}
          <p className="md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed text-[14px]">
            个性化的语言学习指导，深入的文化探索体验
            <br />
            让每一次学习都成为通向更广阔世界的桥梁
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              size="lg"
              className="px-8 py-3 rounded-full font-medium group bg-white text-slate-900 hover:bg-slate-100 border-0"
            >
              开始探索
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-16 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-white/80">支持语言</div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/30"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                100K+
              </div>
              <div className="text-white/80">活跃学习者</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
}