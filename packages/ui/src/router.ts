import { createRouter, createWebHistory } from 'vue-router';
import Team from '@/pages/team/team.vue';
import WorldCupGroups from '@/pages/worldcupgroups/worldcupgroups.vue';
import Ranking from '@/pages/ranking/Ranking.vue';
import Info from '@/pages/info/Info.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Ranking },
    { path: '/international', component: Ranking },
    { path: '/team/:id', component: Team },
    { path: '/worldcupgroups', component: WorldCupGroups },
    { path: '/compare', component: Info },
    { path: '/international/compare', component: Info },
    { path: '/compare/:first/:second', component: Info },
    { path: '/international/compare/:first/:second', component: Info },
    { path: '/all', component: Info },
    { path: '/international/all', component: Info },
    { path: '/info2/:league', component: Info },
    { path: '/international/info2/:league', component: Info },
  ],
});

// router guards
router.beforeEach(async (to, _from, next) => {
  window.scrollTo(0, 0);
  if (!to.matched.length) next(new Error(`Location "${to.fullPath}" does not exist`));
  next();
});

router.onError((error, to) => {
  // on new deploy, hashed module/component names may no longer match current deployment. When that happens, do a hard refresh
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.href = to.fullPath;
  }
});

export default router;
