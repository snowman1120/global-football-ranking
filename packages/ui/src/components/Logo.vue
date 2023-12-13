<template>
  <div>
    <div style="text-align:center">
      <a v-if="props.isInternational" href="/international" target="_self" style="color:white;">
        <br>
        <div class="image-container">
          <img src="/logo.png" alt="Global Football Rankings" class="responsive-image">
        </div>
      </a>
      <a v-else href="/" target="_self" style="color:white;">
        <br>
        <div class="image-container">
          <img src="/logo.png" alt="Global Football Rankings" class="responsive-image">
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(['isInternational']);
</script>
