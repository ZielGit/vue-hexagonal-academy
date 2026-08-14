<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateCourse, type CreateCourseFormData } from '../composables/useCreateCourse'

const router = useRouter()
const { isSubmitting, error, submit } = useCreateCourse()

const form = reactive<CreateCourseFormData>({
  title: '',
  description: '',
  instructorId: '',
  priceAmount: 0,
  priceCurrency: 'USD',
  level: 'beginner',
  durationMinutes: 60,
})

async function onSubmit() {
  await submit({ ...form })
  if (!error.value) {
    router.push({ name: 'course-list' })
  }
}
</script>

<template>
  <section class="mx-auto max-w-xl px-4 py-8">
    <h1 class="text-xl font-bold text-slate-900">
      New course
    </h1>

    <form
      class="mt-6 space-y-4"
      @submit.prevent="onSubmit"
    >
      <div>
        <label class="block text-sm font-medium text-slate-700">Title</label>
        <input
          v-model="form.title"
          type="text"
          required
          class="mt-1 w-full rounded-md border-slate-300 shadow-sm"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          v-model="form.description"
          required
          class="mt-1 w-full rounded-md border-slate-300 shadow-sm"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700">Level</label>
          <select
            v-model="form.level"
            class="mt-1 w-full rounded-md border-slate-300 shadow-sm"
          >
            <option value="beginner">
              Beginner
            </option>
            <option value="intermediate">
              Intermediate
            </option>
            <option value="advanced">
              Advanced
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">Duration (min)</label>
          <input
            v-model.number="form.durationMinutes"
            type="number"
            min="1"
            required
            class="mt-1 w-full rounded-md border-slate-300 shadow-sm"
          >
        </div>
      </div>

      <p
        v-if="error"
        class="text-sm text-red-600"
      >
        {{ error }}
      </p>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {{ isSubmitting ? 'Creating…' : 'Create course' }}
      </button>
    </form>
  </section>
</template>
