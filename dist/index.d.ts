/*!
 * author: teamwei
 * date: 2021-08-20
 */
import { Router, RouterOptions } from 'vue-router';
export declare const initRouter: (options: RouterOptions) => Router;
export declare const state: {
    readonly historyPages: import("vue-router").RouteLocationNormalized[];
    readonly excludePages: string[];
    readonly transitionName: "" | "slide-right" | "slide-left";
};
