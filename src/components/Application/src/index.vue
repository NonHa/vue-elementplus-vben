<!--
 * @Author: your name
 * @Date: 2022-01-08 09:06:16
 * @LastEditTime: 2022-01-08 09:11:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Application\src\index.vue
-->
<template>
  <div></div>
</template>

<script>
  import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';

  export default {
    name: '',
    setup() {
      console.log('1-开始创建组件-setup');
      const data = reactive({});
      onBeforeMount(() => {
        console.log('2.组件挂载页面之前执行----onBeforeMount');
      });
      onMounted(() => {
        console.log('3.-组件挂载到页面之后执行-------onMounted');
      });
      return {
        ...toRefs(data),
      };
    },
  };
</script>
<style scoped lang="less"></style>
