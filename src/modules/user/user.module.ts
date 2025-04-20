import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserGrpcController } from './user.grpc.controller';

@Module({
  controllers: [UserController, UserGrpcController],
  providers: [UserService],
})
export class UserModule {}
