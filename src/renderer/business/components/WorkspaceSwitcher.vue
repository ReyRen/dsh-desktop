<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import logoUrl from '../../../../build/logo.png'
import type { DesktopWorkspace, DesktopWorkspaceState } from '../../../shared/workspace'

const state = ref<DesktopWorkspaceState>({
  active: 'business',
  locale: 'zh',
  dark: false
})
const open = ref(false)
const root = ref<HTMLElement>()
const zh = computed(() => state.value.locale === 'zh')
const activeLabel = computed(() =>
  state.value.active === 'business'
    ? (zh.value ? '业务' : 'Business')
    : (zh.value ? '会话' : 'Conversation')
)

let unsubscribe: (() => void) | undefined

watch(
  () => state.value.dark,
  (dark) => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  },
  { immediate: true }
)

async function select(workspace: DesktopWorkspace): Promise<void> {
  open.value = false
  state.value = await window.dshWorkspace.switchTo(workspace)
}

function onPointerDown(event: PointerEvent): void {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false
}

onMounted(async () => {
  state.value = await window.dshWorkspace.state()
  unsubscribe = window.dshWorkspace.onStateChanged((next) => {
    state.value = next
  })
  document.addEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  unsubscribe?.()
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <div ref="root" class="business-workspace-switcher">
    <img class="brand-lockup" :src="logoUrl" alt="智枢" />
    <span class="workspace-dot" aria-hidden="true"></span>
    <button
      class="workspace-trigger"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
      @keydown.esc="open = false"
    >
      {{ activeLabel }}
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="m4.5 6 3.5 3.5L11.5 6" />
      </svg>
    </button>

    <div v-if="open" class="workspace-menu" role="menu">
      <button
        v-for="workspace in (['conversation', 'business'] as const)"
        :key="workspace"
        class="workspace-option"
        :class="{ active: state.active === workspace }"
        type="button"
        role="menuitemradio"
        :aria-checked="state.active === workspace"
        @click="select(workspace)"
      >
        <span>
          <strong>{{ workspace === 'conversation' ? (zh ? '会话' : 'Conversation') : (zh ? '业务' : 'Business') }}</strong>
          <small>
            {{
              workspace === 'conversation'
                ? (zh ? '创建、学习和探索' : 'Create, learn and explore')
                : (zh ? '模型、训练和评测' : 'Models, training and evaluation')
            }}
          </small>
        </span>
        <svg v-if="state.active === workspace" class="workspace-check" viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3 8.5 3 3 7-7" />
        </svg>
      </button>
    </div>
  </div>
</template>
