<template>
  <div @click="handleItem(type)">
    <template v-if="type !== 'zoom'">
      <div
        class="btnGroup"
        :class="className === 'group' ? 'groupStyle' : ''"
      >
        <div class="btnImg">
          <img :src="icon" />
        </div>
        <div class="btnLabel">{{label}}</div>
      </div>
    </template>
    <template v-else>
      <div class="btnZoomGroup">
        <el-button-group key="scale-control">
          <el-tooltip
            effect="light"
            content="缩小视图"
          >
            <el-button
              :size="headerButtonSize"
              :disabled="defaultZoom < 0.2"
              icon="el-icon-zoom-out"
              class="btnScaleStyle"
              @click="handleItem('narrow')"
            />
          </el-tooltip>
          <el-button
            class="btnScaleFontStyle"
            :size="headerButtonSize"
          >{{ Math.floor(this.defaultZoom * 10 * 10) + "%" }}</el-button>
          <el-tooltip
            effect="light"
            content="放大视图"
          >
            <el-button
              :size="headerButtonSize"
              :disabled="defaultZoom > 4"
              @click="handleItem('enlarge')"
              class="btnScaleStyle"
              icon="el-icon-zoom-in"
            />
          </el-tooltip>
          <el-tooltip
            effect="light"
            content="重置视图并居中"
          >
            <el-button
              :size="headerButtonSize"
              @click="handleItem('zoomCenter')"
              class="btnScaleStyle"
              icon="el-icon-c-scale-to-original"
            />
          </el-tooltip>
        </el-button-group>
        <div class="btnLabel">{{label}}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    defaultZoom: {
      type: Number,
      default: 1
    },
    className: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headerButtonSize: 'mini'
    }
  },
  mounted () {
  },
  methods: {
    handleItem (type) {
      // let type = data ? data : this.type
      this.$emit('handleReturn', type)
    },
  }
}
</script>

<style scoped lang="less">
.btnGroup {
  width: 70px;
  margin-top: 5px;
  // margin-right: 7px;
  text-align: center;
  .btnImg:hover {
    transform: scale(1.2, 1.2);
  }
  .btnLabel {
    margin-top: 4px;
    font-size: 12px;
  }
}
.groupStyle {
  margin-left: 30px;
}
.btnZoomGroup {
  width: 200px;
  margin: 5px 16px 0px 30px;
  text-align: center;
  border-radius: 0px 2px 2px 0px;
  .btnScaleFontStyle {
    // background: #292929;
    background: #f6f8fa;
    border-color: rgb(187, 184, 184);
    // color: white;
  }
  .btnScaleStyle {
    // background: #292929;
    background: #f6f8fa;
    // color: white;
    // border-color: rgb(121, 119, 119);
    border-color: rgb(187, 184, 184);
  }
  .btnLabel {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>