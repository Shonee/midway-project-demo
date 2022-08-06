import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

    let app: Application;

    beforeAll(async () => {
      // 只创建一次 app，可以复用
      try {
        // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
        // refs: https://github.com/facebook/jest/issues/8688
        app = await createApp<Framework>();
      } catch(err) {
          console.error('test beforeAll error', err);
        throw err;
      }
    });

    afterAll(async () => {
        // close app
        await close(app);
      });


    // 测试插入数据
    it('should POST /api/user/save', async () => {
        // make request
        const result = await (await createHttpRequest(app).post('/api/user/save').send({username:'jack',password:'redballoon'}));

        // use expect by jest
        expect(result.status).toBe(200);
        expect(result.body.code).toBe(200);
        expect(result.body.result).toBe('success');
        expect(result.body.message).toBe('插入用户数据成功');
    });
 
    //测试登录成功
  it('should POST /api/user/login', async () => {
    // make request
    const result = await (await createHttpRequest(app).post('/api/user/login').send({username:'jack',password:'redballoon'}));

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
  });

  // 测试登录失败
  it('should POST /api/user/login', async () => {
    // make request
    const result = await (await createHttpRequest(app).post('/api/user/login').send({username:'jack1',password:'redballoon1'}));

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
    expect(result.body.message).toBe('账号或密码不正确');
    expect(result.body.data).toBe(null);
  });

});