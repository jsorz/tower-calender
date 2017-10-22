<style lang="stylus">
// 组件库样式覆盖
.lpd-group-select
  .el-checkbox
    .el-checkbox__inner
      width 14px
      height 14px
      border-radius 2px
      &:after
        width 3px
        height 7px
        top 0
        left 4px
</style>

<style lang="stylus" scoped>
.lpd-group-select
  borderColor = #d8dde6
  position relative
  width 100%
  font-size 14px

  .selector
    &__header
      padding 8px
      border 1px solid borderColor
      border-radius 4px
      cursor pointer
    &__placeholder
      color #999
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
      width 100%
      top 50px
      z-index 9
      padding 25px 20px 15px 20px
      box-sizing border-box
      background #fff
      border solid 1px borderColor
      box-shadow 0 3px 10px 0 rgba(0, 0, 0, 0.06)

      .fixed__arrow,
      .fixed__arrow:after
        arrowWidth = 5px
        display block
        width 0
        height 0
        position absolute
        top arrowWidth * (-1)
        left 50%
        margin-left arrowWidth * (-0.5)
        border arrowWidth solid transparent

      .fixed__arrow
        border-bottom-color borderColor
        border-top-width 0
        &:after
          content " "
          top 1px
          left -2px
          border-bottom-color #fff
          border-top-width 0

    &__group
      margin-bottom 10px
    &__group-label
      float left
      width 5%
      font-weight 600
    &__group-list
      margin-left 5%
      overflow hidden
      .el-checkbox
        width 20%
        box-sizing border-box
        padding-left 10px
        margin 0

    &__actions
      padding-top 15px
      border-top 1px solid #e6ebf5
      .el-button
        padding-top 0
        padding-bottom 0
        line-height 28px
        &.el-button--text
          line-height 30px
    &__actions-right
      float right
      .el-button
        font-size 12px
      .limit-hint
        line-height 30px
        margin-right 12px
        font-size 14px
        color #878d99
</style>

<template>
  <div class="lpd-group-select" @click.stop>
    <div class="selector__header" @click.self="toggleOpen">
      <span class="selector__placeholder" v-if="!this.selectedIds.length">{{ placeholder }}</span>
      <div class="selector__tags" v-if="this.selectedIds.length">
        <el-tag v-for="(item, index) in selectedItems"
          :key="item.id"
          type="primary"
          close-transition
          :closable="true"
          @close="oncloseTag(item)"
        >{{ item.label }}</el-tag>
      </div>
      <i :class="['selector__caret', open ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i>
    </div>
    <div class="selector__body" :style="{ display: open ? 'block' : 'none' }">
      <el-checkbox-group v-model="currentSelectedIds"
        :min="min" :max="max">
        <div class="selector__group" v-for="group in groups" :key="group.id || group.group">
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
        <div class="selector__actions-right">
          <span class="limit-hint" v-if="currentSelectedIds.length >= max">最多选择{{ max }}个指标</span>
          <el-button type="default" @click="close">取消</el-button>
          <el-button type="primary" @click="selectDone">确定</el-button>
        </div>
      </div>
      <div class="fixed__arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupSelect',
  componentName: 'GroupSelect',

  props: {
    groups: {
      type: Array,
      required: true
    },
    // 当前选中ids
    value: {
      type: Array,
      default: []
    },
    // 默认选中ids
    defaultSelected: {
      type: Array,
      default: []
    },
    // 选中上限数
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    // 最少选中数 todo
    min: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    hideOnCloseTag: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      selectedIds: Object.assign([], this.value),        // 按完“确定”后才生效
      currentSelectedIds: Object.assign([], this.value), // checkbox 选择的状态
      open: false
    }
  },

  computed: {
    allItems () {
      const items = []
      for (let group of this.groups) {
        if (group.children && group.children.length) {
          for (let child of group.children) {
            items.push(child)
          }
        } else {
          items.push(group)
        }
      }
      return items
    },
    selectedItems () {
      const items = []
      // 以 allItem 为遍历，保持展示顺序
      for (let item of this.allItems) {
        if (this.selectedIds.includes(item.id)) {
          items.push(item)
        }
      }
      return items
    }
  },

  created () {
    // 点击外围可以关闭
    document.addEventListener('click', this.close)
  },

  beforeDestroy () {
    document.removeEventListener('click', this.close)
  },

  methods: {
    oncloseTag (item) {
      const index = this.selectedIds.indexOf(item.id)
      index > -1 && this.$delete(this.selectedIds, index)
      const curIndex = this.currentSelectedIds.indexOf(item.id)
      curIndex > -1 && this.$delete(this.currentSelectedIds, curIndex)

      this.fireChangeEvent()
      this.close()
    },

    // 关闭选择器
    close () {
      this.open && (this.open = false)
    },

    // 切换开闭
    toggleOpen () {
      this.open = !this.open
      if (this.open) {
        // 同步 currentSelectedIds checkbox 状态
        this.currentSelectedIds = Object.assign([], this.selectedIds)
      }
    },

    // 恢复默认选中
    resetDefault () {
      this.currentSelectedIds = Object.assign([], this.defaultSelected)
    },

    // 选择完成
    selectDone () {
      this.fireChangeEvent()
      this.close()
    },

    fireChangeEvent () {
      this.selectedIds = Object.assign([], this.currentSelectedIds)
      this.$emit('input', this.selectedIds)
      this.$emit('change', this.selectedIds)
    }
  }
}
</script>
