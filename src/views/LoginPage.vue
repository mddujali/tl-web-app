<script lang="ts" setup>
import { ref } from 'vue'
import type { Credentials } from '@/types/Credentials.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { useUserStore } from '@/stores/user.ts'
import { useRouter } from 'vue-router'
import type { LoginValidationErrors } from '@/types/LoginValidationErrors.ts'
import _ from 'lodash'

const defaultErrors = { email: [], password: [] }
const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string>('')
const errors = ref<LoginValidationErrors>(defaultErrors)
const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

const resetFields = (): void => {
  email.value = ''
  password.value = ''
}

const resetMessages = (): void => {
  errorMessage.value = ''
  errors.value = defaultErrors
}

const resetForm = (): void => {
  resetFields()

  resetMessages()
}

const handleLogin = async (): Promise<void> => {
  const credentials: Credentials = {
    email: email.value,
    password: password.value,
  }

  resetMessages()

  try {
    await authStore.login(credentials)

    if (authStore.isAuthenticated) {
      await userStore.fetch()
    }

    resetForm()

    await router.push({ name: 'ipManagement' })
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as {
        isAxiosError: boolean
        response: {
          status: number
          data: { message: string; errors: LoginValidationErrors }
        }
      }

      if (axiosError.isAxiosError) {
        const errorResponse = axiosError.response

        if (errorResponse.status === 422) {
          errors.value = errorResponse.data.errors || defaultErrors

          return
        }

        errorMessage.value = _.get(
          errorResponse,
          'data.message',
          'Login attempt failed. Please try again later.',
        )

        return
      }
    }

    errorMessage.value = 'An unexpected error occurred. Please try again later.'
  }
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4">
      <h1 class="h4 mb-4 text-center fw-bold">Login</h1>

      <div v-if="errorMessage.length > 0" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin()">
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Email</label>

          <input
            type="email"
            id="email"
            :class="['form-control', { 'is-invalid': errors.email && errors.email.length > 0 }]"
            placeholder="Enter your email"
            v-model="email"
          />

          <div v-for="(error, index) in errors.email" :key="index" class="invalid-feedback">
            {{ error }}
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Password</label>

          <input
            type="password"
            id="password"
            :class="[
              'form-control',
              { 'is-invalid': errors.password && errors.password.length > 0 },
            ]"
            placeholder="Enter your password"
            v-model="password"
          />

          <div v-for="(error, index) in errors.password" :key="index" class="invalid-feedback">
            {{ error }}
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 400px;
  width: 100%;
}
</style>
