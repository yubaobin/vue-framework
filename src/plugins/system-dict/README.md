## 字典值
使用vue插件 /plugins/system-dict/index.js

### 1. 使用
```javascript
import SystemDict from '@/plugins/system-dict/index.js'
Vue.use(SystemDict, options)
```

#### options参数

##### staticDict
静态字典值, 接收对象, 直接获取本地的字典值
```javascript
Vue.use(SystemDict, {
    staticDict: {
        sex: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }],
        status: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }],
        dict3: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }]
    }
})
```

##### remote
远程字典值, 接收方法, 可以直接返回字典对象, 也可以是一个Promise

###### 直接返回对象
```javascript
Vue.use(SystemDict, {
    remote: function () {
        return {
            sex: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }],
            status: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }],
            dict3: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }]
        }
    }
})
```

###### 返回一个Promise
```javascript
Vue.use(SystemDict, {
    remote: function () {
        return new Promise(resolve => {
            resolve({
                sex: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }],
                status: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }],
                dict3: [{ code: 'xx', text: 'xx' }, { code: 'xx2', text: 'xx2' }]
            })
        })
    }
})
```

### 2. 字典值获取
1. 通过'@/plugins/system-dict/index.js' 提供的 systemDict 对象获取
2. 在vue组件内获取
```javascript
this.$dictList[dictName]
如: 
this.$dictList.sex
```

```javascript
结合computed

export default {
    ...,
    computed: {
        sexList () {
            return this.$dictList.sex || []
        }
    }
}
```

### 3. 过滤器
```javascript
// 语法
{{ 值 | filterDict('dictName(驼峰命名)') }}

filterDict(dictName, keyValue, keyName)
```

```javascript
<template>
  <div>{{ sex | filterDict('sex') }}</div>
</template>
<script>
export default {
    data () {
        return {
            sex: 1
        }
    }
}
</script>
```

### systemDict提供方法
```javascript
import { systemDict } from './plugins/system-dict/index'
```

##### setDict(dictObj)
1. 设置字典值
2. @param dictObj 字典对象 或者 方法(支持返回promise)

##### formatDict(list = [], value, valueKey = 'code', nameKey = 'text', emptyText = '-') {
1. 格式化字典值,
2. @param list 数据字典
3. @param value 字典值列表字符串
4. @param valueKey 字典值key
5. @param nameKey 标签key
6. @param emptyText 默认返回值

##### checkDictDone
1. 检查是否完成字典请求
2. 如果使用远程接口请求字典值, 在页面初始化前必须调用此方法, 否则会出现获取不了字典的现象

##### clear(cache)
1. 清空字典数据
2. @param cache 是否清空本地缓存, 默认false

