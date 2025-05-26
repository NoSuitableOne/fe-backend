import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 注册全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  
  // http服务
  await app.listen(process.env.PORT ?? 3000);

  // 启动 gRPC 服务
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: 'proto/user/user.proto',
      url: '0.0.0.0:50051', // 指定 gRPC 监听的地址和端口
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
