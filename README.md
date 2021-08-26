# vcat-history
效果演示：前进后退动画、前进刷新后退缓存

<div align="center">
  <img src="https://github.com/oringecat/vuex-goback/blob/main/demo.gif" >
</div>

## 特性
- 支持vue3
- 支持TypeScript
- 前进后退动画
- 前进刷新后退缓存
- 无代码污染

## 插件安装
```bash
# 目前仅支持vue3项目
npm i vcat-history
```

## 问题描述
APP项目中页面的前进后退是最基本的功能，那么在Vue项目中如何实现？  

#### 动画
实现的方式大多数都是通过监听 popstate 事件和 router 来判断页面前进或后退，配合 transition 实现动画效果。  
这是我在最初开发中实现的方式，不过在实际项目中体验并不完美，偶尔会有bug，虽然不影响使用。  

#### 缓存
为了让用户有最佳的体验，在用户打开新页面的时候，新页面上的数据是最新的(刷新)，而当用户后退到上个页面的时候，上个页面需要恢复到之前的状态(包括数据和滚动条的位置)，这其中就需要用到 keep-alive 来对页面进行缓存。  
```html
<keep-alive>
  <router-view>
    <!-- 被缓存的视图 -->
  </router-view>
</keep-alive>
```

#### 解决
在最新的方案中，我的想法是使用vuex来管理路由的历史状态，由于页面是按照一定顺序打开的，例如 A > B > C 这样的顺序打开页面，那就按照顺序添加到历史状态中 [A, B, C] ，在每次插入记录之前都会检查列表中是否存在相同的记录，如果下个页面打开的是D，因为D不存在，所以列表是 [A, B, C, D] ，说明页面是前进的，如果下个页面打开的是B，因为B存在，所以是后退操作，最后列表更新 [A, B] 。  

按照这样的逻辑，前进的页面都进行 keep-alive ，后退的页面放入一个 exclude 列表中，这样就实现了前进后退动画，前进刷新后退缓存的效果。


## 使用
```js
// 在 router 中引用
import { initRouter } from "vcat-history";

// 替换原理的 createRouter
const router = initRouter({
    history: createWebHashHistory(),
    routes
})
```

```html
<!-- App.vue -->
<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive :exclude="excludePages">
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { state } from "vcat-history";

export default defineComponent({
  name: "App",
  setup() {
    const transitionName = computed(() => state.transitionName);
    const excludePages = computed(() => state.excludePages);
    return {
      transitionName,
      excludePages,
    };
  },
});
</script>
<!-- 默认动画样式，.slide-left前进，.slide-right后退 -->
```
如果觉得好用，请推荐给他人！有问题请留言，感谢支持！

### [Demo地址](https://github.com/oringecat/vcat-history-demo)