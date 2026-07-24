<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { httpClient } from '@/shared/infrastructure/http/HttpClient'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const form = reactive({ email: '', password: '' })
const error = ref<string | null>(null)

async function onSubmit() {
  try {
    const { data } = await httpClient.post('/login', form)
    auth.setSession(data.token, data.user)
    const redirect = (route.query.redirect as string) ?? '/courses'
    router.push(redirect)
  } catch {
    error.value = 'Invalid credentials.'
  }
}
</script>

<template>
  <section class="mx-auto max-w-sm px-4 py-16">
    <h1 class="text-xl font-bold text-slate-900">
      Sign in
    </h1>
    <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
      <input v-model="form.email" type="email" placeholder="Email" class="w-full rounded-md border-slate-300">
      <input v-model="form.password" type="password" placeholder="Password" class="w-full rounded-md border-slate-300">
      <button type="submit" class="w-full rounded-md bg-slate-900 px-4 py-2 text-white">
        Sign in
      </button>
      <p v-if="error" class="text-sm text-red-600">
        {{ error }}
      </p>
    </form>
  </section>
</template>
