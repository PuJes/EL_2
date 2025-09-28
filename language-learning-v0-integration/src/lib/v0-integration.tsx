'use client'

import { ReactNode, ComponentType } from 'react'
import { useV0Store } from '@/store'
import { cn } from '@/lib/utils'

// V0组件包装器类型
interface V0ComponentWrapperProps {
  children: ReactNode
  className?: string
  data?: any
  onDataChange?: (data: any) => void
}

// V0组件包装器 - 为V0组件提供统一的容器和数据接口
export function V0ComponentWrapper({
  children,
  className,
  data,
  onDataChange
}: V0ComponentWrapperProps) {
  return (
    <div className={cn("v0-component", className)}>
      {children}
    </div>
  )
}

// V0组件注册函数
export function registerV0Component(name: string, component: ComponentType<any>) {
  const { registerComponent } = useV0Store.getState()
  registerComponent(name, component)
}

// V0组件获取函数
export function getV0Component(name: string) {
  const { getComponent } = useV0Store.getState()
  return getComponent(name)
}

// V0组件动态加载器
interface V0ComponentLoaderProps {
  componentName: string
  props?: any
  fallback?: ReactNode
  className?: string
}

export function V0ComponentLoader({
  componentName,
  props = {},
  fallback = <div>加载中...</div>,
  className
}: V0ComponentLoaderProps) {
  const Component = getV0Component(componentName)

  if (!Component) {
    return (
      <div className={cn("p-8 text-center border-2 border-dashed border-gray-300 rounded-xl", className)}>
        <p className="text-gray-500">组件 "{componentName}" 未找到</p>
        <p className="text-sm text-gray-400 mt-2">
          请确保已在 /v0-components 目录中添加该组件
        </p>
      </div>
    )
  }

  return (
    <V0ComponentWrapper className={className}>
      <Component {...props} />
    </V0ComponentWrapper>
  )
}

// 页面路由生成器 - 自动为V0组件创建路由页面
export function createV0Page(componentName: string, pageTitle?: string) {
  return function V0Page() {
    return (
      <div className="space-y-6">
        {pageTitle && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-600 mt-2">
              这是由 v0.dev 设计的组件页面
            </p>
          </div>
        )}

        <V0ComponentLoader
          componentName={componentName}
          className="min-h-[600px]"
        />
      </div>
    )
  }
}

// V0组件数据同步Hook
export function useV0ComponentData(componentName: string) {
  const { componentData, setComponentData, getComponentData } = useV0Store()

  const data = getComponentData(componentName)

  const updateData = (newData: any) => {
    setComponentData(componentName, newData)
  }

  return { data, updateData }
}

// V0组件与应用状态的桥接函数
interface V0BridgeProps {
  componentName: string
  mapStateToProps?: (state: any) => any
  mapDispatchToProps?: (actions: any) => any
  children: (props: any) => ReactNode
}

export function V0Bridge({
  componentName,
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({}),
  children
}: V0BridgeProps) {
  const { data, updateData } = useV0ComponentData(componentName)

  // 这里可以添加与主应用状态的同步逻辑
  const stateProps = mapStateToProps(data)
  const dispatchProps = mapDispatchToProps({ updateData })

  const bridgedProps = {
    ...stateProps,
    ...dispatchProps,
    data,
    onDataChange: updateData
  }

  return <>{children(bridgedProps)}</>
}

// V0组件自动发现和注册
export async function autoDiscoverV0Components() {
  try {
    // 这里可以实现自动扫描 v0-components 目录的逻辑
    // 在实际应用中，您可以使用 webpack 的 require.context 或类似的机制

    console.log('V0组件自动发现功能已启用')
    console.log('请在 /v0-components 目录中添加您的组件文件')

    return true
  } catch (error) {
    console.error('V0组件自动发现失败:', error)
    return false
  }
}

// V0组件元数据管理
interface V0ComponentMeta {
  name: string
  version: string
  description: string
  author?: string
  tags?: string[]
  dependencies?: string[]
  props?: Record<string, any>
}

const componentRegistry = new Map<string, V0ComponentMeta>()

export function registerV0ComponentMeta(name: string, meta: V0ComponentMeta) {
  componentRegistry.set(name, meta)
}

export function getV0ComponentMeta(name: string): V0ComponentMeta | undefined {
  return componentRegistry.get(name)
}

export function getAllV0Components(): V0ComponentMeta[] {
  return Array.from(componentRegistry.values())
}

// V0组件开发者工具
export function V0DevTools() {
  const registeredComponents = getAllV0Components()

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="font-semibold text-sm mb-2">V0组件开发者工具</h3>
      <div className="text-xs space-y-1">
        <p>已注册组件: {registeredComponents.length}</p>
        {registeredComponents.map((component) => (
          <div key={component.name} className="text-gray-600">
            • {component.name} v{component.version}
          </div>
        ))}
      </div>
    </div>
  )
}

// 导出所有工具函数
export {
  V0ComponentWrapper as Wrapper,
  V0ComponentLoader as Loader,
  V0Bridge as Bridge,
  useV0ComponentData as useData,
  createV0Page as createPage
}