/*!
 * author: teamwei
 * date: 2021-08-20
 */
import { RouteLocationNormalized } from "vue-router";
export interface IRouterState {
    historyPages: RouteLocationNormalized[];
    excludePages: string[];
    actionName: "" | "push" | "replace" | "forward" | "back";
    transitionName: "" | "slide-right" | "slide-left";
}
export declare const store: import("vuex").Store<IRouterState>;
