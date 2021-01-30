<template>
  <div>
    <script :id="id"  type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data () {
    return {
      editor: null
    }
  },
  props: {
    config: {
      type: Object,
      default: function() {
          return {
              initialFrameHeight: 360,
              serverUrl: '',
              initialFrameWidth: '100%',
              enableAutoSave: false,
              autoFloatEnabled:false,
              // autoHeightEnabled: false,
          }
      }
    },
    id: {
      type: String,
      default: 'ueditor'
    },
    ueditorValue: {
      type: String,
      default: '<p></p>'
    }
  },
  mounted () {
    this._initEditor()
  },
  methods: {
    _initEditor () { // 初始化
      this.editor = window.UE.getEditor(this.id, this.config)
     setTimeout(() => { // 保证能够填充上默认值
        this.editor.ready(() => {
          this.editor.setContent(this.ueditorValue);
     })
     }, 1000)
    },
    getUEContent () { // 获取含标签内容方法
      return this.editor.getContent()
    } 
  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>
