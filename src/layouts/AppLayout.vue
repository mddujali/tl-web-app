<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import _ from 'lodash'

const authStore = useAuthStore()
const router = useRouter()
const toastMessage = ref<string>('')
const showToast = ref<boolean>(false)

const handleLogout = async (): Promise<void> => {
  try {
    await authStore.logout()

    await router.push({ name: 'login' })
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred. Please try again later.'

    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as {
        isAxiosError: boolean
        response: {
          status: number
          data: { errors: unknown; message: string }
        }
      }

      if (axiosError.isAxiosError) {
        errorMessage = _.get(
          axiosError,
          'response.data.message',
          'Logout failed. Please try again.',
        )
      }
    }

    toastMessage.value = errorMessage
    showToast.value = true

    setTimeout(() => {
      showToast.value = false
    }, 5000)
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

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      class="toast"
      :class="{ show: showToast }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header bg-danger text-white">
        <i class="fas fa-exclamation-triangle me-2"></i>

        <strong class="me-auto">Error</strong>

        <button
          type="button"
          class="btn-close btn-close-white"
          @click="showToast = false"
          aria-label="Close"
        ></button>
      </div>

      <div class="toast-body">
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>
