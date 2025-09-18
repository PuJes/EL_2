import { motion } from "motion/react";
import { Globe, Heart, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  const footerLinks = {
    "产品": [
      { name: "语言探索", href: "/languages" },
      { name: "文化世界", href: "/culture" },
      { name: "学习指导", href: "/learning" },
      { name: "资源工具", href: "/resources" }
    ],
    "支持": [
      { name: "帮助中心", href: "/help" },
      { name: "联系我们", href: "/contact" },
      { name: "用户反馈", href: "/feedback" },
      { name: "问题报告", href: "/issues" }
    ],
    "公司": [
      { name: "关于我们", href: "/about" },
      { name: "隐私政策", href: "/privacy" },
      { name: "服务条款", href: "/terms" },
      { name: "开发者API", href: "/api" }
    ]
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full transform -translate-x-32 translate-y-32"></div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* 品牌信息 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur opacity-60"></div>
              </div>
              <div>
                <div className="text-xl font-bold">语言世界</div>
                <div className="text-sm text-slate-400">Language World</div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              连接世界语言文化，为每一位学习者提供个性化的语言学习推荐和深度文化体验。
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-xl flex items-center justify-center transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* 链接列表 */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
              >
                <h3 className="font-semibold text-lg mb-4 text-white">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + categoryIndex * 0.1 + linkIndex * 0.05
                      }}
                    >
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 分割线 */}
        <motion.div
          className="my-12 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        ></motion.div>

        {/* 底部信息 */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-slate-400 text-sm">
            © 2024 语言世界. 保留所有权利.
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>用</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>制作</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}