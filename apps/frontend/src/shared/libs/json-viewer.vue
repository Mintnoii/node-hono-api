<template>
  <div>
    <vue-json-pretty :data="{ key: 'value' }" :show-icon="true" />
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
</script>
