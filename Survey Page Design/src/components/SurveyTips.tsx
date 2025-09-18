import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Shield, HelpCircle } from "lucide-react";

export function SurveyTips() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            为什么需要这些信息？
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              收集这些信息可以帮助我们：
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• 推荐最适合您的语言学习方案</li>
              <li>• 个性化学习内容和进度安排</li>
              <li>• 提供相关的文化背景知识</li>
              <li>• 匹配合适的学习伙伴和社区</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            数据隐私说明
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              我们承诺保护您的隐私：
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• 所有数据仅用于个性化推荐</li>
              <li>• 不会向第三方分享您的信息</li>
              <li>• 您可以随时删除或修改数据</li>
              <li>• 采用安全加密存储技术</li>
            </ul>
            <div className="pt-2">
              <Badge variant="secondary" className="text-xs">
                符合数据保护法规
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            预计完成时间
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              大约需要时间：
            </span>
            <Badge variant="outline">
              2-3 分钟
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            所有问题都很简单，您可以随时保存并稍后继续
          </p>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm">
              💡 <strong>小贴士：</strong>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              诚实回答问题将帮助我们为您提供更准确的推荐。如果您不确定某个答案，选择最接近的选项即可。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}