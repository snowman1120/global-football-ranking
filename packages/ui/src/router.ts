import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home/home.vue';
import Team from './pages/team/team.vue';
import WorldCupGroups from './pages/worldcupgroups/worldcupgroups.vue';
import Ranking from './pages/ranking/Ranking.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Ranking },
    { path: '/team/:id', component: Team },
    { path: '/worldcupgroups', component: WorldCupGroups },
  ],
});

// router guards
router.beforeEach(async (to, _from, next) => {
  window.scrollTo(0, 0);
  if (!to.matched.length) next(new Error(`Location "${to.fullPath}" does not exist`));
  next();
});

router.afterEach(to => {
  if (to.path.split('/')[1] === 'team')
    document.title = to.meta.title || '';
});

router.onError((error, to) => {
  // on new deploy, hashed module/component names may no longer match current deployment. When that happens, do a hard refresh
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    window.location.href = to.fullPath;
  }
});

export default router;
