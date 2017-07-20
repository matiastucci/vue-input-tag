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
      data () { return { tags: [] } }
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
      InputTagComponent.addNew('foo bar')
      InputTagComponent.addNew('foo')
      InputTagComponent.addNew('bar')

      expect(InputTagComponent.tags.length).toEqual(3)
    })
  })

  describe('remove(index)', () => {
    it('should remove a tag', () => {
      InputTagComponent.addNew('foo bar')
      InputTagComponent.addNew('foo')
      InputTagComponent.addNew('bar')
      InputTagComponent.remove(0)

      expect(InputTagComponent.tags.length).toEqual(2)
    })
  })

  describe('removeLastTag()', () => {
    it('should remove the last tag', () => {
      InputTagComponent.addNew('foo bar')
      InputTagComponent.addNew('foo')
      InputTagComponent.addNew('bar')
      InputTagComponent.removeLastTag()

      expect(InputTagComponent.tags.length).toEqual(2)
    })
  })

  describe('read-only="true"', () => {
    const InputTagComponentReadOnly = new ClonedComponent({
      data () { return { tags: [] } },
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
      data () { return { tags: ['Jerry', 'Kramer', 'Elaine'] } }
    }).$mount()

    it('should load the tags', () => {
      expect(InputTagComponentWithTags.tags.length).toEqual(3)
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

  describe('placeholder="Add Tag"', () => {
    const placeholder = 'Add Tag'
    const InputTagComponentWithPlaceholder = new ClonedComponent({
      data () { return { placeholder } }
    }).$mount()

    it('should have a placeholder', () => {
      renderer.renderToString(InputTagComponentWithPlaceholder, (err, str) => {
        if (err) { throw err }

        const dom = new jsdom.JSDOM(str)
        const input = dom.window.document.querySelector('input.new-tag')

        expect(input.placeholder).toEqual(placeholder)
      })
    })
  })

  describe('validate="text"', () => {
    const InputTagTextOnly = new ClonedComponent({
      propsData: { validate: 'text' }
    }).$mount()

    it('should only add text values', () => {
      InputTagTextOnly.addNew('foo')
      InputTagTextOnly.addNew('123')
      InputTagTextOnly.addNew('mati@tucci.me')
      InputTagTextOnly.addNew('https://tucci.me')
      InputTagTextOnly.addNew('2002-04-03')

      expect(InputTagTextOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="digits"', () => {
    const InputTagDigitsOnly = new ClonedComponent({
      propsData: { validate: 'digits' }
    }).$mount()

    it('should only add digits values', () => {
      InputTagDigitsOnly.addNew('foo')
      InputTagDigitsOnly.addNew('123')
      InputTagDigitsOnly.addNew('mati@tucci.me')
      InputTagDigitsOnly.addNew('https://tucci.me')

      expect(InputTagDigitsOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="email"', () => {
    const InputTagEmailOnly = new ClonedComponent({
      propsData: { validate: 'email' }
    }).$mount()

    it('should only add text values', () => {
      InputTagEmailOnly.addNew('foo')
      InputTagEmailOnly.addNew('123')
      InputTagEmailOnly.addNew('mati@tucci.me')
      InputTagEmailOnly.addNew('https://tucci.me')
      InputTagEmailOnly.addNew('2002-04-03')

      expect(InputTagEmailOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="url"', () => {
    const InputTagUrlOnly = new ClonedComponent({
      propsData: { validate: 'url' }
    }).$mount()

    it('should only add text values', () => {
      InputTagUrlOnly.addNew('foo')
      InputTagUrlOnly.addNew('123')
      InputTagUrlOnly.addNew('mati@tucci.me')
      InputTagUrlOnly.addNew('https://tucci.me')
      InputTagUrlOnly.addNew('2002-04-03')

      expect(InputTagUrlOnly.tags.length).toEqual(1)
    })
  })

  describe('validate="isodate"', () => {
    const InputTagISODateOnly = new ClonedComponent({
      propsData: { validate: 'isodate' }
    }).$mount()

    it('should only add text values', () => {
      InputTagISODateOnly.addNew('foo')
      InputTagISODateOnly.addNew('123')
      InputTagISODateOnly.addNew('mati@tucci.me')
      InputTagISODateOnly.addNew('https://tucci.me')
      InputTagISODateOnly.addNew('2002-04-03')

      expect(InputTagISODateOnly.tags.length).toEqual(1)
    })
  })
})
