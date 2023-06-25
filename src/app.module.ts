import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { HealthModule } from '@modules/health/health.module';

import { getDatabaseConfig } from '@constants/database';

import { transports } from '@utils/winston';

import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(getDatabaseConfig()),
        WinstonModule.forRoot({
            transports,
        }),
        HealthModule,
        RecommendationsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
