
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
.user-wrapper {
  margin-top: 20px
}
</style>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- <GroupSelect
      ref="indicator"
      class="indicators-wrapper"
      v-model="indicatorSelectedIds"
      :groups="indicatorGroups"
      :defaultSelected="defaultSelectedIds"
      :limit="6"
      @change="onchangeIndicators"
    ></GroupSelect>

    <div style="margin-top: 20px"></div>
    <SelectPlus v-model="jobs"
      :options="form.options"
      ref="op"></SelectPlus> -->

    <!-- <el-city-select v-model="form.areas"></el-city-select>
    <el-select-input :addon.sync="form.keywords" v-model="form.search" :options="form.options"
      placeholder="请输入">
    </el-select-input> -->

    <div class="user-wrapper">
      <el-button @click="getUserInfo">getUserInfo</el-button>
      <p v-if="user">
        {{ user.id }}: {{ user.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
// import GroupSelect from '../components/GroupSelect'
import SelectPlus from '../components/SelectPlus'
// import CitySelect from '@ele/lpd-component/src/components/city-select'

const fetchPageInfo = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        indicatorGroups: [
          {
            id: 1,
            label: '规模',
            children: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              return {
                id: `1_${i}`,
                label: '组1_指标' + i,
                tip: 'this is a tip for indicator'
              }
            })
          },
          {
            id: 2,
            label: '质量',
            children: [1, 2, 3, 4, 5, 6, 7].map((i) => {
              return {
                id: `2_${i}`,
                label: '组2_指标' + i,
                tip: 'this is a tip for indicator'
              }
            })
          }
        ],
        // 只存ids
        indicatorSelectedIds: ['1_3', '1_2', '1_1'],
        defaultSelectedIds: ['1_1', '1_2', '1_3']
      })
    }, 1000)
  })
}

export default {
  name: 'demo',

  components: {
    // CitySelect,
    // GroupSelect,
    SelectPlus
  },

  data () {
    return {
      msg: 'A simple demo',
      indicatorGroups: [],
      indicatorSelectedIds: [],  // 表示选中，只记录id
      defaultSelectedIds: [],
      form: {
        areas: [],
        keywords: '',
        search: '',
        options: [
          {
            label: 'ID',
            value: 1
          },
          {
            label: '名称',
            value: 2
          }
        ]
      },
      jobs: []
    }
  },

  computed: {
    ...mapState('global', [
      'user'
    ]),
    ...mapGetters('global', [
      'userId'
    ]),
    selectedIndicators () {
      var items = []
      for (let group of this.indicatorGroups) {
        if (group.children && group.children.length) {
          for (let item of group.children) {
            if (this.indicatorSelectedIds.includes(item.id)) {
              items.push(item)
            }
          }
        } else if (this.indicatorSelectedIds.includes(group.id)) {
          items.push(group)
        }
      }
      return items
    }
  },

  async created () {
    fetchPageInfo().then(
      ({indicatorGroups, indicatorSelectedIds, defaultSelectedIds}) => {
        this.indicatorGroups = indicatorGroups
        this.indicatorSelectedIds = indicatorSelectedIds
        this.defaultSelectedIds = defaultSelectedIds
      }
    )
  },

  methods: {
    ...mapActions('global', [
      'getUserInfo'
    ]),

    onchangeIndicators (selectedIds, selectedItems) {
      let labels = selectedItems.map((item) => {
        return item.label
      }).join()
      console.log('selected: ' + labels)
    }
  }
}
</script>
