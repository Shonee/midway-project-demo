import { Controller, Inject, Get, Post, Body } from "@midwayjs/decorator";
import { UserLoginDTO } from "../dto/user.dto"
import { UserService } from "../service/user.service"
import { ResDto } from "../interface"

@Controller("/api/user")
export class User{
 
    @Inject()
    userService:UserService

    @Get('/')
    async home(): Promise<string> {
        return 'Hello Midwayjs!';
    }

    @Post('/save')
    async save(@Body() loginInfo: UserLoginDTO): Promise<ResDto> {
        const user = await this.userService.saveUser(
            loginInfo.username,
            loginInfo.password
          );
          return {
            code: 200,
            result: "success",
            message: "插入用户数据成功",
            data: {
              user: user
            }
        }
    }

    @Post('/login')
    async login(@Body() loginInfo: UserLoginDTO): Promise<ResDto> {
        const isSuccess = await this.userService.getUser(
          loginInfo.username,
          loginInfo.password
        );
        if (!isSuccess) {
            // 登录失败
            return {
                code: 400,
                result: "error",
                message: "账号或密码不正确",
                data: null
            };
        }
        
        // 登录成功，返回 token 信息
        const sign = await this.userService.getLoginSign(
            loginInfo.username,
            loginInfo.password
          );

        return {
            code: 200,
            result: "success",
            message: "登录成功",
            data: {
              token: sign
            }
        }
      }
}