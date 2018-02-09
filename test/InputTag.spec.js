/* globals describe it beforeEach expect */

import Vue from 'vue'
import jsdom from 'jsdom'
import InputTag from '../src/InputTag.vue'

const renderer = require('vue-server-renderer').createRenderer()

describe('InputTag.vue', () => {
  const ClonedComponent = Vue.extend(InputTag)
  let InputTagComponent

  beforeEach((cb) => {
    InputTagComponent = new ClonedComponent({
      data () { return { innerTags: [] } }
    }).$mount()
    cb()
  })

  it('should have a new tag input without placeholder', () => {
    renderer.renderToString(InputTagComponent, (err, str) => {
      if (err) { throw err }

      const dom = new jsdom.JSDOM(str)
      const input = dom.window.document.querySelector('input.new-tag')

      expect.anything(input)
      expect(input.placeholder).toEqual('')
    })
  })

  describe('addNew()', () => {
    it('should add a new tag', () => {
      InputTagComponent.newTag = 'foo bar'
      InputTagComponent.addNew()

      InputTagComponent.newTag = 'foo'
      InputTagComponent.addNew()

      InputTagComponent.newTag = 'bar'
      InputTagComponent.addNew()

      expect(InputTagComponent.innerTags.length).toEqual(3)
    })
  })

  describe('remove(index)', () => {
    it('should remove a tag', () => {
      InputTagComponent.newTag = 'foo bar'
      InputTagComponent.addNew()

      InputTagComponent.newTag = 'foo'
      InputTagComponent.addNew()

      InputTagComponent.newTag = 'bar'
      InputTagComponent.addNew()

      InputTagComponent.remove(0)

      expect(InputTagComponent.innerTags.length).toEqual(2)
    })
  })

  describe('removeLastTag()', () => {
    it('should remove the last tag', () => {
      InputTagComponent.newTag = 'foo bar'
      InputTagComponent.addNew()

      InputTagComponent.newTag = 'foo'
      InputTagComponent.addNew()

      InputTagComponent.newTag = 'bar'
      InputTagComponent.addNew()

      InputTagComponent.removeLastTag()

      expect(InputTagComponent.innerTags.length).toEqual(2)
    })
  })

  describe('read-only="true"', () => {
    const InputTagComponentReadOnly = new ClonedComponent({
      data () { return { innerTags: [] } },
      propsData: { readOnly: true }
    }).$mount()

    it('should have a read-only CSS class and shouldn\'t have a remove tag button', () => {
      renderer.renderToString(InputTagComponentReadOnly, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const input = dom.window.document.querySelector('.read-only')

        expect.anything(input)
        expect(input.querySelector('a.remove')).toEqual(null)
      })
    })

    it('shouldn\'t have a new tag input', () => {
      renderer.renderToString(InputTagComponentReadOnly, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const input = dom.window.document.querySelector('input.new-tag')

        expect(input).toEqual(null)
      })
    })
  })

  describe('tags="[1,2,3]"', () => {
    const InputTagComponentWithTags = new ClonedComponent({
      data () { return { innerTags: ['Jerry', 'Kramer', 'Elaine'] } }
    }).$mount()

    it('should load the tags', () => {
      expect(InputTagComponentWithTags.innerTags.length).toEqual(3)
    })

    it('should have remove buttons', () => {
      renderer.renderToString(InputTagComponentWithTags, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const removeButtons = dom.window.document.querySelectorAll('a.remove')

        expect(removeButtons.length).toEqual(3)
      })
    })
  })

  describe('validate="text"', () => {
    const InputTagTextOnly = new ClonedComponent({
      propsData: { validate: 'text' }
    }).$mount()

    it('should only add text values', () => {
      InputTagTextOnly.newTag = 'foo'
      InputTagTextOnly.addNew()

      InputTagTextOnly.newTag = '123'
      InputTagTextOnly.addNew()

      InputTagTextOnly.newTag = 'mati@tucci.me'
      InputTagTextOnly.addNew()

      InputTagTextOnly.newTag = 'https://tucci.me'
      InputTagTextOnly.addNew()

      InputTagTextOnly.newTag = '2002-04-03'
      InputTagTextOnly.addNew()

      expect(InputTagTextOnly.innerTags.length).toEqual(1)
    })
  })

  describe('validate="digits"', () => {
    const InputTagDigitsOnly = new ClonedComponent({
      propsData: { validate: 'digits' }
    }).$mount()

    it('should only add digits values', () => {
      InputTagDigitsOnly.newTag = 'foo'
      InputTagDigitsOnly.addNew()

      InputTagDigitsOnly.newTag = '123'
      InputTagDigitsOnly.addNew()

      InputTagDigitsOnly.newTag = 'mati@tucci.me'
      InputTagDigitsOnly.addNew()

      InputTagDigitsOnly.newTag = 'https://tucci.me'
      InputTagDigitsOnly.addNew()

      expect(InputTagDigitsOnly.innerTags.length).toEqual(1)
    })
  })

  describe('validate="email"', () => {
    const InputTagEmailOnly = new ClonedComponent({
      propsData: { validate: 'email' }
    }).$mount()

    it('should only add text values', () => {
      InputTagEmailOnly.newTag = 'foo'
      InputTagEmailOnly.addNew()

      InputTagEmailOnly.newTag = '123'
      InputTagEmailOnly.addNew()

      InputTagEmailOnly.newTag = 'mati@tucci.me'
      InputTagEmailOnly.addNew()

      InputTagEmailOnly.newTag = 'https://tucci.me'
      InputTagEmailOnly.addNew()

      InputTagEmailOnly.newTag = '2002-04-03'
      InputTagEmailOnly.addNew()

      expect(InputTagEmailOnly.innerTags.length).toEqual(1)
    })
  })

  describe('validate="url"', () => {
    const InputTagUrlOnly = new ClonedComponent({
      propsData: { validate: 'url' }
    }).$mount()

    it('should only add text values', () => {
      InputTagUrlOnly.newTag = 'foo'
      InputTagUrlOnly.addNew()

      InputTagUrlOnly.newTag = '123'
      InputTagUrlOnly.addNew()

      InputTagUrlOnly.newTag = 'mati@tucci.me'
      InputTagUrlOnly.addNew()

      InputTagUrlOnly.newTag = 'https://tucci.me'
      InputTagUrlOnly.addNew()

      InputTagUrlOnly.newTag = '2002-04-03'
      InputTagUrlOnly.addNew()

      expect(InputTagUrlOnly.innerTags.length).toEqual(1)
    })
  })

  describe('validate="isodate"', () => {
    const InputTagISODateOnly = new ClonedComponent({
      propsData: { validate: 'isodate' }
    }).$mount()

    it('should only add text values', () => {
      InputTagISODateOnly.newTag = 'foo'
      InputTagISODateOnly.addNew()

      InputTagISODateOnly.newTag = '123'
      InputTagISODateOnly.addNew()

      InputTagISODateOnly.newTag = 'mati@tucci.me'
      InputTagISODateOnly.addNew()

      InputTagISODateOnly.newTag = 'https://tucci.me'
      InputTagISODateOnly.addNew()

      InputTagISODateOnly.newTag = '2002-04-03'
      InputTagISODateOnly.addNew()

      expect(InputTagISODateOnly.innerTags.length).toEqual(1)
    })
  })
})
