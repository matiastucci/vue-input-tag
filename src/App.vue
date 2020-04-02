<script>
import InputTag from "./components/InputTag.vue";

export default {
  name: "app",

  components: {
    InputTag
  },

  data() {
    return {
      readOnly: false,
      addTagOnBlur: false,
      allowDuplicates: false,
      placeholder: "Add Tag",
      tags: ["Jerry", "Kramer", "Elaine", "George"],
      limit: 10,
      htmlCode: "",
      validate: ""
    };
  },

  methods: {
    getPreviewHTML() {
      let html = "<input-tag";
      html += this.placeholder ? ` placeholder="${this.placeholder}"` : "";
      html += ' v-model="tags"';
      html += this.readOnly ? ' :read-only="true"' : "";
      html += this.addTagOnBlur ? ' :add-tag-on-blur="true"' : "";
      html += this.allowDuplicates ? ' :allow-duplicates="true"' : "";
      html += this.limit ? ' :limit="limit"' : "";
      html += this.validate ? ` validate="${this.validate}"` : "";
      return `${html}></input-tag>`;
    }
  }
};
</script>

<template>
  <div id="app">
    <section class="page-header">
      <h1 class="project-name">Vue Input Tag</h1>
      <p>
        Vue.js 2.0 component, inspired in&nbsp;<a
          href="https://github.com/olahol/react-tagsinput"
          target="_blank"
          >react-tagsinput</a
        >
      </p>
      <a
        href="https://github.com/matiastucci/vue-input-tag"
        target="_blank"
        class="btn"
        >GitHub</a
      ><a
        href="https://www.npmjs.com/package/vue-input-tag"
        target="_blank"
        class="btn"
        >NPM</a
      >
    </section>

    <section class="main-content">
      <h3>Install</h3>
      <p><code>npm install vue-input-tag --save</code></p>
      <p><code>yarn add vue-input-tag</code></p>

      <h3>Playground</h3>
      <div class="playground">
        <div class="form-group">
          <p class="label">placeholder:</p>
          <input v-model="placeholder" type="text" />
        </div>
        <div class="form-group">
          <p class="label">readOnly:</p>
          <input v-model="readOnly" type="checkbox" />
        </div>
        <div class="form-group">
          <p class="label">addTagOnBlur:</p>
          <input v-model="addTagOnBlur" type="checkbox" />
        </div>
        <div class="form-group">
          <p class="label">allowDuplicates:</p>
          <input v-model="allowDuplicates" type="checkbox" />
        </div>
        <div class="form-group">
          <p class="label">limit:</p>
          <input v-model="limit" type="number" />
        </div>
        <div class="form-group">
          <p class="label">validate:</p>
          <select v-model="validate">
            <option value="">No validate</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="url">Url</option>
            <option value="digits">Digits</option>
            <option value="isodate">ISO Date</option>
          </select>
        </div>
        <div class="form-group">
          <p class="label">tags:</p>
          <code>{{ tags }}</code>
        </div>

        <div>
          <span></span>
          <h3>Preview</h3>

          <InputTag
            :limit="limit"
            v-model="tags"
            :placeholder="placeholder"
            :read-only="readOnly"
            :validate="validate"
            :add-tag-on-blur="addTagOnBlur"
          />

          <span></span>
          <h3>HTML</h3>
          <code> {{ getPreviewHTML() }} </code>
        </div>

        <footer class="site-footer">
          <span class="site-footer-credits">
            <a href="https://twitter.com/TucciMatias" target="_blank"
              >@TucciMatias</a
            >
            <span>&nbsp;-&nbsp;</span
            ><a href="https://tucci.me" target="_blank">tucci.me</a>
          </span>
        </footer>
      </div>
    </section>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "styles/normalize.css";
@import "styles/github-light.css";
@import "styles/stylesheet.css";
</style>
