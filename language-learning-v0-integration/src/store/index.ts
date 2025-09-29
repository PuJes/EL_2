import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Language, SurveyData, LanguageRecommendation, LearningProgress } from '@/types'

// 主应用状态
interface AppStore {
  // 用户状态
  user: User | null
  setUser: (user: User | null) => void

  // 当前页面状态
  currentPage: string
  setCurrentPage: (page: string) => void

  // 加载状态
  isLoading: boolean
  setLoading: (loading: boolean) => void

  // 错误状态
  error: string | null
  setError: (error: string | null) => void

  // 语言数据
  languages: Language[]
  setLanguages: (languages: Language[]) => void

  // 问卷数据
  surveyData: SurveyData | null
  setSurveyData: (data: SurveyData) => void

  // 推荐结果
  recommendations: LanguageRecommendation[]
  setRecommendations: (recommendations: LanguageRecommendation[]) => void

  // 学习进度
  learningProgress: LearningProgress[]
  setLearningProgress: (progress: LearningProgress[]) => void

  // 过滤和搜索状态
  filters: {
    search: string
    category: string
    difficulty: number[]
    sortBy: string
  }
  setFilters: (filters: Partial<AppStore['filters']>) => void

  // 清除所有数据的方法
  clearAllData: () => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      currentPage: '/',
      isLoading: false,
      error: null,
      languages: [],
      surveyData: null,
      recommendations: [],
      learningProgress: [],
      filters: {
        search: '',
        category: 'all',
        difficulty: [],
        sortBy: 'popularity'
      },

      // 状态更新方法
      setUser: (user) => set({ user }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setLanguages: (languages) => set({ languages }),
      setSurveyData: (surveyData) => set({ surveyData }),
      setRecommendations: (recommendations) => set({ recommendations }),
      setLearningProgress: (learningProgress) => set({ learningProgress }),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),

      clearAllData: () => set({
        surveyData: null,
        recommendations: [],
        learningProgress: [],
        filters: {
          search: '',
          category: 'all',
          difficulty: [],
          sortBy: 'popularity'
        }
      })
    }),
    {
      name: 'language-learning-storage',
      partialize: (state) => ({
        user: state.user,
        surveyData: state.surveyData,
        recommendations: state.recommendations,
        learningProgress: state.learningProgress,
      })
    }
  )
)

// V0组件状态管理
interface V0Store {
  // V0组件注册表
  registeredComponents: Map<string, any>
  registerComponent: (name: string, component: any) => void
  getComponent: (name: string) => any

  // V0组件通信数据
  componentData: Record<string, any>
  setComponentData: (componentName: string, data: any) => void
  getComponentData: (componentName: string) => any
}

export const useV0Store = create<V0Store>((set, get) => ({
  registeredComponents: new Map(),
  componentData: {},

  registerComponent: (name, component) => {
    const { registeredComponents } = get()
    registeredComponents.set(name, component)
    set({ registeredComponents: new Map(registeredComponents) })
  },

  getComponent: (name) => {
    const { registeredComponents } = get()
    return registeredComponents.get(name)
  },

  setComponentData: (componentName, data) => {
    set((state) => ({
      componentData: {
        ...state.componentData,
        [componentName]: data
      }
    }))
  },

  getComponentData: (componentName) => {
    const { componentData } = get()
    return componentData[componentName]
  }
}))

// 导航状态管理
interface NavigationStore {
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void

  breadcrumbs: Array<{ label: string; href: string }>
  setBreadcrumbs: (breadcrumbs: NavigationStore['breadcrumbs']) => void

  pageTitle: string
  setPageTitle: (title: string) => void
}

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  isSidebarOpen: false,
  breadcrumbs: [],
  pageTitle: '',

  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),

  toggleSidebar: () => {
    const { isSidebarOpen } = get()
    set({ isSidebarOpen: !isSidebarOpen })
  },

  setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),
  setPageTitle: (pageTitle) => set({ pageTitle })
}))

// Hooks 导出
export { useAppStore as useStore }