/*!
 * author: teamwei
 * date: 2021-08-20
 */

import { createRouter, Router, RouterOptions, RouteRecordRaw } from 'vue-router'
import { store } from "./store";

export const initRouter = (options: RouterOptions): Router => {
    const router = createRouter(options),
        routerPush = router.push,
        routerReplace = router.replace,
        routerGo = router.go,
        routerForward = router.forward,
        routerBack = router.back;

    const setActionName = (name: string): void => {
        store.dispatch("setActionName", name);
    }

    // 添加
    router.push = (to: RouteRecordRaw) => {
        setActionName("push");
        return routerPush(to);
    }
    // 替换
    router.replace = (to: RouteRecordRaw) => {
        setActionName("replace");
        return routerReplace(to);
    }
    // 前进后退
    router.go = (delta: number) => {
        if (delta > 0) {
            setActionName("forward"); // 保留动作，暂无作用
        }
        if (delta < 0) {
            setActionName("back"); // 保留动作，暂无作用
        }
        routerGo(delta);
    }
    // 前进
    router.forward = () => {
        setActionName("forward");
        routerForward();
    }
    // 后退
    router.back = () => {
        setActionName("back");
        routerBack();
    }

    router.afterEach((to) => {
        store.dispatch("addHistory", to);
    });
    
    return router;
}

export const state = {
    get historyPages() {
        return store.state.historyPages
    },
    get excludePages() {
        return store.state.excludePages
    },
    get transitionName() {
        return store.state.transitionName
    },
}