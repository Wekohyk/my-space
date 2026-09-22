//此处的规则供参考，其中多半其实都是默认值，可以根据个人习惯改写
module.exports = {
  printWidth: 120, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: true, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'all', //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  bracketSameLine: false, //多属性html标签的'>'折行放置
  arrowParens: 'avoid', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被prettier格式化的文件顶部加上标注
  proseWrap: 'preserve', //不执行任何操作，保留原样。markdown格式化时使用
  htmlWhitespaceSensitivity: 'strict', //对HTML空白敏感，避免在属性中添加空格
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  endOfLine: 'lf', //结束行形式
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
  experimentalTernaries: true, //实验性三元运算符
  singleAttributePerLine: false, //当超过单行长度时，将多个属性放在多行-eg: <view class="a" b="c" d="e" />
};
