import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendationEntity } from 'src/entities/recommendation.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { UsersService } from '@modules/users/users.service';

import { Service1Service } from '@services/service-1/service-1.service';
import { Service2Service } from '@services/service-2/service-2.service';

import {
    GetHistoryRecommendationsProps,
    GetRecommendationsProps,
} from './recommendations.interface';

@Injectable()
export class RecommendationsService {
    constructor(
        private readonly service1Service: Service1Service,
        private readonly service2Service: Service2Service,
        private readonly usersService: UsersService,
        @InjectRepository(RecommendationEntity)
        private readonly recommendationsTable: Repository<RecommendationEntity>,
    ) {}

    async getNewRecommendations(params: GetRecommendationsProps) {
        const { username } = params;

        // Check user existence in DB
        await this.usersService.throwIfUserDoesNotExist(username);

        const user = await this.usersService.findUser(username);

        const data = await Promise.all([
            this.service1Service.getRecommendations({
                weight: user.weight,
                height: user.height,
            }),
            this.service2Service.getRecommendations({
                weight: user.weight,
                height: user.height,
                dob: user.dob,
            }),
        ]);

        const sorted = data.flat().sort((a, b) => (a.priority > b.priority ? -1 : 1));
        // Remove previous recommendations
        await this.recommendationsTable.delete({ user });

        // Save new recommendations
        await this.recommendationsTable.save(
            sorted.map((recommendation) => ({
                ...recommendation,
                user,
            })),
        );

        return sorted;
    }

    async getHistoryRecommendations(params: GetHistoryRecommendationsProps) {
        const { username } = params;

        // Check user existence in DB
        await this.usersService.throwIfUserDoesNotExist(username);

        const user = await this.usersService.findUser(username);

        const recommendations = await this.recommendationsTable.find({ where: { user } });

        return recommendations.sort((a, b) => (a.priority > b.priority ? -1 : 1));
    }
}
