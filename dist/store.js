"use strict";
/*!
 * author: teamwei
 * date: 2021-08-20
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var vuex_1 = require("vuex");
exports.store = vuex_1.createStore({
    state: {
        actionName: "",
        historyPages: [],
        excludePages: [],
        transitionName: "", // 前进后退css动画
    },
    mutations: {
        /**
         * 缓存路由状态
         * 支持页面前进后退动画
         * 支持页面前进刷新后退缓存
         * @param {RouteLocationNormalized} value route.to
         */
        ADD_HISTORY: function (state, value) {
            state.excludePages = [];
            var itemIndex = function () {
                for (var i = state.historyPages.length - 1; i >= 0; i--) {
                    if (state.historyPages[i].fullPath == value.fullPath) {
                        return i;
                    }
                }
                return -1;
            }();
            // 若是替换动作，必定是前进
            if (state.actionName === "replace") {
                var lastIndex = state.historyPages.length - 1;
                var lastItem = state.historyPages[lastIndex];
                state.excludePages.push(lastItem.name);
                state.historyPages.fill(value, lastIndex);
                state.transitionName = "slide-left"; // 前进动画
                state.actionName = "";
                return;
            }
            if (itemIndex > -1) {
                if (state.actionName === "push") {
                    state.historyPages.push(value);
                    state.transitionName = "slide-left"; //前进动画
                }
                else {
                    if (state.historyPages.length > 1) {
                        var i = itemIndex + 1, n = state.historyPages.length - i;
                        state.excludePages = state.historyPages.map(function (item) { return item.name; }).slice(-n); // 返回数组最后位置开始的n个元素
                        state.historyPages.splice(i, n); // 从i位置开始删除后面所有元素(包括i)
                    }
                    state.transitionName = "slide-right"; //后退动画
                }
            }
            else {
                state.historyPages.push(value);
                if (state.historyPages.length > 1) {
                    state.transitionName = "slide-left"; // 前进动画
                }
            }
            state.actionName = "";
        },
        SET_ACTION_NAME: function (state, value) {
            state.actionName = value;
        }
    },
    actions: {
        addHistory: function (context, value) {
            context.commit("ADD_HISTORY", value);
        },
        setActionName: function (context, value) {
            context.commit("SET_ACTION_NAME", value);
        }
    },
});
