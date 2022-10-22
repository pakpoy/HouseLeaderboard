import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/missioncontrol",
    name: "mission-control",
    component: () =>
      import(
        /* webpackChunkName: "missioncontrol" */ "../views/MissionControlView.vue"
      ),
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LeaderboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
