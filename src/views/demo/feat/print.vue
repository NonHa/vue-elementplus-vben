<template>
  <PageWrapper title="打印示例">
    <CollapseContainer title="json打印表格">
      <ElButton type="primary" @click="jsonPrint">打印</ElButton>
    </CollapseContainer>

    <ElButton type="primary" class="mt-5" @click="imagePrint">Image Print</ElButton>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container/index';

  import printJS from 'print-js';

  export default defineComponent({
    name: 'AppLogo',
    components: { PageWrapper, CollapseContainer },
    setup() {
      console.log(234324);

      function jsonPrint() {
        printJS({
          printable: [
            { name: 'll', email: '123@gmail.com', phone: '123' },
            { name: 'qq', email: '456@gmail.com', phone: '456' },
          ],
          properties: ['name', 'email', 'phone'],
          type: 'json',
        });
      }

      function imagePrint() {
        printJS({
          printable: [
            'https://anncwb.github.io/anncwb/images/preview1.png',
            'https://anncwb.github.io/anncwb/images/preview2.png',
          ],
          type: 'image',
          header: 'Multiple Images',
          imageStyle: 'width:100%;',
        });
      }
      return {
        jsonPrint,
        imagePrint,
      };
    },
  });
</script>
