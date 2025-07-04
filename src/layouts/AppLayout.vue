<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async (): Promise<void> => {
  try {
    await authStore.logout()

    await router.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <header class="mb-5">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold" to="/">WA</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-main"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbar-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                class="nav-item nav-link"
                to="/ip-management"
                active-class="active"
                exact
              >
                IP Management
              </router-link>
            </li>

            <li>
              <router-link class="nav-item nav-link" to="/audit-logs" active-class="active" exact>
                Audit Logs
              </router-link>
            </li>
          </ul>

          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <button class="nav-item nav-link" type="button" @click.prevent="handleLogout()">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <slot />
  </main>
</template>
