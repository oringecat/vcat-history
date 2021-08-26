/*!
 * author: teamwei
 * date: 2021-08-20
 */

import { createStore } from 'vuex'
import { RouteLocationNormalized } from "vue-router";

export interface IHistoryState {
    historyPages: RouteLocationNormalized[];
    excludePages: string[];
    actionName: "" | "push" | "replace" | "forward" | "back",
    transitionName: "" | "slide-right" | "slide-left";
}

export const store = createStore<IHistoryState>({
    state: {
        actionName: "", // 路由动作
        historyPages: [], // 已访问的路由列表
        excludePages: [], // 不缓存的页面列表，路由和组件的name必须相同
        transitionName: "", // 前进后退css动画
    },
    mutations: {
        /**
         * 缓存路由状态
         * 支持页面前进后退动画
         * 支持页面前进刷新后退缓存
         * @param {RouteLocationNormalized} value route.to
         */
        ADD_HISTORY: (state, value: RouteLocationNormalized) => {
            state.excludePages = [];

            const itemIndex = function () {
                for (let i = state.historyPages.length - 1; i >= 0; i--) {
                    if (state.historyPages[i].fullPath == value.fullPath) {
                        return i
                    }
                }
                return -1;
            }();

            // 若是替换动作，必定是前进
            if (state.actionName === "replace") {
                const lastIndex = state.historyPages.length - 1;
                const lastItem = state.historyPages[lastIndex];

                state.excludePages.push(lastItem.name as string);
                state.historyPages.fill(value, lastIndex);
                state.transitionName = "slide-left"; // 前进动画
                state.actionName = "";
                return;
            }

            if (itemIndex > -1) {
                if (state.actionName === "push") {
                    state.historyPages.push(value);
                    state.transitionName = "slide-left"; //前进动画
                } else {
                    if (state.historyPages.length > 1) {
                        const i = itemIndex + 1,
                            n = state.historyPages.length - i;

                        state.excludePages = state.historyPages.map((item) => item.name).slice(-n) as string[]; // 返回数组最后位置开始的n个元素
                        state.historyPages.splice(i, n); // 从i位置开始删除后面所有元素(包括i)
                    }
                    state.transitionName = "slide-right"; //后退动画
                }
            } else {
                state.historyPages.push(value);
                if (state.historyPages.length > 1) {
                    state.transitionName = "slide-left"; // 前进动画
                }
            }
            state.actionName = "";
        },
        SET_ACTION_NAME: (state, value) => {
            state.actionName = value;
        }
    },
    actions: {
        addHistory: (context, value) => {
            context.commit("ADD_HISTORY", value);
        },
        setActionName: (context, value) => {
            context.commit("SET_ACTION_NAME", value);
        }
    },
});