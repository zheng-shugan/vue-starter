<script lang="ts" setup>
interface Props {
  id: string
}

const props = defineProps<Props>()

const msg = `Hello Child ${props.id}`
</script>

<template>
  <Hello :msg="msg" />
</template>

<style scoped>

</style>
