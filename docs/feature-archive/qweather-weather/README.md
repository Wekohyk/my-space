# 和风天气与浏览器定位

## 功能概述

天气卡片优先使用浏览器定位获取当前设备坐标，通过和风 GeoAPI 反查城市名称，再查询当地实时天气。页面展示城市名、天气状况、温度、风向和风力等级，不直接展示经纬度，并提供和风天气来源链接。页面原有的日期、星期和时钟显示保留。

浏览器需要 HTTPS 安全上下文并获得用户的位置授权。用户拒绝定位、定位失败或浏览器不支持定位时，自动改为获取北京天气。

## 请求流程

```text
浏览器定位（失败/拒绝时使用北京坐标 39.92, 116.41）
    ↓ 纬度、经度
本地开发：前端 GET /api/weather ── Vite 代理 ─────────┐
                                                       ├─ Python 天气服务
生产环境：前端 GET https://weather-origin.wekohyk.cn/api/weather
    ↓ ESA HTTPS 代理及回源规则（源站 SNI: wekohyk.cn）
    ↓ OpenResty 反向代理 ─────────────────────────────┘
    ↓ 用服务器私钥生成 5 分钟有效的 Ed25519 JWT
和风天气 GeoAPI GET /geo/v2/city/lookup（坐标反查城市）
    ↓ 城市名称
和风天气 GET /weather/v1/current/{latitude}/{longitude}
    ↓ 实时天气 JSON
服务器整理天气字段并返回前端
```

JWT 和私钥不会发送到浏览器。天气服务只接受合法范围内的经纬度，并使用 HTTPS 请求和风天气；gzip 响应会由服务端解压。

## 功能目录

存档目录记录说明；以下项目文件是实际运行代码和配置：

| 文件 | 用途 |
| --- | --- |
| `src/components/Weather.vue` | 定位、北京默认天气、时钟、城市名展示、风向本地化与错误提示 |
| `src/api/weather.ts` | 前端天气响应类型；本地走 Vite 同源代理，生产走天气服务子域名 |
| `vite.config.ts` | 本地开发时将 `/api/*` 转发到 `127.0.0.1:18765` |

后端代码和部署配置已拆分到[独立私有仓库](https://github.com/Wekohyk/wekohyk-weather-service)：`weather_api.py`、`wekohyk-weather.service` 和 `weather-api-location.conf`。

## 运行与配置

### 生产服务器

- 后端服务运行、systemd 管理、OpenResty 配置及服务器部署命令见[天气服务仓库说明](https://github.com/Wekohyk/wekohyk-weather-service#production-deployment)。
- 生产天气接口：`https://weather-origin.wekohyk.cn/api/weather`。ESA 为该子域名代理请求并回源至服务器；天气服务允许主站 `wekohyk.cn` 和 `www.wekohyk.cn` 的跨域读取。
- 根域名和 `www` 已绑定 ESA Pages，Pages 域名绑定会直接把请求交给边缘函数。天气 API 因而使用专属子域名，避免覆盖现有网站路由。
- 私钥和 QWeather 环境配置保留在服务器，不提交到前端或天气服务仓库。

本次部署备份路径：`/opt/1panel/backup/website/wekohyk-cn-before-qweather-20261014.tar.gz`。

### 本地开发

本地开发需要同时运行独立仓库中的 Python 天气服务和此仓库的 Vite 前端。Vite 将 `/api/weather` 转发到 `127.0.0.1:18765`，因此前后端使用两个终端。先克隆天气服务仓库：

```sh
git clone git@github.com:Wekohyk/wekohyk-weather-service.git ../wekohyk-weather-service
```

#### 1. 准备 Python 环境

进入天气服务仓库目录后执行：

```sh
cd ../wekohyk-weather-service
python3 -m venv .venv-weather
source .venv-weather/bin/activate
python -m pip install -r requirements.txt
```

首次启动需要联网安装 Python 依赖。`.venv-weather` 是本地虚拟环境，不需要提交到 Git。

#### 2. 设置天气服务环境变量

仍在天气服务仓库的第一个终端中设置和风天气参数。`kid`、Developer ID 和 Project ID 使用服务器 `/etc/wekohyk-weather/weather-api.env` 中对应的值；私钥路径改成当前开发机上私钥文件的位置：

```sh
export QWEATHER_API_HOST='你的和风天气 API Host'
export QWEATHER_KID='你的 Credential ID'
export QWEATHER_DEVELOPER_ID='你的 Developer ID'
export QWEATHER_PROJECT_ID='你的 Project ID'
export QWEATHER_PRIVATE_KEY_PATH='/本机私钥文件的完整路径'
export WEATHER_API_PORT=18765
```

不要把私钥内容粘贴到命令、文档或前端 `.env` 文件里，也不要提交本地私钥路径配置。环境变量只对当前终端及其启动的服务进程有效。

#### 3. 启动天气服务

在天气服务仓库目录的第一个终端中启动后端：

```sh
python weather_api.py
```

服务成功启动后会持续运行并监听 `127.0.0.1:18765`。保持此终端开启；按 `Ctrl+C` 可停止服务。

#### 4. 启动前端

打开第二个终端，进入前端仓库目录执行：

```sh
cd ../my-space
npm run dev
```

使用终端显示的本地地址打开页面，允许浏览器访问位置。`localhost` 属于浏览器允许定位的安全上下文。前端请求 `/api/weather` 时由 Vite 自动转发到本地 Python 服务。

#### 5. 单独检查天气接口

在天气服务运行期间，可从另一个终端请求测试坐标：

```sh
curl --fail 'http://127.0.0.1:18765/weather?latitude=39.92&longitude=116.41'
```

返回包含 `condition`、`temperature` 和 `wind` 的 JSON 即表示服务端已连通和风天气。结束开发时分别在两个终端按 `Ctrl+C`；之后再次启动前端时，也需要重新启动天气服务。

## 接口响应

前端使用以下字段；城市由和风 GeoAPI 根据坐标反查，界面展示 `administrativeArea name`，不展示原始坐标：

```json
{
  "location": {
    "name": "东城",
    "administrativeArea": "北京市",
    "latitude": 39.92,
    "longitude": 116.41
  },
  "condition": { "text": "多云" },
  "temperature": { "value": 17.88, "unit": "°C" },
  "wind": {
    "direction": { "compass": "ese" },
    "speed": { "value": 0.71, "unit": "m/s" },
    "scale": 1
  }
}
```

服务端对参数或上游错误分别返回 400、404 或 502。前端请求失败时不展示天气字段，并显示错误提示。

## 验证记录

- `npm run build`：通过（构建工具有既有的大型 JavaScript chunk 提示）。
- 服务器本机 HTTPS 请求 `/api/weather`：通过，成功取得和风天气实时数据。
- 公网 ESA 请求 `https://weather-origin.wekohyk.cn/api/weather?latitude=39.92&longitude=116.41`：返回 200 和实时天气 JSON。
- 浏览器跨域响应检查：`https://wekohyk.cn` 获得匹配的 `Access-Control-Allow-Origin` 响应头。
- 私钥服务器权限：`weather-api:weather-api`，`0600`。
- 和风天气归属标注：天气卡片已提供中英文链接。

## ESA 部署记录

- ESA DNS 代理记录：`weather-origin.wekohyk.cn → 47.108.87.253`（网站页面业务类型，不使用规则模板）。
- 回源规则：`weather-api-origin`，匹配 `Host=weather-origin.wekohyk.cn` 且 URI 路径精确等于 `/api/weather`；源站 DNS 改写指向该代理记录，HTTPS 回源到 443，并使用 `wekohyk.cn` 作为 SNI。
- 服务器 OpenResty 将 `weather-origin.wekohyk.cn` 加入网站虚拟主机，并将 `/api/weather` 转给本机天气服务。配置备份位于服务器 `/opt/1panel/www/conf.d/wekohyk-cn.conf.codex-backup-20261014`。

## 数据来源

- [和风天气实时天气 API](https://dev.qweather.com/en/docs/api/weather/weather-current/)
- [和风天气城市搜索与坐标反查 API](https://dev.qweather.com/docs/api/geoapi/city-lookup/)
- [和风天气归属标注要求](https://dev.qweather.com/en/docs/terms/attribution/)
