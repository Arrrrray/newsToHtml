# newsToHtml

微信公众号图文消息转换为 HTML，方便插入到小程序中显示

## 项目来源

在编写公众号图文的时候，我们通常将一些小程序页卡插入其中。尤其是购物推荐类的公众号，用户在浏览图文消息的时候，通过图文详情中插入的小程序卡片，可以非常方便的跳转到小程序中进行商品的浏览以及下单购买，这样无疑会大大增加我们小程序的用户访问量以及下单量，从而提高我们的销售。

在另一方面，小程序的用户也需要在浏览商品信息的时候，很方便的查看关于此商品的更多信息，比如微信公众号推荐此商品的图文，所以在小程序中插入微信公众号图文详情的需求也应运而生。

不仅如此，一些知识分享类的公众号和小程序也需要在公众号中嵌入小程序页卡或者在小程序中嵌入微信公众号文章来互相引流，增加自己的用户量和关注度。

## 具体实现

在公众号文章中添加小程序页卡的功能现在微信原生的图文编辑器或者很多第三方的微信公众号图文编辑器都实现了这一功能，在此就不在赘述，本项目主要解决的是在小程序中插入公众号文章的需求。

### 方案一

微信小程序官方提供了 [web-view](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html) 组件，可以将关联的公众号的文章引入到小程序中。

开发者可以根据开发文档进行开发，将公众号文章引入到小程序中。

根据微信官方的说明

1. [点击微信公众号文章跳转到小程序的时候，将会统一增加弹窗，询问是否跳转，用户确认之后才可以跳转其他小程序。](https://developers.weixin.qq.com/community/develop/doc/0000ac39168d50641477b725c51c01)

2. 如果公众号文章中小程序页卡是要跳转到本小程序中某个页面，也会出现询问是否跳转的提示；另外用户返回的时候，不是返回之前的图文详情，而是直接退出了小程序，造成不好的用户体验。

基于此，本人根据微信公众号图文详情的数据设计了第二种实现方案。

### 方案二

根据微信公众号开发文档：[获取素材列表，](https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_materials_list.html)发现返回的公众号图文详情数据中，小程序页卡被一个自定义组件包裹，如下所示：

```html
<mp-miniprogram
  data-miniprogram-appid="******************"
  data-miniprogram-path="pages/index/index"
  data-miniprogram-nickname="小程序名称"
  data-miniprogram-avatar="http://mmbiz.qpic.cn/mmbiz_png/BazrezbCd8uMokHc1AeWorYTQRUTHicmjXtlUjPJhGf99rMFPncwKknjOVeyUOvP7bIEiaNWSrWODAjS0LqktlMA/640?wx_fmt=png&amp;wxfrom=200"
  data-miniprogram-title="跳转到小程序"
  data-miniprogram-imageurl="http://mmbiz.qpic.cn/mmbiz_jpg/rKRv8VCQXwQmnSKBUNmNS5NKVbVOAUHO11ljRYXB33Oicp7mZiazRSbzfPJg7QmHh7PDcxKtvL79vgacaIkFtdOg/0?wx_fmt=jpeg"
  data-miniprogram-type="card"
  data-miniprogram-servicetype="0"
></mp-miniprogram>
```

组件中包含了小程序的 appid，要跳转到的页面 path，小程序名称，小程序页卡图片地址等信息。图文详情其他内容为 html 标签(包含样式)。

本方案实现思路如下：

1. [获取微信公众号 ACCESS_TOKEN](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)
2. [获取图文详情素材列表](https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_materials_list.html)
3. 通过正则表达式，匹配到图文消息中嵌入的小程序页卡，获取其中需要的数据
4. 将图文消息详情中自定义组件**mp-miniprogram**替换为 html 标签，再插入到图文详情字符串中
5. 通过[小程序富文本插件](https://github.com/jin-yufeng/Parser)将图文详情数据（html 文件）插入到小程序页面中。

本项目封装了第三步（通过正则表达式，匹配到图文消息中嵌入的小程序页卡，获取其中需要的数据）的实现方法，其他步骤各位开发者可自行实现。（[有问题欢迎联系交流](https://github.com/Arrrrray/newsToHtml/issues)）

## 产品安装和下载

- npm 下载 `npm i newstohtml -D`
- github 地址：https://github.com/Arrrrray/newsToHtml
- CND:http://unpkg.com/newstohtml/index.js

## 快速使用

```js
// 引入
const newstohtml = require("newstohtml");

/**
 * @params 输入参数，图文详情字符串数据，一般路径为'result.item[0].content.news_item[0].content'
 * @returns 返回数据，匹配到的小程序页卡，appid，path，imageurl等数据
 */
console.log(newstohtml(params));
```

## 交流提问区

已经开通了[GitHub issue](https://github.com/Arrrrray/newsToHtml/issues)，欢迎进行交流提问

## 关于作者

高军超，一名前端开发者，现供职于[汉光百货麻雀团队](https://github.com/hanguangbaihuo/hg_project)。

欢迎联系交流

- 微信：MTc2MDAxMTU5NTc=
- 邮箱：anVuY2hhb2NvZGVAZ21haWwuY29t
