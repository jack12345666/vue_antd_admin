<template>
  <div class="box">
       <div class="title">
          <div class="text">基础信息</div>
          <!-- <div class="no" v-if="leaseInfo.no">{{leaseInfo.no}}</div> -->
          <div class="close" @click="close"><a-icon type="close" /></div>
      </div>
       <a-form style="margin: 10px 5px;" :form="form">
           <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="厂房名称"
                >
                <a-input :disabled="true" v-decorator="['title', { rules : [{ required: true, message: '请填写厂房名称' }]}]" placeholder="请填写厂房名称" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="厂房位置"
                >
                <a-input :disabled="true" v-decorator="['address', { rules : [{ required: true, message: '请填写厂房位置' }]}]" placeholder="请填写厂房位置" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="厂房结构"
                >
                <a-select :disabled="true" style="width: 100%" placeholder="请选择厂房结构" v-decorator="['millConstruction', { rules : [{ required: true, message: '请选择厂房结构' }]}]">
                 <a-select-option  v-for="item in millConstructionList" :key="item.id">
                    {{item.value}}
                 </a-select-option>
                </a-select>
                </a-form-item>
              </a-col>
           </a-row>
            <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="联系人"
                >
                <a-input :disabled="true" v-decorator="['contactName', { rules : [{ required: true, message: '请填写联系人' }]}]" placeholder="请填写联系人" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="联系人手机"
                >
                <a-input-number :disabled="true" style="width: 100%" v-decorator="['contactMobile', { rules : [{ required: true, message: '手机号格式不正确' }]}]" placeholder="请填写联系人手机号" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="联系人电话"
                >
                <a-input-number :disabled="true" style="width: 100%" v-decorator="['contactTel', { rules : [{ required: true, message: '请填写联系人电话' }]}]" placeholder="请填写联系人电话" />
                </a-form-item>
              </a-col>
           </a-row>
             <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="价格"
                >
                 <a-input-number :disabled="true" style="width: 100%" v-decorator="['price', { rules : [{ required: true, message: '请填写价格' }]}]" placeholder="元/㎡/天" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="用地性质"
                >
                <a-input :disabled="true" style="width: 100%" v-decorator="['landUsage', { rules : [{ required: true, message: '请填写用地性质' }]}]" placeholder="请填写用地性质" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="所属街道"
                >
               <a-select :disabled="true" :labelInValue="true"  style="width: 100%"  v-decorator="['area', { rules : [{ required: true, message: '请选择所属街道' }]}]" placeholder="请选择所属街道">
                <a-select-option v-for="item in areaList" :key="item.id">
                    {{item.name}}
                </a-select-option>
                </a-select>
                </a-form-item>
              </a-col>
           </a-row>

           <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="占地面积"
                >
                <a-input-number :disabled="true"  style="width: 100%" v-decorator="['floorArea', { rules : [{ required: true, message: '请填写占地面积' }]}]" placeholder="㎡" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="建筑面积"
                >
                <a-input-number :disabled="true" style="width: 100%" v-decorator="['buildingArea', { rules : [{ required: true, message: '请填写建筑面积' }]}]" placeholder="㎡" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="总楼层"
                >
                <a-input-number :disabled="true" style="width: 100%" v-decorator="['totalFloor', { rules : [{ required: true, message: '请填写总楼层' }]}]" placeholder="请填写总楼层" />
                </a-form-item>
              </a-col>
           </a-row>

           <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="层高"
                >
                <a-input-number :disabled="true"  style="width: 100%" v-decorator="['floorHeight', { rules : [{ required: true, message: '请填写层高' }]}]" placeholder="m" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="承重"
                >
                <a-input-number :disabled="true" style="width: 100%" v-decorator="['loadBearing', { rules : [{ required: true, message: '请填写承重' }]}]" placeholder="KN" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="设计用途"
                >
                <a-input :disabled="true"  v-decorator="['buildingUsage', { rules : [{ required: true, message: '请填写设计用途' }]}]" placeholder="请填写设计用途" />
                </a-form-item>
              </a-col>
           </a-row>

            <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="目前空余面积"
                >
                <a-input-number :disabled="true"  style="width: 100%" v-decorator="['spareArea', { rules : [{ required: true, message: '请填写空余面积' }]}]" placeholder="㎡" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="行车吨位"
                >
                <a-input-number :disabled="true" style="width: 100%" v-decorator="['bridgeCraneTon', { rules : [{ required: true, message: '请填写行车吨位' }]}]" placeholder="吨" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="显示顺序"
                >
                <a-input-number :disabled="true" style="width: 100%"  v-decorator="['displayNo', { rules : [{ required: true, message: '请填写显示顺序' }]}]" placeholder="请填写显示顺序" />
                </a-form-item>
              </a-col>
            </a-row>

             <a-row :gutter="15">
              <a-col :span="8">
               <a-form-item
                label="用电"
                >
                 <a-input :disabled="true" style="width: 100%" v-decorator="['electricity', { rules : [{ required: true, message: '请填写用电' }]}]" placeholder="请填写用电" />
                </a-form-item>
              </a-col>
             <a-col :span="8">
               <a-form-item
                label="是否标准厂房"
                >
                <a-radio-group :disabled="true" name="isStandard" v-decorator="['isStandard', { rules : [{ required: true, message: '请选择' }]}]">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>  
                </a-radio-group>
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="是否有电梯"
                >
                <a-radio-group :disabled="true" name="existElevator" v-decorator="['existElevator', { rules : [{ required: true, message: '请选择' }]}]">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>  
                </a-radio-group>
                </a-form-item>
              </a-col>
              
            </a-row>

            <div class="descTitle">厂房简介</div>
            <div class="description" v-html="description"></div>
            <div class="imgList" v-if="mainImg.length > 0">
                <div class="tips">主图</div>
                <img :src="mainImg" style="width: 160px;height: 160px;"/>
            </div>
            <div class="imgList" v-if="imgList.length > 0">
                <div class="tips">厂房图片</div>
                <div class="imgs">
                  <div class="img" v-for="item in imgList" :key="item.uid">
                    <img :src="item.url" style="width: 160px;height: 160px;"/>
                  </div>
                </div>
            </div>

           <div class="btns">
            <div class="cancel">
                <a-form-item>
                    <a-button @click="close">取消</a-button>
                </a-form-item>
            </div>
           </div>
       </a-form>
  </div>
</template>

<script>
// import { message } from 'ant-design-vue'
import { imgFormat } from '../../utils/utils'
import { getLeaseDetail, getAreaList } from '../../api/lease'
export default {
    data() {
        return {
            form: this.$form.createForm(this, { name: 'lease_form' }),
            mainImg: '',
            imgList: [],
            description: '',
            no: null,
            millConstructionList: [
               { id: '彩混', value: '彩混' }, 
               { id: '钢混', value: '钢混' }, 
               { id: '砖混', value: '砖混' }, 
               { id: '框架', value: '框架' }, 
               { id: '其他', value: '其他' }
            ],
            areaList: [],
            leaseId: null,
            leaseInfo: null
        }
    },
  created() {
      this.leaseId = this.$route.query.id
      this.fetchAreaList()
  },
   methods: {
    async fetchAreaList() {
      let data = {
        currentPage: 1,
        pageSize: 20,
        parentId: '330111'
      }
      let rsp = await getAreaList(data)
      if(rsp.code === 0) {
          this.areaList = rsp.data.data.items
          this.fetchLeaseInfo()
      }
    },
    close() {
        this.$router.go(-1)
    },
     async fetchLeaseInfo() {
         let rsp = await getLeaseDetail(this.leaseId)
         if(rsp.code === 0) {
            this.leaseInfo = rsp.data.data
            this.form.setFieldsValue({
                title: this.leaseInfo.title,
                address: this.leaseInfo.address,
                millConstruction: this.leaseInfo.millConstruction,
                contactName: this.leaseInfo.contactName,
                contactMobile: this.leaseInfo.contactMobile,
                contactTel: this.leaseInfo.contactTel,
                price: this.leaseInfo.price,
                landUsage: this.leaseInfo.landUsage,
                area: { key: this.leaseInfo.areaId, label: this.leaseInfo.areaName },
                floorArea: this.leaseInfo.floorArea,
                buildingArea: this.leaseInfo.buildingArea,
                totalFloor: this.leaseInfo.totalFloor,
                floorHeight: this.leaseInfo.floorHeight,
                loadBearing: this.leaseInfo.loadBearing,
                buildingUsage: this.leaseInfo.buildingUsage,
                spareArea: this.leaseInfo.spareArea,
                bridgeCraneTon: this.leaseInfo.bridgeCraneTon,
                displayNo: this.leaseInfo.displayNo,
                isStandard: this.leaseInfo.isStandard,
                existElevator: this.leaseInfo.existElevator,
                electricity: this.leaseInfo.electricity
            })
            this.mainImg = imgFormat(this.leaseInfo.mainPic)
            if(this.leaseInfo.attachmentList.length > 0) {
                this.leaseInfo.attachmentList.forEach(item => {
                   this.imgList.push({
                       uid: item.id,
                       url: imgFormat(item.filePath)
                   }) 
                })
            }
            this.description = this.leaseInfo.description
         }
     }
   }
}
</script>

<style lang="less" scoped>
.box {
    padding: 10px;
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        color: #666;
        .no {
            font-size: 14px;
            margin-left: 30px;
            flex: 1;
        }
        .close {
            cursor: pointer;
            margin-right: 15px;
        }
    }

    .descTitle {
        font-size: 16px;
        color: #666;
        margin-top: 20px;
    }
    .description {
        margin: 10px;
    }
    .imgList {
        .tips {
            color: #999;
            margin: 15px 0 10px 0;
        }
        .imgs {
          display: flex;
          .img {
            margin-right: 20px;
          }
        }
    }

     .btns {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .submit {
            margin-right: 10px;
        }
    }
}
</style>