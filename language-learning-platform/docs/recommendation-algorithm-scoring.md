# 语言推荐算法评分详细说明

本文档详细说明了语言推荐系统中各个维度评分的计算方法。

## 总体评分公式

```typescript
matchScore = Math.round(
  culturalScore * 0.30 +      // 文化匹配 30%
  difficultyScore * 0.25 +    // 难度适配 25%
  goalScore * 0.20 +          // 目标匹配 20%
  timeScore * 0.15 +          // 时间可行 15%
  practicalScore * 0.10       // 实用价值 10%
)
```

---

## 1. 文化兴趣匹配度 (culturalScore) - 30%权重

**评分范围**: 0-100分
**计算文件**: `calculateCulturalMatch()`

### 计算逻辑

#### 1.1 文化区域匹配 (权重: 100分)

```typescript
// 文化区域映射表
culturalMapping = {
  'east-asia': ['japanese', 'korean', 'chinese'],
  'southeast-asia': ['thai', 'vietnamese', 'indonesian'],
  'europe': ['french', 'german', 'italian', 'spanish'],
  'latin-america': ['spanish', 'portuguese'],
  'middle-east': ['arabic', 'persian', 'turkish'],
  'africa': ['swahili', 'arabic'],
  'north-america': ['english', 'french'],
  'oceania': ['english']
}
```

**计算方式**:

- 遍历用户选择的文化兴趣区域
- 如果语言ID在该区域的语言列表中，获得: `100 / 用户兴趣区域数量`
- 只要有一个匹配就跳出循环

**示例**:

- 用户兴趣: ['east-asia', 'europe']
- 语言: 日语 (japanese)
- 匹配到 'east-asia'，得分: 100/2 = 50分

#### 1.2 最终计算

```typescript
return Math.min(Math.round((score / maxScore) * 100), 100)
```

---

## 2. 难度适配度 (difficultyScore) - 25%权重

**评分范围**: 0-100分
**计算文件**: `calculateDifficultyFit()`

### 计算逻辑

#### 2.1 基础适配度

```typescript
const baseMatch = 100 - Math.abs(baseDifficulty - userPreference) * 20
```

**参数说明**:

- `baseDifficulty`: 语言标准难度 (1-5)
- `userPreference`: 用户难度偏好 (1-5)

**计算方式**:

- 计算难度差的绝对值
- 每1个难度级别差异扣20分

**示例**:

- 语言难度: 4, 用户偏好: 3
- 基础适配度: 100 - |4-3| * 20 = 80分

#### 2.2 母语相似度调整 (最高60分奖励)

```typescript
// 语系相似度矩阵 (增强版)
languageFamilySimilarity = {
  'chinese': { 'japanese': 0.5, 'korean': 0.3, 'vietnamese': 0.2 },
  'spanish': { 'portuguese': 0.8, 'italian': 0.7, 'french': 0.6 },
  'english': { 'german': 0.6, 'dutch': 0.5, 'swedish': 0.4 }
}

// 非线性奖励机制
if (similarity >= 0.6) familyBonus = similarity * 60      // 高相似度语言
else if (similarity >= 0.3) familyBonus = similarity * 50 // 中等相似度
else familyBonus = similarity * 40                        // 低相似度
```

**示例**:

- 母语: 中文, 目标语言: 日语
- 相似度: 0.5 (提升后)
- 奖励分: 0.5 * 50 = 25分 (vs 原来9分)

**高相似度示例**:

- 母语: 西班牙语, 目标语言: 葡萄牙语
- 相似度: 0.8
- 奖励分: 0.8 * 60 = 48分

#### 2.3 学习经验调整 (最高30分奖励)

```typescript
experienceBonus = Math.min(knownLanguagesCount * 10, 30)
```

**计算方式**:

- 每掌握一门语言 +10分
- 最高奖励30分

**示例**:

- 已掌握语言: 2门
- 经验奖励: min(2*10, 30) = 20分

#### 2.4 最终计算

```typescript
finalScore = baseMatch + familyBonus + experienceBonus
return Math.min(Math.max(Math.round(finalScore), 0), 100)
```

---

## 3. 学习目标匹配度 (goalScore) - 20%权重

**评分范围**: 0-100分
**计算文件**: `calculateGoalAlignment()`

### 计算逻辑

#### 3.1 学习目标匹配 (权重: 100分) - 预设评分体系

```typescript
// 语言各维度预设评分 (0-100分)
languageMotivationScores = {
  'japanese': { business: 85, travel: 90, culture: 95, academic: 75 },
  'korean': { business: 80, travel: 85, culture: 90, academic: 70 },
  'spanish': { business: 75, travel: 95, culture: 85, academic: 70 },
  'french': { business: 80, travel: 85, culture: 90, academic: 85 },
  'german': { business: 90, travel: 75, culture: 80, academic: 90 },
  'english': { business: 95, travel: 80, culture: 75, academic: 95 }
}

// 根据动机获取预设分数
switch (motivation) {
  case 'career': motivationScore = languageScores.business
  case 'travel': motivationScore = languageScores.travel
  case 'culture': motivationScore = languageScores.culture
  case 'academic': motivationScore = languageScores.academic
}
score += motivationScore // 直接使用0-100分
```

**评分依据**:

- **business**: 基于经济实力、跨国企业、贸易量
- **travel**: 基于旅游业、签证便利度、文化吸引力
- **culture**: 基于文化产业、艺术影响力、历史底蕴
- **academic**: 基于高等教育、研究产出、学术声誉

#### 3.2 最终计算

```typescript
return Math.round((score / maxScore) * 100)  // maxScore = 100
```

---

## 4. 时间可行性 (timeScore) - 15%权重

**评分范围**: 0-100分
**计算文件**: `calculateTimeFeasibility()`

### 计算逻辑

#### 4.1 时间参数转换

```typescript
// 每日学习时间 (分钟)
const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                    responses.timeCommitment === 'regular' ? 60 : 30

// 时间线限制 (天)
switch (timeline) {
  case '3months': timelineLimit = 90
  case '6months': timelineLimit = 180
  case '1year': timelineLimit = 365
  case '2years': timelineLimit = 730
  case 'no_rush': timelineLimit = 1095
}
```

#### 4.2 需要时间计算

```typescript
const totalHours = language.learningTimeEstimate?.totalHours || 1000
const requiredDays = Math.ceil(totalHours * 60 / dailyMinutes)
```

**示例**:

- 语言总学时: 1200小时
- 每日学习: 60分钟
- 需要天数: ceil(1200*60/60) = 1200天

#### 4.3 可行性评分

```typescript
const feasibilityRatio = timelineLimit / requiredDays

if (feasibilityRatio >= 1.5) return 100      // 时间充裕
if (feasibilityRatio >= 1.2) return 80       // 时间较充裕
if (feasibilityRatio >= 1.0) return 60       // 时间刚好
if (feasibilityRatio >= 0.8) return 40       // 时间紧张
if (feasibilityRatio >= 0.6) return 20       // 时间很紧
return 10                                     // 几乎不可能
```

**示例**:

- 用户时间线: 2年 (730天)
- 需要时间: 1200天
- 可行性比例: 730/1200 = 0.61
- 得分: 20分

---

## 5. 实用价值 (practicalScore) - 10%权重

**评分范围**: 0-100分
**计算文件**: `calculatePracticalValue()`

### 计算逻辑

#### 5.1 使用人数评分 (权重: 60%)

```typescript
const speakers = language.speakers?.total || 0
if (speakers > 1000000000) score += 60        // >10亿人: 60分
else if (speakers > 500000000) score += 50    // >5亿人: 50分
else if (speakers > 100000000) score += 40    // >1亿人: 40分
else if (speakers > 50000000) score += 30     // >5000万人: 30分
else score += 20                              // 其他: 20分
```

#### 5.2 地理覆盖评分 (权重: 40%)

```typescript
const regions = language.regions?.length || 0
score += Math.min(regions * 4, 40)  // 每个地区4分，最高40分
```

**示例**:

- 覆盖地区: 10个
- 得分: min(10*4, 40) = 40分

#### 5.3 最终计算

```typescript
return Math.min(score, 100)  // 确保不超过100分
```

---

## 评分示例

### 完整计算示例：英语推荐给商务学习者

**用户画像**:

- 母语: 中文
- 文化兴趣: ['north-america', 'europe']
- 难度偏好: 3
- 学习动机: career (职业发展)
- 时间承诺: regular (每天60分钟)
- 时间线: 1年
- 已学习语言数量：1（母语）

**英语语言数据**:

- 难度: 2
- 使用人数: 15亿
- 覆盖地区: 10个

**各维度计算**:

1. **文化匹配**: 50分

   - 区域匹配: 50分 (匹配north-america, 100/2=50分)
   - 最终: 50分
2. **难度适配**: 93分

   - 基础匹配: 80分 (100-|2-3|*20)
   - 母语奖励: 3分 (english-chinese相似度0.1*30)
   - 经验奖励: 10分 (1门已知语言)
   - 最终: 80+3+10 = 93分
3. **目标匹配**: 95分

   - 动机匹配: 95分 (英语business预设评分95分)
   - 最终: 95分
4. **时间可行**: 10分

   - 需要天数: 1000天 (1000小时/60分钟每日)
   - 可行性: 365/1000 = 0.37
   - 得分: 10分 (时间紧张)
5. **实用价值**: 100分

   - 使用人数: 60分 (>10亿人)
   - 地理覆盖: 40分 (10个地区)
   - 最终: 100分

**最终推荐分数**:

```
matchScore = 50*0.3 + 93*0.25 + 95*0.2 + 10*0.15 + 100*0.1
           = 15 + 23.25 + 19 + 1.5 + 10
           = 68.75 ≈ 69分
```

---

## 算法特点

### 优势

1. **多维度综合评估**: 不是单一指标，而是全面考量
2. **个性化调整**: 基于用户背景动态调整分数
3. **权重合理分配**: 文化和难度占主要权重，符合学习心理
4. **实时计算**: 每次访问都基于最新用户数据计算

### 潜在改进点

1. **权重可配置**: 不同用户类型可能需要不同权重
2. **非线性计算**: 某些维度可能存在阈值效应
3. **交互影响**: 维度间可能存在相互影响，而非独立计算
4. **缓存优化**: 相同问卷结果可以缓存避免重复计算

### 调试建议

- 在开发环境下可以输出各维度的详细得分
- 建议添加A/B测试验证不同权重配置的效果
- 收集用户反馈验证推荐准确性
