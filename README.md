<div style="font-size: 2rem">Wekooo home</div>

<h3 style="font-size: 1.5rem">欢迎来到我的主页</h3>

<div style="font-size: 1rem; margin-top: 2rem">下方跳转链接</div>

[Wekooo home]('https://wekooo.com')

node版本 v18.18.0

## 天气

天气通过浏览器定位获取经纬度；本地开发时使用 Vite 代理，生产环境调用 ESA 加速的 `weather-origin.wekohyk.cn` 天气接口。和风天气请求由独立服务端代理。JWT 私钥只保存在服务器 `/etc/wekohyk-weather/ed25519-private.pem`，不得放进前端环境变量或静态构建产物。

天气服务端已拆分到独立的[私有 GitHub 仓库](https://github.com/Wekohyk/wekohyk-weather-service)，其中包含后端代码、systemd/OpenResty 配置以及本地和生产部署说明。JWT 私钥仅保存在服务器。本地 Vite 开发服务器会将 `/api/*` 转发到 `127.0.0.1:18765`。

功能存档与说明：[和风天气与浏览器定位](./docs/feature-archive/qweather-weather/README.md)。
