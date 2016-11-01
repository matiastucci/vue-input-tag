<script>
  export default {
    name: 'InputTag',

    props: {
      tags: {
        type: Array,
        default: () => [],
      },
      placeholder: {
        type: String,
        default: '',
      },
      onChange: {
        type: Function,
      },
      readOnly: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        newTag: '',
      };
    },

    methods: {
      focusNewTag() {
        if (this.readOnly) { return; }
        this.$el.querySelector('.new-tag').focus();
      },
      addNew(tag) {
        if (tag && !this.tags.includes(tag)) {
          this.tags.push(tag);
          this.tagChange();
        }
        this.newTag = '';
      },
      remove(index) {
        this.tags.splice(index, 1);
        this.tagChange();
      },
      removeLastTag() {
        if (this.newTag) { return; }
        this.tagChange();
        this.tags.pop();
      },
      getPlaceholder() {
        if (!this.tags.length) {
          return this.placeholder;
        }
        return '';
      },
      tagChange() {
        if (this.onChange) {
          // avoid passing the observer
          this.onChange(JSON.parse(JSON.stringify(this.tags)));
        }
      },
    },
  };
</script>

<template lang="pug">
  .vue-input-tag(@click='focusNewTag()' v-bind:class='{\'read-only\': readOnly}')
    span.tag(v-for='(tag, index) in tags')
      span {{ tag }}
      a.remove(v-if='!readOnly' @click.prevent.stop='remove(index)')
    input.new-tag(
      v-if='!readOnly'
      v-bind:placeholder='getPlaceholder()'
      type='text'
      v-model='newTag'
      v-on:keydown.delete.stop='removeLastTag()'
      v-on:keydown.enter.prevent.stop='addNew(newTag)'
    )
</template>

<style lang="scss">

  $white: #fff;
  $grey: #ccc;
  $grey2: #777;
  $yellow1: #cde69c;
  $yellow2: #a5d24a;
  $yellow3: #638421;

  .vue-input-tag {
    background-color: $white;
    border: 1px solid $grey;
    overflow: hidden;
    padding-left: 5px;
    padding-top: 5px;
    cursor: text;
    height: 36px;
    -webkit-appearance: textfield;

    .tag {
      background-color: $yellow1;
      border-radius: 2px;
      border: 1px solid $yellow2;
      color: $yellow3;
      display: inline-block;
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 5px;
      margin-right: 5px;
      padding: 5px;

      .remove {
        cursor: pointer;
        font-weight: bold;
        color: $yellow3;
        &:hover {
          text-decoration: none;
        }
        &::before {
          content: " x";
        }
      }
    }

    .new-tag {
      background: transparent;
      border: 0;
      color: $grey2;
      font-size: 13px;
      font-weight: 400;
      margin-bottom: 6px;
      margin-top: 1px;
      outline: none;
      padding: 5px;
      width: 80px;
    }

    &.read-only {
      cursor: default;
    }
  }
</style>
