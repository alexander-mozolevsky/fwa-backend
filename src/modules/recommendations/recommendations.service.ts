import { Injectable } from '@nestjs/common';

import { Service1Service } from '@services/service-1/service-1.service';
import { Service2Service } from '@services/service-2/service-2.service';

import { GetRecommendationsProps } from './recommendations.interface';

@Injectable()
export class RecommendationsService {
    constructor(
        private readonly service1Service: Service1Service,
        private readonly service2Service: Service2Service,
    ) {}

    async getRecommendations(params: GetRecommendationsProps) {
        const { weight, height, dob } = params;

        const data = await Promise.all([
            this.service1Service.getRecommendations({
                weight,
                height,
            }),
            this.service2Service.getRecommendations({
                weight,
                height,
                dob,
            }),
        ]);

        const response = data.flat().sort((a, b) => (a.priority > b.priority ? -1 : 1));

        return response;
    }
}
