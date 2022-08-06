import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from "../entity/user.entity"
import { Repository } from 'typeorm';

@Provide()
export class UserModel {
    @InjectEntityModel(UserEntity)
    userRepo: Repository<UserEntity>;
  
    /**
     * 根据用户名和密码获取用户信息
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
    async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
        console.log("userRepo" + this.userRepo);
        let user = await this.userRepo.findOne({
            where:{
                username:username,
                password:password
            }
          });
        console.log("当前用户信息：" + user);
      return user
    }

    /**
     * 根据用户名和密码插入用户信息
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
     async saveUserByUsernameAndPassword(username, password): Promise<UserEntity> {
        let user = await this.userRepo.save({
            username:username,
            password:password
          });
        console.log("新增用户信息：" + user);
      return user
    }
  }