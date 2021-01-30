<template>
  <div class="outletsCompany">
    <a-modal
      v-model="visible"
      :footer="null"
      :title="status === 1 ? '新增网点' : '编辑网点信息'"
      @cancel="closeBox"
    >
      <a-form-model
        ref="outletsInfoForm"
        :model="outletsInfo"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分类" prop="category">
          <a-select
            v-model="outletsInfo.category"
            placeholder="请选择分类"
            style="width: 50%"
          >
            <a-select-option
              v-for="(item, index) in categoryList"
              :value="item.id"
              :key="index"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="name" label="名称" prop="name">
          <a-input v-model="outletsInfo.name" placeholder="请填写名称" />
        </a-form-model-item>

        <a-form-model-item ref="tel" label="电话" prop="tel">
          <a-input v-model="outletsInfo.tel" placeholder="请填写电话" />
        </a-form-model-item>

       <a-form-model-item ref="map" label="地图选址" prop="map">
         <amap v-if="status === 1" @getMapInfo="getMapInfo(arguments)" :center="[120.335267, 30.305888]"/>
         <amap v-else @getMapInfo="getMapInfo(arguments)" :center="[outletsInfo.lng, outletsInfo.lat]"/>
       </a-form-model-item>

        <a-form-model-item ref="address" label="地址" prop="address">
          <a-input v-model="outletsInfo.address" placeholder="请填写地址" />
        </a-form-model-item>
       
      <div style="display: flex;">
         <a-form-model-item style="flex: 1;margin-left: 65px" ref="lng" label="经度" prop="lng">
          <a-input-number
            :disabled="true"
            style="width: 100%"
            v-model="outletsInfo.lng"
            placeholder="请填写经度"
          />
        </a-form-model-item>
        <a-form-model-item style="flex: 1" ref="lat" label="纬度" prop="lat">
          <a-input-number
            :disabled="true"
            style="width: 100%"
            v-model="outletsInfo.lat"
            placeholder="请填写纬度"
          />
        </a-form-model-item>
      </div>

        <a-form-model-item ref="displayNo" label="显示顺序" prop="displayNo">
          <a-input-number
            style="width: 70%"
            v-model="outletsInfo.displayNo"
            placeholder="请填写显示顺序"
          />
        </a-form-model-item>

        <a-form-model-item label="运行状态" prop="runStatus">
          <a-radio-group v-model="outletsInfo.runStatus">
            <a-radio :value="0">在建</a-radio>
            <a-radio :value="1">运行中</a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="状态" prop="status">
          <a-select v-model="outletsInfo.status" style="width: 50%">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="10">草稿</a-select-option>
            <a-select-option :value="0">失效</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 9 }">
          <a-button type="primary" @click="onSubmit">确定</a-button>
          <a-button style="margin-left: 20px" @click="closeBox">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import { outletsCategory, addOutlets, updateOutlets } from "../../api/outlets";
export default {
  props: {
    outletsInfo: {
      type: Object,
      default: function () {
        return null;
      },
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      visible: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      categoryList: [],
      rules: {
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入网点名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入网点地址", trigger: "blur" },
        ],
        lng: [{ required: true, message: "请输入经度", trigger: "blur" }],
        lat: [{ required: true, message: "请输入纬度", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    }
  },
  created() {
    this.fetchCategory();
  },
  methods: {
    getMapInfo(item) {
         this.outletsInfo.address = item[0].address
         this.outletsInfo.lng = item[0].position.lng
         this.outletsInfo.lat = item[0].position.lat
    },
    async fetchCategory() {
      let rsp = await outletsCategory("OutletsType");
      if (rsp.code === 0) {
        this.categoryList = rsp.data.data.items;
      }
    },
    onSubmit() {
      this.$refs.outletsInfoForm.validate(async (valid) => {
        if (valid) {
          let rsp = null;
          if (this.status === 1) {
            rsp = await addOutlets(this.outletsInfo);
          } else {
            rsp = await updateOutlets(this.outletsInfo);
          }
          if (rsp.code === 0) {
            message.success("操作成功");
            this.$emit("closeBox");
          }
        } else {
          return false;
        }
      });
    },
    closeBox() {
      this.$emit("closeBox");
    },
  },
};
</script>

<style>
.ant-modal {
  width: 750px !important;
}
</style>