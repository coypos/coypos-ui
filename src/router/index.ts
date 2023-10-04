import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloView from "../views/HelloView.vue";
import CartView from "../views/CartView.vue";
import ProductListView from "../views/ProductListView.vue";
import CategoryView from "../views/CategoryView.vue";
import SellerLoginView from "@/views/SellerLoginView.vue";
import pinLoginView from "@/views/PinLoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HelloView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/category",
    name: "category",
    component: CategoryView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductListView,
  },
  {
    path: "/login",
    name: "login",
    component: SellerLoginView,
  },
  {
    path: "/pin",
    name: "pin",
    component: pinLoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
