/* eslint-disable no-unused-vars, no-undef */
import { createComponent, destroyVM } from '../vm'
import GroupSelect from 'src/components/GroupSelect'
// 断言类的不需要 import，webpack 会报错

// component testing
describe('GroupSelect', function () {
  let vm
  afterEach(() => {
    vm && destroyVM(vm)
  })

  it('create', done => {
    vm = createComponent(GroupSelect, true)
    vm.$nextTick(() => {
      expect(vm.$el.classList.contains('lpd-group-select')).to.true
      done()
    })
  })

  it('demo', done => {
    expect(1).to.equal(1)
    done()
  })
})
