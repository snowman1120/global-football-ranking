<template>
  <div>
    This is ranking page
  </div>
</template>

<script setup lang="ts">
import { useMeta } from 'vue-meta';

useMeta({
  title: 'my title',
  meta: [
    {
      name: 'description',
      content: 'my content',
    },
  ],
});

</script>
