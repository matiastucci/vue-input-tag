# vue-input-tag
> A Vue.js 2.0 input tag component inspired in [react-tagsinput](https://github.com/olahol/react-tagsinput)

[![bitHound Overall Score](https://www.bithound.io/github/matiastucci/vue-input-tag/badges/score.svg)](https://www.bithound.io/github/matiastucci/vue-input-tag)
[![bitHound Dependencies](https://www.bithound.io/github/matiastucci/vue-input-tag/badges/dependencies.svg)](https://www.bithound.io/github/matiastucci/vue-input-tag/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/matiastucci/vue-input-tag/badges/devDependencies.svg)](https://www.bithound.io/github/matiastucci/vue-input-tag/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/matiastucci/vue-input-tag/badges/code.svg)](https://www.bithound.io/github/matiastucci/vue-input-tag)
[![Codeship](https://codeship.com/projects/3a192ae0-9502-0134-8f6e-1e693cf3975e/status?branch=master)]()



## Installation

``` bash
npm install vue-input-tag --save
```

and in your component:

``` javascript
import InputTag from 'vue-input-tag'
```

## Usage

``` html
<input-tag :on-change="callbackMethod" :tags="tagsArray"></input-tag>
```

## Props
| Name | Type | Default | Description |
| ---:| --- | ---| --- |
| tags | Array | [] | Tags to be render in the input |
| placeholder | String | "" | Placeholder to be shown when no tags |
| read-only | Boolean | false | Set input to readonly |
| on-change | Function | undefined | Callback to get the tags when there is a change |
