import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from './views/ProjectList.vue';
import ReportList from './views/ReportList.vue';
import ReportEditor from './views/ReportEditor.vue';
import ReportView from './views/ReportView.vue';

const routes = [
  {
    path: '/',
    name: 'ProjectList',
    component: ProjectList,
  },
  {
    path: '/projects/:projectId/reports',
    name: 'ReportList',
    component: ReportList,
  },
  {
    path: '/reports/:reportId/edit',
    name: 'ReportEditor',
    component: ReportEditor,
  },
  {
    path: '/reports/:reportId/view',
    name: 'ReportView',
    component: ReportView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
