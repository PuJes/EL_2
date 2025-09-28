import { Card, CardContent } from "./ui/card";
import {
  Brain,
  Globe2,
  GraduationCap,
  Wrench,
  Sparkles,
  Heart,
  Star,
  Zap,
} from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: Brain,
      title: "因材施教",
      description:
        "根据您的母语和学习目标，定制学习难度和时间规划",
      color: "text-blue-600",
    },
    {
      icon: Globe2,
      title: "文化浸润",
      description: "不只是语言，更是文化的深度体验和理解",
      color: "text-green-600",
    },
    {
      icon: GraduationCap,
      title: "专家方法",
      description: "汇聚语言学习专家的方法论和实践经验",
      color: "text-purple-600",
    },
    {
      icon: Wrench,
      title: "学习工具排名",
      description: "全世界的人都在用什么工具学习语言",
      color: "text-orange-600",
    },
  ];

  return (
    <section className="py-24 section-bg-features">
      <div className="container mx-auto px-6"> {/* Content wrapper */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            为什么选择我们
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            我们致力于为每位学习者提供最个性化、最有效的语言学习体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-slate-50/50 hover:bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent
                          className={`h-8 w-8 ${feature.color}`}
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
}