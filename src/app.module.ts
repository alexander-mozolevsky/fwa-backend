import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { HealthModule } from '@modules/health/health.module';

import { transports } from '@utils/winston';

import { RecommendationsModule } from './modules/recommendations/recommendations.module';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports,
        }),
        HealthModule,
        RecommendationsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
