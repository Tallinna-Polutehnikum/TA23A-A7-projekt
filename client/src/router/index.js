import { createRouter, createWebHistory } from 'vue-router'

// Movie page
const MoviePage = {
  template: `
    <div>
      <h1>Look where you got now!</h1>
      <p>You clicked the picture!</p>
    </div>
  `
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/movie', component: MoviePage }
  ],
})

export default router
