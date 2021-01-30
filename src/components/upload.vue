<template>
  <div class="clearfix">
    <a-upload
      :customRequest="toUpload"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < limit">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          上传图片
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="image" style="width: 100%;margin-top: 20px;" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

import { uploadFile } from '../api/lease'
import { imgFormat } from '../utils/utils'
export default {
  props: {
      defaultImgList: {
         type: Array,
         default: function() {
             return []
         }
      },
      limit: {
          type: Number,
          default: 1
      }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  created() {
      this.fileList = this.defaultImgList
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
   async toUpload(file) {
     let param = new FormData()
     param.append("file", file.file)
     let rsp = await uploadFile(param)
     if(rsp.code === 0) {
       this.fileList.push({
         uid: +new Date(),
         url:  imgFormat(rsp.data.data.filePath),
         path: rsp.data.data.filePath
       })
      this.fileList.forEach((item, index) => {
        if(item.status) {
          this.fileList.splice(index, 1)
        }
      })
     }
    }
  }
}
</script>
<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload.ant-upload-select-picture-card {
      width: 160px;
      height: 160px;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.ant-upload-list-picture-card-container {
     width: 160px;
     height: 160px;
}
.ant-upload-list-picture-card .ant-upload-list-item {
    width: 160px;
    height: 160px;
}
</style>