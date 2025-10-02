/**
 * 语言数据仓库实例
 * 创建并导出 languageRepository 单例实例
 */

import { LanguageRepository } from './language-repository'
import { LocalDataProvider } from '../providers/local-provider'

// 创建本地数据提供者实例
const localProvider = new LocalDataProvider()

// 创建语言数据仓库实例
export const languageRepository = new LanguageRepository({
  local: localProvider
  // 可以在这里添加其他提供者，如 API 提供者、缓存提供者等
})


















