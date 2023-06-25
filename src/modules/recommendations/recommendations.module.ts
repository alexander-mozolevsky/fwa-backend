import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecommendationEntity } from 'src/entities/recommendation.entity';

import { UsersModule } from '@modules/users/users.module';

import { Service1Service } from '@services/service-1/service-1.service';
import { Service2Service } from '@services/service-2/service-2.service';

import { RecommendationsController } from './recommendations.controller';
import { RecommendationsService } from './recommendations.service';

@Module({
    imports: [HttpModule, UsersModule, TypeOrmModule.forFeature([RecommendationEntity])],
    controllers: [RecommendationsController],
    providers: [RecommendationsService, Service1Service, Service2Service],
})
export class RecommendationsModule {}
