<script setup lang="ts">
import { computed } from 'vue'
import type { Course } from '../../domain/model/Course'

const props = defineProps<{ course: Course }>()
const emit = defineEmits<{ publish: [courseId: string] }>()

const statusStyles: Record<string, string> = {
  draft: 'bg-course-draft/10 text-course-draft ring-course-draft/30',
  published: 'bg-course-published/10 text-course-published ring-course-published/30',
  archived: 'bg-course-archived/10 text-course-archived ring-course-archived/30',
}

const status = computed(() => props.course.currentStatus.value)
</script>

<template>
  <article class="rounded-lg border border-slate-200 p-4 shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <h3 class="font-semibold text-slate-900">
        {{ course.currentTitle.toString() }}
      </h3>
      <span
        class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ring-1"
        :class="statusStyles[status]"
      >
        {{ status }}
      </span>
    </div>
    <p class="mt-1 text-sm text-slate-600">
      {{ course.currentDescription.toString() }}
    </p>

    <button
      v-if="status === 'draft'"
      type="button"
      class="mt-3 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
      @click="emit('publish', course.id.value)"
    >
      Publish course
    </button>
  </article>
</template>
