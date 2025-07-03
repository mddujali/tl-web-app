<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm p-4">
      <h1 class="h4 mb-4 text-center fw-bold">Login</h1>

      <form @submit.prevent="handleLogin()">
        <div class="mb-3">
          <label for="email" class="form-label fw-bold">Email</label>

          <input
            v-model="email"
            type="email"
            id="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label fw-bold">Password</label>

          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Credentials } from '@/types/Credentials.ts'

const email = ref<string>('')
const password = ref<string>('')

const handleLogin = () => {
  const credentials: Credentials = {
    email: email.value,
    password: password.value,
  }

  console.log('Do something...')

  console.log(credentials)
}
</script>

<style scoped>
.card {
  max-width: 400px;
  width: 100%;
}
</style>
