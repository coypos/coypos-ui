import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloView from "../views/HelloView.vue";
import ThingsView from "../views/ThingsView.vue";
import CartView from "../views/CartView.vue";
import ProductListView from "../views/ProductListView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HelloView,
  },
  {
    path: "/things",
    name: "things",
    component: ThingsView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductListView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
