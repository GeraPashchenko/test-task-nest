import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RequestTimerMiddleware } from './common/middleware/request-timer.middleware';
import { HttpModule } from '@nestjs/axios';
import { FileModule } from './file/file.module';
import { WebcamGateway } from './webcam/webcam.gateway';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          ttl: config.get('application.throttlerTTL'),
          limit: config.get('application.throttlerLimit'),
        } as unknown as ThrottlerModuleOptions),
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    WebcamGateway,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestTimerMiddleware).forRoutes('*');
  }
}
