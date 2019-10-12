# @xohu/script-alias-loader

> vue-cli3 的 script-alias-loader 插件

**安装**

```
cnpm install @xohu/script-alias-loader -D
```

## 说明
```
使用此 loader 将使你能在 script 中使用 alias别名 定义图片路径
```

## 参数
```
// 别名数组
{ alias: ['@', '@public'] }
```

## 配置
``` js
// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module.rule('vue').use('script-alias-loader').loader('@xohu/script-alias-loader').options({ alias: ['@', '@public'] })
    }
}
```

## 使用
``` js
<template>
  <div>
    <img :src="img1" />
    <div v-html="img2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        img1: '',
        img2: ''
    }
  },
  mounted() {
    this.$nextTick(this.init);
  },
  methods: {
    init() {
      // 这里的 @ 就是别名 alias，它指向 src 目录
      this.img1 = `@/assets/img/logo.png`;
      
      this.img2 = '<img src="@/assets/img/logo.png"></img>';

      this.$confirm("<img src='@/assets/img/logo.png'></img>删除？", "提示");
    }
  }
}
</script>
```

## 注意事项
```
不支持在路径中使用变量
```
  