<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'
import GuestLayout from '@/layouts/GuestLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { type Component, computed } from 'vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const route = useRoute()
const layouts: Record<string, Component> = {
  guest: GuestLayout,
  app: AppLayout,
}

const currentLayout = computed<Component>(() => {
  const layoutKey = route.meta?.layout as keyof typeof layouts

  if (!layouts[layoutKey]) {
    console.warn(`Unknown layout: ${layoutKey}, falling back to AppLayout`)
  }

  return layouts[layoutKey] || GuestLayout
})

const authStore = useAuthStore()
const router = useRouter()
const currentRouteName = router.currentRoute.value.name

function redirectIfNecessary(
  currentRouteName: unknown,
  condition: boolean,
  targetRouteName: string,
): void {
  if (
    condition &&
    (typeof currentRouteName === 'undefined' || currentRouteName !== targetRouteName)
  ) {
    void router.push({ name: targetRouteName })
  }
}

onMounted(() => {
  authStore.loadAuthState()

  if (authStore.isAuthenticated) {
    redirectIfNecessary(currentRouteName, true, 'ipManagement')
  } else {
    redirectIfNecessary(currentRouteName, true, 'login')
  }
})
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
