import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductModule } from './product/product.module.js';
import { PrismaService } from '../prisma.service.js';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule.forRoot(),ProductModule,
    CacheModule.register({
      ttl: 60, // seconds
      isGlobal: true,})
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
