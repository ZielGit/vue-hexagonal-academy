<script setup lang="ts">
import { useCourseList } from '../composables/useCourseList'
import { usePublishCourse } from '../composables/usePublishCourse'
import CourseCard from '../components/CourseCard.vue'

const { courses, isLoading, error, reload } = useCourseList()
const { publish } = usePublishCourse()

async function handlePublish(courseId: string) {
  await publish(courseId)
  await reload()
}
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-8">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-slate-900">
        Courses
      </h1>
      <RouterLink
        to="/courses/new"
        class="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
      >
        New course
      </RouterLink>
    </div>

    <p
      v-if="isLoading"
      class="mt-6 text-sm text-slate-500"
    >
      Loading courses…
    </p>
    <p
      v-else-if="error"
      class="mt-6 text-sm text-red-600"
    >
      {{ error }}
    </p>
    <p
      v-else-if="courses.length === 0"
      class="mt-6 text-sm text-slate-500"
    >
      No courses yet. Create the first one.
    </p>

    <div
      v-else
      class="mt-6 grid gap-4"
    >
      <CourseCard
        v-for="course in courses"
        :key="course.id.value"
        :course="course"
        @publish="handlePublish"
      />
    </div>
  </section>
</template>
