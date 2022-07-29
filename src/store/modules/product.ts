import { defineStore } from 'pinia';
import { getBrandAll, getProductAttCateList, productCategoryList } from '/@/api/sys/table';
import { companyAddress } from '/@/api/sys/base';

interface ProductStore {
  brandList: [];
  productCategoryList: [];
  productAttributeList: [];
  companyAddressList: [];
}
export const useProductStore = defineStore({
  id: 'app-product',
  state: (): ProductStore => ({
    brandList: [],
    productCategoryList: [],
    productAttributeList: [],
    companyAddressList: []
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'product', //自定义 Key值
        storage: localStorage // 选择存储方式
      }
    ]
  },

  getters: {
    getBrandList(): any[] {
      return this.brandList;
    },
    getProductCategoryList(): any[] {
      return this.productCategoryList;
    },
    getProductAttributeList(): any[] {
      return this.productAttributeList;
    },
    getCompanyAddressList(): any[] {
      return this.companyAddressList;
    }
  },
  actions: {
    async setBrandList() {
      const brand = await getBrandAll();
      this.brandList = brand.data;
    },
    async setProductCategoryList() {
      const productCate = await productCategoryList();
      this.productCategoryList = productCate.data;
    },
    async setProductAttributeList() {
      const productAttCate = await getProductAttCateList({
        page: 1,
        pageSize: 100
      });
      this.productAttributeList = productAttCate.data.list;
    },
    async setCompanyAddressList() {
      const productAttCate = await companyAddress();
      this.companyAddressList = productAttCate.data.list;
    },
    getAllList() {
      this.setBrandList();
      this.setProductCategoryList();
      this.setProductAttributeList();
      this.setCompanyAddressList();
    }
  }
});
