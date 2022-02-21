import { isNonNull } from "@nasa-open-apis/shared/util";
import { INestApplication } from "@nestjs/common";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

export const updateQueryStringParameter = (
  path: string,
  key: string,
  value: string,
  prefix?: string
) => {
  if (isNonNull(prefix)) path = path.replace(prefix, "");
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = path.indexOf("?") !== -1 ? "&" : "?";
  if (path.match(re)) {
    return path.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return path + separator + key + "=" + value;
  }
};

export function createProxy(
  app: INestApplication,
  target: string,
  key: string,
  prefix = "/api",
  options?: Options
): INestApplication {
  return app.use(
    prefix,
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      pathRewrite: (path) =>
        updateQueryStringParameter(path, "api_key", key, prefix),
      onProxyRes: (res) => {
        res.headers["access-control-expose-headers"] =
          "x-ratelimit-limit,x-ratelimit-remaining";
        return res;
      },
      ...options,
    })
  );
}
