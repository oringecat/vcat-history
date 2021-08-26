"use strict";
/*!
 * author: teamwei
 * date: 2021-08-20
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = exports.initRouter = void 0;
var vue_router_1 = require("vue-router");
var store_1 = require("./store");
var initRouter = function (options) {
    var router = vue_router_1.createRouter(options), routerPush = router.push, routerReplace = router.replace, routerGo = router.go, routerForward = router.forward, routerBack = router.back;
    var setActionName = function (name) {
        store_1.store.dispatch("setActionName", name);
    };
    // 添加
    router.push = function (to) {
        setActionName("push");
        return routerPush(to);
    };
    // 替换
    router.replace = function (to) {
        setActionName("replace");
        return routerReplace(to);
    };
    // 前进后退
    router.go = function (delta) {
        if (delta > 0) {
            setActionName("forward"); // 保留动作，暂无作用
        }
        if (delta < 0) {
            setActionName("back"); // 保留动作，暂无作用
        }
        routerGo(delta);
    };
    // 前进
    router.forward = function () {
        setActionName("forward");
        routerForward();
    };
    // 后退
    router.back = function () {
        setActionName("back");
        routerBack();
    };
    router.afterEach(function (to) {
        store_1.store.dispatch("addHistory", to);
    });
    return router;
};
exports.initRouter = initRouter;
exports.state = {
    get historyPages() {
        return store_1.store.state.historyPages;
    },
    get excludePages() {
        return store_1.store.state.excludePages;
    },
    get transitionName() {
        return store_1.store.state.transitionName;
    },
};
