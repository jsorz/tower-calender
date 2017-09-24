<style lang="stylus" scoped>
.lpd-group-select
  // todo width config
  width 900px
  position relative

  .selector
    &__header
      padding 6px
      border 1px solid #ccc
      cursor pointer

    &__tags
      display inline-block
      .el-tag
        margin-right 6px
        cursor default

    &__caret
      position absolute
      top 50%
      right 8px
      font-size 12px
      line-height 12px
      margin-top -6px
      color #bfcbd9

    &__body
      position absolute
      z-index 9
      padding 10px
      background #fff
      border 1px solid #ccc

    &__group
      margin-bottom 10px
    &__group-label
      float left
      width 15%
    &__group-list
      margin-left 15%
      overflow hidden
      .el-checkbox
        width 25%
        box-sizing border-box
        padding-left 10px
        margin 0

    &__actions
      margin-top 15px
      .el-button
        padding-top 0
        padding-bottom 0
        line-height 28px
        &.el-button--text
          line-height 30px
      .limit-hint
        line-height 30px
        margin-right 12px
        font-size 13px
</style>

<template>
  <div class="lpd-group-select" @click.stop v-clickoutside="close">
    <div class="selector__header" @click.self="toggleOpen">
      <div class="selector__tags">
        <el-tag v-for="(item, index) in selectedItems"
          :key="item.id"
          type="primary"
          closable
          close-transition
          @close="oncloseTag(item)"
        >{{ item.label }}</el-tag>
      </div>
      <i :class="['selector__caret', open ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
    </div>
    <div class="selector__body" :style="{ display: open ? 'block' : 'none' }">
      <el-checkbox-group v-model="tmpSelectedIds"
        :min="1" :max="limit"
        @change="onchangeCheckbox">
        <div class="selector__group" v-for="group in groups" :key="group.id">
          <div class="selector__group-label">{{ group.label }}</div>
          <div class="selector__group-list">
            <el-checkbox v-for="item in group.children"
              :key="item.id"
              :label="item.id"
            >{{ item.label }}</el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
      <div class="selector__actions">
        <el-button type="text" @click="resetDefault">恢复默认</el-button>
        <div :style="{ float: 'right' }">
          <span class="limit-hint" v-if="tmpSelectedIds.length >= limit">最多选择{{ limit }}个指标</span>
          <el-button type="default" @click="close">取消</el-button>
          <el-button type="primary" @click="selectDone">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  name: 'GroupSelect',
  componentName: 'GroupSelect',

  directives: {
    Clickoutside
  },

  props: {
    groups: {
      type: Array,
      required: true
    },
    // 当前选中ids
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 默认选中ids
    defaultSelected: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 选中上限数
    limit: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    }
  },

  data () {
    return {
      selectedIds: this.value,    // 按完“确定”后才生效
      tmpSelectedIds: this.value, // checkbox 选择的状态
      open: false
    }
  },

  watch: {
    // NOTE
    value (val) {
      this.selectedIds = val
    }
  },

  computed: {
    allItems () {
      let items = []
      this.groups.forEach((group) => {
        if (group.children && group.children.length) {
          for (let i = 0; i < group.children.length; i++) {
            items.push(_.extend(group.children[i], { group: group.id }))
          }
        } else {
          items.push(group)
        }
      })
      return items
    },
    selectedItems () {
      let items = []
      this.selectedIds.forEach((id) => {
        let found = _.find(this.allItems, (item) => {
          return item.id === id
        })
        if (found) {
          items.push(found)
        }
      })
      return items
    },
    selectedLength () {
      return this.selectedIds.length
    }
  },

  methods: {
    oncloseTag (item) {
      Vue.delete(this.selectedIds, this.selectedIds.indexOf(item.id))
      this.fireChangeEvent()
    },
    onchangeCheckbox () {
      // console.log(this.tmpSelectedIds)
    },

    // 关闭选择器
    close () {
      this.open && (this.open = false)
    },

    // 切换开闭
    toggleOpen () {
      this.open = !this.open
      if (this.open) {
        // 同步 tmpSelectedIds checkbox 状态
        this.tmpSelectedIds = this.selectedIds
      }
    },

    // 恢复默认选中
    resetDefault () {
      this.tmpSelectedIds = this.defaultSelected
    },

    // 选择完成
    selectDone () {
      this.fireChangeEvent()
      this.close()
    },

    fireChangeEvent () {
      this.selectedIds = this.tmpSelectedIds
      this.$emit('input', this.selectedIds)
      this.$emit('change', this.selectedIds, this.selectedItems)
    }
  }
}
</script>
