<template>
  <div
    class="btnGroup"
    @click="handleItem"
  >
    <img :src="icon" />
    <p>{{label}}</p>
    <!-- <el-button></el-button> -->
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
    }
  },
  mounted () {
    console.log("++++++++++icon", this.icon)
  },
  methods: {
    handleItem () {
      switch (this.type) {
        case 'return':
          this.handleReturn();
      }
    },
    handleReturn () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.btnGroup {
  width: 70px;
  margin-top: 5px;
  margin-right: 7px;
  text-align: center;
}
</style>