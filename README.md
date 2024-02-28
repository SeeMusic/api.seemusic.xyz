# seemusic.xyz api

使用了 [Hono](https://hono.dev/) 框架，托管在 Cloudflare Worker 上。

接口地址前缀

`https://api.seemusic.xyz`

## 开发相关

### 本地开发

```
pnpm install
pnpm run dev
```

### 部署
```
pnpm run deploy
```


## 企业微信机器人转发接口

`POST /wechat-bot`

### Request
```
{
  webhook: string,
  msg: Record
}
```

* `webhook` 企业微信机器人的 webhook 地址
* `msg` 企业微信机器人的消息体，参见 [企业微信机器人文档](https://work.weixin.qq.com/api/doc/90000/90136/91770)

### Response

* 发送成功，仅返回 HTTP 状态码 为 `200`；
* 发送失败，比如 msg 的格式错误，返回 HTTP 状态码为 `400`，并返回企业微信抛出的错误信息。

```
{
  message: string
}
```
