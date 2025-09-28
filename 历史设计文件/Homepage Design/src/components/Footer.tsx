import { Globe, Mail, MessageCircle, Twitter, Facebook, Instagram, Heart, Star, Sparkles } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  const quickLinks = [
    { title: "语言探索", href: "/languages" },
    { title: "文化世界", href: "/culture" },
    { title: "学习指导", href: "/learning" },
    { title: "资源工具", href: "/resources" }
  ];

  const supportLinks = [
    { title: "帮助中心", href: "/help" },
    { title: "常见问题", href: "/faq" },
    { title: "用户指南", href: "/guide" },
    { title: "联系我们", href: "/contact" }
  ];

  const legalLinks = [
    { title: "隐私政策", href: "/privacy" },
    { title: "服务条款", href: "/terms" },
    { title: "Cookie政策", href: "/cookies" }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: MessageCircle, href: "#", label: "WeChat", color: "hover:text-green-500" }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">语言世界</span>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              致力于为全球语言学习者提供个性化的学习指导和深度的文化探索体验
            </p>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color} hover:bg-slate-700 group`}
                    aria-label={social.label}
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">快速链接</h4>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">支持与帮助</h4>
            <nav className="flex flex-col space-y-3">
              {supportLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">联系方式</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-4 w-4" />
                <span>contact@languageworld.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MessageCircle className="h-4 w-4" />
                <span>在线客服 (9:00-18:00)</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-semibold">法律条款</h5>
              <nav className="flex flex-col space-y-2">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {link.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-slate-800" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <p className="text-slate-400">
              © 2024 语言世界. 保留所有权利.
            </p>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-pink-500 fill-current" />
              <span className="text-sm text-slate-400">Made with love</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>服务全球 200+ 国家和地区</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>支持 50+ 种语言学习</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}