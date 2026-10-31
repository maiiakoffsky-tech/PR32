import { createRouter, createWebHistory } from 'vue-router'
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/', redirect: '/courses' },
  { path: '/courses', name: 'Courses', component: CoursesListPage },
  {
    path: '/courses/:id',
    name: 'Course',
    component: CoursePage,
    props: true,
    children: [
      { path: '', redirect: 'description' },
      { path: 'description', name: 'CourseDescription', component: () => import('../pages/CourseDescriptionPage.vue'), props: true },
      { path: 'program', name: 'CourseProgram', component: () => import('../pages/CourseProgramPage.vue'), props: true },
      { path: 'reviews', name: 'CourseReviews', component: () => import('../pages/CourseReviewsPage.vue'), props: true }
    ]
  },
  { path: '/login', name: 'Login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('authToken') === 'vhod'
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }
  if (to.meta.guestOnly && isAuth) {
    next({ name: 'Dashboard' })
    return
  }
  next()
})

export default router