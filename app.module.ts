import { Controller, Get, Module } from './common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  methodInController(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTestReq(): string {
    return this.appService.getTestReq()
  }
}

export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTestReq(): string {
    return 'test route'
  }
}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}