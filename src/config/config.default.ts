import { MidwayConfig } from '@midwayjs/core';
import {UserEntity} from '../entity/user.entity'

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659760013206_3999',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: ":memory:",
        synchronize: true,
        logging: true,
        entities: [UserEntity],
        // ...
      }
    }
  },
  // jwt 配置
  jwt: {
    secret: 'secret123456', 
    expiresIn: '60 * 60 * 24', 
  },
} as MidwayConfig;
