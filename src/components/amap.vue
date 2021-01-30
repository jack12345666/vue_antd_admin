<template>
  <div class="mapBox">
    <div
      id="container"
      class="map"
      tabindex="0"
      :style="{ height: '300px' }"
    ></div>
  </div>
</template>
<script>
import AMap from "AMap";
import AMapUI from "AMapUI";
export default {
   props: {
      center: {
          type: Array,
          default: function() {
              return [120.335267, 30.305888]
          }
      } 
   },
  data() {
    return {
        index: 0,
        lng: null,
        info: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var that = this
      AMapUI.loadUI(["misc/PositionPicker"], function (PositionPicker) {
        var map = new AMap.Map("container", {
          zoom: 13,
          scrollWheel: false,
          center: that.center
        })
        var positionPicker = new PositionPicker({
          mode: "dragMap",
          map: map,
        })

        positionPicker.on("success", function (positionResult) {
            that.lng = positionResult.position.lng
            that.info = positionResult
        })
        positionPicker.start();
        map.panBy(0, 1);
        map.addControl(
          new AMap.ToolBar({
            liteStyle: true,
          })
        )
      })
    },
    fetchInfo() {
      this.$emit('getMapInfo', this.info)
    }
  },
  watch: {
      lng() {
          this.index ++
          if(this.index > 1) {
            this.fetchInfo()  
          }
      }
  }
}
</script>

<style lang="less" scoped>
</style>