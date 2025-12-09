# Vue2.7.14

## 概述

## 生命周期

## 响应式数据

## 视图渲染

## 视图更新

## 指令实现 v-model v-if v-show

1. 点击按钮，count++ 触发 setter
2. dep.notify() 通知渲染 Watcher
3. watcher.update() → queueWatcher() → nextTick(flushSchedulerQueue)
4. 下一个 tick 执行 watcher.run()
5. watcher.get() → updateComponent()
6. vm.\_update(vm.\_render())
7. \_render() 生成新的 VNode
   - \_s(count) → "1"
   - \_v("计数: 1") → 文本 VNode
   - \_c('p', [文本 VNode]) → p 元素 VNode
8. \_update() 执行 patch
   - 传入 oldVnode（旧的虚拟 DOM）
   - 传入 vnode（新的虚拟 DOM）
   - patchVnode() 进行 diff
   - 发现文本内容变化：oldText="计数: 0" → newText="计数: 1"
   - nodeOps.setTextContent(elm, "计数: 1")
9. DOM 更新完成

## 双向数据绑定

## cdn 方式使用 vue 的工作流程
