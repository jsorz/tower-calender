<template>
  <el-select v-model="selected"
    multiple
    placeholder="请选择"
    @change="onchange">
    <el-option v-if="wholeOption"
      :key="wholeOption.value"
      :label="wholeOption.label"
      :value="wholeOption.value">
    </el-option>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: Array
    },
    wholeOption: {
      type: Object,
      default () {
        return {
          label: '全部',
          value: 0
        }
      }
    },
    options: {
      type: Array
    }
  },

  data () {
    return {
      selected: []
    }
  },

  watch: {
    selected (values, oldValues) {
      // const wholeId = this.wholeOption.value
      // let adjustValues = []

      // // “全部”特殊处理
      // if (values.includes(wholeId)) {
      //   // 刚才 click 了“全部”
      //   if (values.indexOf(wholeId) === values.length - 1) {
      //     // 变为单选，互斥
      //     adjustValues.push(wholeId)
      //   } else {
      //     // 把前面的“全部”踢掉, 变为多选
      //     const excludeIndex = values.indexOf(wholeId)
      //     // todo clone
      //     adjustValues = values
      //     adjustValues.splice(excludeIndex, 1)
      //   }
      // }

      // console.log(values + ' --> ' + adjustValues)
      // this.selected = adjustValues
      // this.$emit('input', this.selected)
    }
  },

  methods: {
    onchange (values) {
      const wholeId = this.wholeOption.value
      let adjustValues = []

      // “全部”特殊处理
      if (values.includes(wholeId)) {
        // 刚才 click 了“全部”
        if (values.indexOf(wholeId) === values.length - 1) {
          // 变为单选，互斥
          adjustValues.push(wholeId)
        } else {
          // 把前面的“全部”踢掉, 变为多选
          const excludeIndex = values.indexOf(wholeId)
          // todo clone
          adjustValues = values
          adjustValues.splice(excludeIndex, 1)
        }
      }

      console.log(values + ' --> ' + adjustValues)
      // this.selected = adjustValues
    }
  }
}
</script>

