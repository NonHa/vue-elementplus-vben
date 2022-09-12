<template>
  <AppProvider>
    <Suspense>
      <RouterView />
    </Suspense>
  </AppProvider>
</template>

<script lang="ts" setup>
import { AppProvider } from '/@/components/Application';
</script>
