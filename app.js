window.Vue.component('v-input-tag', window.InputTag)

new window.Vue({
  el: '#app',

  data () {
    return {
      readOnly: false,
      addTagOnBlur: false,
      placeholder: 'Add Tag',
      tags: ['Jerry', 'Kramer', 'Elaine', 'George'],
      limit: 10,
      htmlCode: '',
      validate: ''
    }
  },

  methods: {
    getPreviewHTML () {
      let html = '<input-tag'
      html += this.placeholder ? ` placeholder="${this.placeholder}"` : ''
      html += this.tags ? ' :tags.sync="tags"' : ''
      html += this.readOnly ? ' :read-only="true"' : ''
      html += this.addTagOnBlur ? ' :add-tag-on-blur="true"' : ''
      html += this.limit ? ' :limit="limit"' : ''
      html += this.validate ? ` validate="${this.validate}"` : ''
      return `${html}></input-tag>`
    }
  }
})
