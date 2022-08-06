import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
        // 白名单路径直接跳出
        if(this.match(ctx)){
            await next();
            return;
        }

      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
            throw new httpError.UnauthorizedError();
        }
        await next();
      }
    };
  };

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    // console.log("增加请求校验白名单路径")
    const ignore = ctx.path.indexOf('/api/user/login') !== -1;
    const ignore2 = ctx.path.indexOf('/api/user/save') !== -1;
    return !ignore || !ignore2;
  }
}