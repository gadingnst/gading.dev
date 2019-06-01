/**
 * @jest-environment jsdom
 */

import { shallowMount } from '@vue/test-utils'
import Disqus from '@/components/Blog/Disqus.vue'

const createWrapper = () => {
  return shallowMount(Disqus, {
    sync: false
  })
}

describe('components Disqus.vue', () => {
  test('success mounting components', done => {
    const wrapper = createWrapper()
    expect(wrapper).toBeTruthy()
    done()
  })
})
