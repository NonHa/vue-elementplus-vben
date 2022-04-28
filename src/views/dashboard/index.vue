<template> 32324 info</template>

<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from 'vue';
  export default defineComponent({
    components: {},

    name: 'Basic',
    setup() {
      onMounted(() => {
        console.log('onMounted----');
      });
    },
  });
</script>
