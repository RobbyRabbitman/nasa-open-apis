import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { createProxyMiddleware } from "http-proxy-middleware";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

const updateQueryStringParameter = (
  path: string,
  key: string,
  value: string
) => {
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = path.indexOf("?") !== -1 ? "&" : "?";
  if (path.match(re)) {
    return path.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return path + separator + key + "=" + value;
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  app.use(
    "/api",
    createProxyMiddleware({
      target: environment.target,
      changeOrigin: true,
      pathRewrite: (path) =>
        updateQueryStringParameter(path, "api_key", process.env.API_KEY),
      onProxyRes: (res) => {
        res.headers["access-control-expose-headers"] =
          "x-ratelimit-limit,x-ratelimit-remaining";
        return res;
      },
    })
  );
  if (!environment.production)
    Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
