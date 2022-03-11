<!--
 * @Author: your name
 * @Date: 2022-02-28 16:23:13
 * @LastEditTime: 2022-03-05 15:00:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ym-Vue3\src\components\Application\src\search\AppSearch.vue
-->
<script lang="tsx">
import { defineComponent, ref, unref } from "vue";
import { ElTooltip } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import AppSearchModal from "./AppSearchModal.vue";
// import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent({
  name: "AppSearch",
  setup() {
    const showModal = ref(false);
    // const { t } = useI18n();

    function changeModal(show: boolean) {
      showModal.value = show;
    }

    return () => {
      return (
        <div class="p-1" onClick={changeModal.bind(null, true)}>
          <ElTooltip visible-arrow={false} content="搜索">
            <Search />
          </ElTooltip>
          <AppSearchModal
            onClose={changeModal.bind(null, false)}
            visible={unref(showModal)}
          />
        </div>
      );
    };
  },
});
</script>
