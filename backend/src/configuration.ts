import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as typeorm from '@midwayjs/typeorm';
import { join } from 'path';

@Configuration({
  imports: [koa, typeorm],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // Add CORS middleware
    this.app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
      }
      
      await next();
    });
  }
}
