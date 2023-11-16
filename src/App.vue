<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<template>
  <RouterView />
  <button @click="router.push('/hello/1')">
    Go to Hello :id
  </button>
  <button @click="router.push('/hello/sub')">
    Go to Hello Sub
  </button>
  <button @click="router.push('/')">
    Home
  </button>
  <button @click="router.push('/hello')">
    Hello
  </button>
</template>

<style scoped>
</style>
