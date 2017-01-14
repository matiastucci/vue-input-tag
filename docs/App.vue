<script>
  import InputTag from 'src/InputTag';

  export default {
    name: 'app',

    components: {
      InputTag,
    },

    data() {
      return {
        readOnly: false,
        placeholder: 'Add Tag',
        tags: ['Jerry', 'Kramer', 'Elaine', 'George'],
        htmlCode: '',
        validate: '',
      };
    },

    methods: {
      newTag(tags) {
        console.log({ tags });
      },
      getPreviewHTML() {
        let html = '<input-tag';
        html += this.placeholder ? ` placeholder="${this.placeholder}"` : '';
        html += this.tags ? ' :tags="tags"' : '';
        html += this.readOnly ? ' :read-only="true"' : '';
        html += this.validate ? ` validate="${this.validate}"` : '';
        return `${html}></input-tag>`;
      },
    },
  };
</script>

<template lang="pug">

  #app

    section.page-header
      h1.project-name Vue.js Input Tag
      h2.project-tagline
      a.btn(href='https://github.com/matiastucci/vue-input-tag' target='_blank') GitHub
      a.btn(href='https://www.npmjs.com/package/vue-input-tag' target='_blank') NPM

    section.main-content

      p
        | Vue.js 2.0 component, inspired in&nbsp;
        a(href='https://github.com/olahol/react-tagsinput' target='_blank') react-tagsinput&nbsp;

      h3
        a#install.anchor(href='#install', aria-hidden='true')
          span.octicon.octicon-link(aria-hidden='true')
        | Install

      p
        code npm install vue-input-tag --save

      h3
        a#playground.anchor(href='#playground', aria-hidden='true')
          span.octicon.octicon-link(aria-hidden='true')
        | Playground

      .playground

        .form-group
          p.label placeholder:
          input(v-model='placeholder' type='text')

        .form-group
          p.label readOnly:
          input(v-model='readOnly' type='checkbox')

        .form-group
          p.label validate:
          select(v-model='validate')
            option(value='') No validate
            option(value='text') Text
            option(value='email') Email
            option(value='url') Url
            option(value='digits') Digits
            option(value='isodate') ISO Date

        .form-group
          p.label tags:
          code {{ tags }}

        input-tag(
          :on-change='newTag',
          :tags='tags',
          :placeholder='placeholder',
          :read-only='readOnly',
          :validate='validate'
        )

        code {{ getPreviewHTML() }}

      footer.site-footer
        span.site-footer-credits
          a(href='https://twitter.com/TucciMatias' target='_blank') @TucciMatias
          span &nbsp;-&nbsp;
          a(href='https://tucci.me' target='_blank') tucci.me
</template>

<style lang="scss">
  @import 'style/github-light';
  @import 'style/normalize';
  @import 'style/stylesheet';
  .form-group {
    p.label {
      display: inline-block;
      margin-right: 1rem;
      width: 100px;
    }
    input {
      padding: 5px;
    }
  }
  .playground {
    .vue-input-tag {
      margin-bottom: 20px;
    }
  }
</style>
