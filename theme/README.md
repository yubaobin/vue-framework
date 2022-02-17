# 主题生成工具
## 使用
1. 在项目根目录package.json中script添加
```
"scripts": {
  ...
  "build:theme": "./theme/bin/theme",
  ...
}
```
2. 运行
```
npm run build:theme
```

## 添加主题文件
#### 主题目录
src/styles/theme/
1. 复制normal文件夹，重命名为主题名称，比如pink
2. config.json 修改name，是主题的中文名字
```
{
  "name": "少女粉"
}
```
3. 运行命令
```
npm run build:theme -- -t pink

// -t 后面是主题目录的值 如 pink
```
> 如果直接修改 theme/config/index 的 theme 字段
```
var config = Object.assign({
  theme: 'pink',  ----->  修改成主题的值
})
```

> 则可以不加参数，直接运行 npm run build:theme

运行命令生成后，在public/theme会生成对应的主题css