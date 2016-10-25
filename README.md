# vue-input-tag

> A Vue.js 2.0 input tag component



## Installation

``` bash
npm install vue-time-picker --save-dev
```

and where do you want to use it:

```
import InputTag from 'vue-input-tag'
```

## Usage

```
<input-tag :on-change="callback" :tags="tagsArray"></input-tag>
```

#### Props
| Name | type | default | description |
| ---:| --- | ---| --- |
| tags | Array | [] | Tags to be render in the input |
| placeholder | String | "" | Placeholder to be shown when no tags |
| read-only | Boolean | false | Set input to readonly |
| on-change | Function | undefined | Callback to get the tags when there is a change |
