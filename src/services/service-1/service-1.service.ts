import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map, switchMap, toArray } from 'rxjs';

import { RecommendationProps } from '@modules/recommendations/recommendations.interface';

import { ServerError } from '@constants/errors';
import { SERVICE_1_URL } from '@constants/services';

import {
    Service1RecommendationData,
    Service1RecommendationResponse,
    Service1RecommendationsProps,
} from './service-1.interface';

@Injectable()
export class Service1Service {
    private readonly token = 'service1-dev';

    private readonly logger = new Logger(Service1Service.name);

    constructor(private readonly httpService: HttpService) {}

    async getRecommendations(params: Service1RecommendationsProps): Promise<RecommendationProps[]> {
        const { height, weight } = params;

        const body = {
            height,
            weight,
            token: this.token,
        };

        try {
            return await firstValueFrom(
                this.httpService.post<Service1RecommendationResponse>(SERVICE_1_URL, body).pipe(
                    switchMap((response) => {
                        if (response.status <= 400 && response.data.statusCode <= 400) {
                            const data: Service1RecommendationData[] = JSON.parse(
                                response.data.body,
                            );

                            return data;
                        }

                        throw new ServerError(response.data.statusCode, response.data.body);
                    }),
                    catchError((error) => {
                        if (error instanceof ServerError) {
                            throw error;
                        }

                        throw new ServerError(
                            error.response.statusCode,
                            error.response.data.detail,
                        );
                    }),
                    map((data) => ({
                        priority: data.confidence,
                        recommendation: data.recommendation,
                    })),
                    toArray(),
                ),
            );
        } catch (error) {
            this.logger.error(`[${Service1Service.name}]: Bad request for ${SERVICE_1_URL}`);
            this.logger.error(`Body: ${JSON.stringify(body)}`);
            this.logger.error(`Response: ${JSON.stringify(error.message)}`);

            return [];
        }
    }
}
