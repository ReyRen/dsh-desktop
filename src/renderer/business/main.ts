import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import './styles.css'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    }
  ]
})

createApp(App).use(createPinia()).use(router).mount('#app')
