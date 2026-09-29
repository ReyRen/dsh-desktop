<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import brandMarkUrl from '../../../../build/logo-mark.png'
import WorkspaceSwitcher from '../components/WorkspaceSwitcher.vue'

const SIDEBAR_COLLAPSED_KEY = 'dsh-desktop-business-sidebar-collapsed'

const modules = [
  { name: '推理服务', description: '部署和管理模型推理服务', icon: '↗' },
  { name: '模型微调', description: '创建并跟踪微调训练任务', icon: '⌁' },
  { name: '模型评测', description: '管理数据集、指标和评测结果', icon: '✓' }
]

const collapsed = ref(false)
const zh = computed(() => navigator.language.toLowerCase().startsWith('zh'))
const toggleLabel = computed(() =>
  collapsed.value
    ? (zh.value ? '展开侧边栏' : 'Open sidebar')
    : (zh.value ? '折叠侧边栏' : 'Collapse sidebar')
)

function toggleSidebar(): void {
  collapsed.value = !collapsed.value
}

watch(collapsed, (value) => {
  window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, value ? '1' : '0')
})

onMounted(() => {
  collapsed.value = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1'
})
</script>

<template>
  <div class="business-layout" :class="{ collapsed }">
    <aside class="business-sidebar" :data-collapsed="collapsed">
      <div class="logo-row">
        <WorkspaceSwitcher v-if="!collapsed" />
        <button
          class="sidebar-toggle"
          type="button"
          :aria-label="toggleLabel"
          :title="toggleLabel"
          @click="toggleSidebar"
        >
          <img v-if="collapsed" class="rail-mark" :src="brandMarkUrl" alt="" aria-hidden="true" />
          <svg class="panel-icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="1.75" y="2.25" width="12.5" height="11.5" rx="1.75" />
            <path d="M6.25 2.25v11.5" />
          </svg>
        </button>
      </div>
      <nav aria-label="业务导航">
        <button class="nav-item active" type="button">
          <span class="nav-icon">⌂</span>
          <span class="nav-label">工作台</span>
        </button>
        <button v-for="module in modules" :key="module.name" class="nav-item" type="button">
          <span class="nav-icon">{{ module.icon }}</span>
          <span class="nav-label">{{ module.name }}</span>
        </button>
      </nav>
      <p v-if="!collapsed" class="migration-note">业务模块将从 model 按需迁入</p>
    </aside>

    <main class="business-main">
      <header>
        <span class="eyebrow">业务工作空间</span>
        <h1>欢迎使用智枢业务平台</h1>
        <p>这里承载模型、训练和评测等业务能力，与会话工作空间独立运行。</p>
      </header>

      <section class="module-grid" aria-label="业务模块">
        <article v-for="module in modules" :key="module.name" class="module-card">
          <span class="module-icon">{{ module.icon }}</span>
          <div>
            <h2>{{ module.name }}</h2>
            <p>{{ module.description }}</p>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>
