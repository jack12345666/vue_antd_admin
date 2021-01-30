<template>
  <div class="box">
       <div class="title">
          <div class="text">基础信息</div>
          <div class="no"></div>
          <div class="close" @click="close"><a-icon type="close" /></div>
      </div>
       <a-form style="margin: 10px 5px;" @submit="handleSubmit" :form="form">
           <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="厂房名称"
                >
                <a-input v-decorator="['title', { rules : [{ required: true, message: '请填写厂房名称' }]}]" placeholder="请填写厂房名称" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="厂房位置"
                >
                <a-input v-decorator="['address', { rules : [{ required: true, message: '请填写厂房位置' }]}]" placeholder="请填写厂房位置" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="厂房结构"
                >
                 <a-input style="width: 100%" v-decorator="['millConstruction']" placeholder="请填写厂房结构" />
                </a-form-item>
              </a-col>
           </a-row>
            <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="联系人"
                >
                <a-input v-decorator="['contactName', { rules : [{ required: true, message: '请填写联系人' }]}]" placeholder="请填写联系人" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="联系人手机"
                >
                <a-input-number style="width: 100%" v-decorator="['contactMobile', { rules : [{ required: true, message: '手机号格式不正确' }]}]" placeholder="请填写联系人手机号" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="联系人电话"
                >
                <a-input style="width: 100%" v-decorator="['contactTel']" placeholder="请填写联系人电话" />
                </a-form-item>
              </a-col>
           </a-row>
             <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="价格(-1: 代表面议)"
                >
                 <a-input-number style="width: 100%" v-decorator="['price', { rules : [{ required: true, message: '请填写价格' }]}]" placeholder="元/㎡/天" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
               <a-form-item
                label="价格低区间"
                >
                 <a-input-number style="width: 100%" v-decorator="['priceLow']" placeholder="元/㎡/天" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
               <a-form-item
                label="价格低区间"
                >
                 <a-input-number style="width: 100%" v-decorator="['priceHigh']" placeholder="元/㎡/天" />
                </a-form-item>
              </a-col>
           </a-row>

           <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="占地面积"
                >
                <a-input-number  style="width: 100%" v-decorator="['floorArea', { rules : [{ required: true, message: '请填写占地面积' }]}]" placeholder="㎡" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="建筑面积"
                >
                <a-input-number style="width: 100%" v-decorator="['buildingArea']" placeholder="㎡" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="总楼层"
                >
                <a-input style="width: 100%" v-decorator="['totalFloor', { rules : [{ required: true, message: '请填写总楼层' }]}]" placeholder="请填写总楼层" />
                </a-form-item>
              </a-col>
           </a-row>

           <a-row :gutter="15">
             <a-col :span="8">
               <a-form-item
                label="层高"
                >
                <a-input  style="width: 100%" v-decorator="['floorHeight']" placeholder="请填写层高" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
               <a-form-item
                label="用地性质"
                >
                <a-input style="width: 100%" v-decorator="['landUsage']" placeholder="请填写用地性质" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="所属街道"
                >
               <a-select :labelInValue="true" mode="multiple" style="width: 100%"  v-decorator="['area', { rules : [{ required: true, message: '请选择所属街道' }]}]" placeholder="请选择所属街道">
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
                label="目前空余面积"
                >
                <a-input  style="width: 100%" v-decorator="['spareArea']" placeholder="请填写空余面积" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="承重"
                >
                <a-input style="width: 100%" v-decorator="['loadBearing']" placeholder="请填写承重" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="设计用途"
                >
                <a-input  v-decorator="['buildingUsage']" placeholder="请填写设计用途" />
                </a-form-item>
              </a-col>
            </a-row>
             <a-row :gutter="15">
               <a-col :span="8">
               <a-form-item
                label="行车吨位"
                >
                <a-input style="width: 100%" v-decorator="['bridgeCraneTon']" placeholder="请填写行车吨位" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="显示顺序"
                >
                 <a-input-number style="width: 100%" v-decorator="['displayNo']" placeholder="请填写显示顺序" />
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="用电"
                >
                 <a-input style="width: 100%" v-decorator="['electricity']" placeholder="请填写用电情况" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
               <a-form-item
                label="是否标准厂房"
                >
                <a-radio-group name="isStandard" v-decorator="['isStandard', { rules : [{ required: true, message: '请选择是否标准厂房' }]}]">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>  
                </a-radio-group>
                </a-form-item>
              </a-col>
               <a-col :span="8">
               <a-form-item
                label="是否有电梯"
                >
                <a-radio-group name="existElevator" v-decorator="['existElevator', { rules : [{ required: true, message: '请选择是否有电梯' }]}]">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>  
                </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
             <a-row :gutter="15">
               <a-col :span="5">
                  <a-form-item
                  label="状态"
                  >
                <a-select style="width: 100%"  v-decorator="['status', { rules : [{ required: true, message: '请选择状态' }]}]" placeholder="请选择状态">
                  <a-select-option v-for="item in statusList" :key="item.id">
                      {{item.name}}
                  </a-select-option>
                  </a-select>
                  </a-form-item>
               </a-col>
            </a-row>

            <div class="descTitle">厂房简介</div>
            <div class="description">
                <ueditor :id="'description'" :ueditorValue="description" ref="ueditor"/>
            </div>
            <div class="imgList">
                <div class="tips mainImg">主图</div>
                <upload ref="img"/>
            </div>
            <div class="imgList">
                <div class="tips">最多上传6张厂房图片</div>
                <upload :limit="6" ref="uploadImg"/>
            </div>


           <div class="btns">
               <div class="submit">
                <a-form-item>
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-form-item> 
            </div>
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
import { message } from 'ant-design-vue'
import { getArrayProps } from '../../utils/utils'
import { addLease, getAreaList } from '../../api/lease'
export default {
    data() {
        return {
            form: this.$form.createForm(this, { name: 'addlease_form' }),
            description: '',
            statusList: [
              { id: 1, name: '正常' },
              { id: 10, name: '草稿' },
              { id: 0, name: '失效' }
            ],
            areaList: [],
            mainImg: '',
        }
    },
  created() {
    this.fetchAreaList()
  },
  methods: {
    async fetchAreaList() {
      let data = {
       category: 'MYSubdistrict'
      }
      let rsp = await getAreaList(data)
      if(rsp.code === 0) {
        if(rsp.data.data.items.length > 0) {
          rsp.data.data.items.forEach(item => {
            if(item.id != '4100') {
               this.areaList.push({
                id: item.id,
                name: item.name
             })
            }
         })
        }
          this.form.setFieldsValue({
            status: 10
          })
      }
    },
    close() {
        this.$router.go(-1)
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
         values['areaId'] = getArrayProps(values['area'], 'key').join(',')
         values['areaName'] = getArrayProps(values['area'], 'label').join(',')
         values['description'] = this.$refs.ueditor.getUEContent()
         values['attachment'] = getArrayProps(this.$refs.uploadImg.fileList, 'path').join(',')
         if(this.$refs.img.fileList.length === 0) {
            message.error('请上传主图')
            return 
         }else {
            values['mainPic'] = this.$refs.img.fileList[0].path
         }
         delete values['area']
         this.submitInfo(values)
        }
      })
    },
    async submitInfo(values) {
        let rsp = await addLease(values)
        if(rsp.code === 0) {
            message.success('添加成功')
            this.close()
        }
    }
   }
}
</script>

<style lang="less" scoped>
.box {
    padding: 20px;
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
        .mainImg {
            &::before {
              content: '*';
              color: red;
              margin-right: 3px;
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