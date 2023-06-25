import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { Service1Service } from '@services/service-1/service-1.service';
import { Service2Service } from '@services/service-2/service-2.service';

import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

@Module({
    imports: [HttpModule],
    controllers: [RecommendationsController],
    providers: [RecommendationsService, Service1Service, Service2Service],
})
export class RecommendationsModule {}
