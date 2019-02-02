# vue-input-tag
> A Vue.js 2.0 input tag component inspired in [react-tagsinput](https://github.com/olahol/react-tagsinput)

[![Codeship](https://img.shields.io/codeship/3a192ae0-9502-0134-8f6e-1e693cf3975e/master.svg)]()
[![Coverage Status](https://coveralls.io/repos/github/matiastucci/vue-input-tag/badge.svg?branch=master)](https://coveralls.io/github/matiastucci/vue-input-tag?branch=master)
[![Version](https://img.shields.io/npm/v/vue-input-tag.svg)](https://www.npmjs.com/package/vue-input-tag)
[![License](https://img.shields.io/npm/l/vue-input-tag.svg)](https://www.npmjs.com/package/vue-input-tag)
[![Monthly Downloads](https://img.shields.io/npm/dm/vue-input-tag.svg)](https://www.npmjs.com/package/vue-input-tag)

<p align="center">
  <img src="demo.gif" width="750" alt="Logo"/>
</p>

## Installation

#### NPM / Yarn

```bash
npm install vue-input-tag --save
```

```bash
yarn add vue-input-tag
```

Then you need to import and register it:

```js
import InputTag from 'vue-input-tag'
```

```js
Vue.component('input-tag', InputTag)
```

#### CDN

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-input-tag"></script>
```

Then you need to register it:

`Vue.component('input-tag', vueInputTag.default)`

## Usage

```html
<input-tag v-model="tags"></input-tag>
```

## Props
| Name | Type | Default | Description |
| ---:| --- | ---| --- |
| value | Array | [] | Tags to be render in the input |
| placeholder | String | "" | Placeholder to be shown when no tags |
| trim | Boolean | false | Trims input tags from whitespaces |
| read-only | Boolean | false | Set input to readonly |
| add-tag-on-blur | Boolean | false | Add tag on input blur |
| limit | String or Number | -1 (none) | Set a limit for the amount of tags |
| validate | String or Function or Object | "" | Apply certain validator for user input. Choose from `email`, `url`, `text`, `digits` or `isodate`. Or pass a `function` or a `RegExp` object for custom validation |
| add-tag-on-keys | Array | [ 13 (return), 188 (comma), 9 (tab) ] | Keys that are going to add the new tag
| allow-duplicates | Boolean | false | Allow duplicate tags
