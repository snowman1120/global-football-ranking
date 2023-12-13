<template>
  <div>
    <div v-if="props.time" style="text-align: center">
      <p>Last updated: {{ props.time }}</p>
    </div>

    © 2023 Global Football Rankings. All rights reserved.
  </div>
  <br>
</template>

<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['time']);
</script>
