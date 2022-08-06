import { Inject, Provide } from '@midwayjs/decorator';
import { UserModel } from "../model/user.model"
import { isEmpty } from 'lodash';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserService {
  @Inject()
  userModel:UserModel

  @Inject()
  jwtService: JwtService;

  /**
   * 插入用户信息
   * @param username 
   * @param password 
   * @returns 
   */
  async saveUser(username: string, password: string) {
    const user = await this.userModel.saveUserByUsernameAndPassword(username, password);
    return user;
  }

  /**
   * 获取用户信息
   * @param username 
   * @param password 
   * @returns 
   */
  async getUser(username: string, password: string) {
    const user = await this.userModel.getUserByUsernameAndPassword(username, password);
    return user;
  }

  /**
   * 获取登录JWT
   * 返回null则账号密码有误，不存在该用户
   */
   async getLoginSign(username: string, password: string): Promise<string> {
    const user = await this.userModel.getUserByUsernameAndPassword(username, password);
    if (isEmpty(user)) {
      return null;
    }

    const jwtSign = this.jwtService.sign(
      {
        username: user.username,
        pv: 123456,
      },
      {
        expiresIn: '24h',
      }
    );
    return jwtSign;
  }

}
