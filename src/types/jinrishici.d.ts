interface Origin {
  title: string;
  dynasty: string;
  author: string;
  content: string[];
  translate: string[];
}

interface Data {
  id: string;
  content: string;
  popularity: number;
  originL: Origin;
  mathTags: string[];
  recommendedReason: string;
  cacheAt: string;
}

interface Response {
  status: string;
  data: Data;
  token: string;
  ipAddress: string;
}

/**
 * error response
 * errCode 是错误码，目前只有以下几种错误码，您也简单判断 HTTP 头中的状态码，对于错误返回，我们总不会返回 200
 * 1001 ：内部服务器错误，HTTP状态码 500
 * 1002 ：API路径不对，HTTP状态码 404
 * 2002 ：Token不是服务器签发，HTTP状态码 400
 * 2003 ：IP超过每日新用户限制，HTTP状态码 400，这很有可能是您没有正确保存 Cookies 或者 Token
 */
interface ErrData {
  status: string;
  errCode: number;
  errMessage: string;
}

declare module 'jinrishici';
