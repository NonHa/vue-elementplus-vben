<template>
  <div>
    <ElCard>
      <ElDescriptions title="退货商品" direction="vertical" :column="7" border>
        <el-descriptions-item label="商品图片">
          <img :src="applyItem.productPic" />
        </el-descriptions-item>
        <el-descriptions-item label="商品名称">{{ applyItem.productName }}</el-descriptions-item>
        <el-descriptions-item label="价格/货号">{{ applyItem.productPrice }}</el-descriptions-item>
        <el-descriptions-item label="属性">{{ applyItem.productAttr }}</el-descriptions-item>
        <el-descriptions-item label="数量">{{ applyItem.productCount }}</el-descriptions-item>
        <el-descriptions-item label="小计">{{ applyItem.productRealPrice }}</el-descriptions-item>
      </ElDescriptions>
    </ElCard>
    <ElCard class="apply_message_card">
      <ElDescriptions title="服务单信息" :column="1" border>
        <el-descriptions-item label="服务单号">{{ applyItem.id }}</el-descriptions-item>
        <el-descriptions-item label="申请状态">{{ applyItem.status }}</el-descriptions-item>
        <el-descriptions-item label="订单编号">{{ applyItem.orderSn }}</el-descriptions-item>
        <el-descriptions-item label="申请时间">{{ applyItem.createTime }}</el-descriptions-item>
        <el-descriptions-item label="用户账号">{{ applyItem.memberUsername }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ applyItem.returnName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ applyItem.returnPhone }}</el-descriptions-item>
        <el-descriptions-item label="退货原因">{{ applyItem.reason }}</el-descriptions-item>
        <el-descriptions-item label="问题描述">{{ applyItem.description }}</el-descriptions-item>
        <el-descriptions-item label="凭证图片">
          <img :src="applyItem.proofPics" />
        </el-descriptions-item>
      </ElDescriptions>
      <ElDescriptions :column="1" border>
        <el-descriptions-item label="订单金额">{{ applyItem.productPrice }}</el-descriptions-item>
        <el-descriptions-item label="确认退款金额">
          <el-input
            :disabled="applyItem.status !== 0"
            v-model="selectAddress.returnAmount"
            placeholder=""
          />
        </el-descriptions-item>
        <el-descriptions-item label="选择收货点">
          <BaseSelect
            :disabled="applyItem.status !== 0"
            :model="model"
            field="companyAddressId"
            :options="options"
            @select-change="handleChange"
          />
        </el-descriptions-item>
        <el-descriptions-item label="收货人姓名">
          {{ selectAddress.receiveMan }}
        </el-descriptions-item>
        <el-descriptions-item label="所在区域">
          {{ selectAddress.province }} {{ selectAddress.city }} {{ selectAddress.region }}
        </el-descriptions-item>
        <el-descriptions-item label="详细地址">
          {{ selectAddress.detailAddress }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ selectAddress.phone }}
        </el-descriptions-item>
      </ElDescriptions>
      <template v-if="applyItem.status === 0">
        <ElDescriptions :column="1" border>
          <el-descriptions-item label="处理备注">
            <el-input v-model="selectAddress.handleNote" placeholder="" />
          </el-descriptions-item>
        </ElDescriptions>
      </template>

      <template v-else>
        <ElDescriptions :column="1" border>
          <el-descriptions-item label="处理人员">{{ applyItem.handleMan }}</el-descriptions-item>
          <el-descriptions-item label="处理时间">{{ applyItem.handleTime }}</el-descriptions-item>
          <el-descriptions-item label="处理备注">{{ applyItem.handleNote }}</el-descriptions-item>
        </ElDescriptions>
        <ElDescriptions v-if="applyItem.status !== 1 && applyItem.status !== 3" :column="1" border>
          <el-descriptions-item label="收货人员">{{ applyItem.receiveMan }}</el-descriptions-item>
          <el-descriptions-item label="收货时间">{{ applyItem.handleTime }}</el-descriptions-item>
          <el-descriptions-item label="收货备注">{{ applyItem.receiveNote }}</el-descriptions-item>
        </ElDescriptions>
      </template>

      <template v-if="applyItem.status === 1">
        <ElDescriptions :column="1" border>
          <el-descriptions-item label="收货备注">
            <el-input v-model="selectAddress.receiveNote" placeholder="" />
          </el-descriptions-item>
        </ElDescriptions>
      </template>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
import { unref, toRefs, ref, watch, PropType } from 'vue';
import { ElCard, ElDescriptions, ElDescriptionsItem } from 'element-plus';
import { useProductStore } from '/@/store/modules/product';
import BaseSelect from '/@/components/Form/src/components/BaseSelect.vue';
import type {ReturnApplyItem} from './type'
let prop = defineProps({
  applyItem: {
    type: Object as PropType<Partial<ReturnApplyItem>>,
    required: true
  }
});
let { applyItem } = toRefs(prop);
let model = ref<{ companyAddressId?: string }>({ companyAddressId: '' });
let options = ref<{ field: number | string; title: string }[]>([]);
let { getCompanyAddressList } = useProductStore();
options.value = getCompanyAddressList.map((v) => {
  return {
    title: v.addressName,
    filed: v.id
  };
});

let selectAddressData = {
  province: '',
  city: '',
  region: '',
  detailAddress: '',
  phone: '',
  receiveMan: '',
  handleNote: '',
  companyAddressId: null,
  returnAmount: '',
  receiveNote: ''
};
type SelectAddressData = Partial<typeof selectAddressData>
let selectAddress = ref<SelectAddressData>(selectAddressData);

const handleChange = (e) => {
  let data = JSON.parse(JSON.stringify(unref(getCompanyAddressList).filter((v) => v.id === e)));

  unref(selectAddress).province = data[0].province;
  unref(selectAddress).city = data[0].city;
  unref(selectAddress).region = data[0].region;
  unref(selectAddress).detailAddress = data[0].detailAddress;
  unref(selectAddress).phone = data[0].phone;
  unref(selectAddress).companyAddressId = data[0].id;
};

watch(
  () => unref(applyItem).id,
  (val) => {
    console.log('applyItem', applyItem);

    unref(selectAddress).handleNote = unref(applyItem).handleNote;
    unref(selectAddress).returnAmount = unref(applyItem).returnAmount;
    unref(model).companyAddressId = unref(applyItem).companyAddressId;
    unref(applyItem).companyAddressId && handleChange(unref(applyItem).companyAddressId);
  },
  {
    immediate: true
  }
);
defineExpose({
  selectAddress
});
</script>

<style lang="less" scoped>
img {
  height: 70px;
  width: 50px;
}

.el-card,
.el-descriptions {
  margin-top: 12px;
}
.apply_message_card {
  :deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
    width: 30%;
  }
}
</style>
