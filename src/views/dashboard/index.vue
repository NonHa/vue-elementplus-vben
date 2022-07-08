<template> 

<ElButton @click="btnClick">click</ElButton>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from 'vue';
  import {ElButton} from 'element-plus'
import { getBrand } from '/@/api/sys/test';

  export default defineComponent({
    components: {
      ElButton
    },

    name: 'Basic',
    setup() {
      onMounted(() => {
        console.log('onMounted----');
      });
    let btnClick = () => {
      getBrand({}).then(res => {

      });
      
    }
      return {
        btnClick
      }
    },
  });
</script>
