import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom, map, switchMap, toArray } from 'rxjs';

import { RecommendationProps } from '@modules/recommendations/recommendations.interface';

import { ServerError } from '@constants/errors';
import { SERVICE_2_URL } from '@constants/services';

import {
    Service2RecommendationData,
    Service2RecommendationResponse,
    Service2RecommendationsProps,
} from './service-2.interface';

@Injectable()
export class Service2Service {
    private readonly token = '123';

    private readonly logger = new Logger(Service2Service.name);

    constructor(private readonly httpService: HttpService) {}

    async getRecommendations(params: Service2RecommendationsProps): Promise<RecommendationProps[]> {
        const { height, weight, dob } = params;

        const body = {
            measurements: {
                mass: weight,
                height,
            },
            birth_date: dob,
            session_token: this.token,
        };

        try {
            return await firstValueFrom(
                this.httpService.post<Service2RecommendationResponse>(SERVICE_2_URL, body).pipe(
                    switchMap((response) => {
                        if (response.status <= 400 && response.data.statusCode <= 400) {
                            const data: Service2RecommendationData[] = JSON.parse(
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
                        priority: Number(data.priority) / 1000,
                        recommendation: data.details,
                    })),
                    toArray(),
                ),
            );
        } catch (error) {
            this.logger.error(`[${Service2Service.name}]: Bad request for ${SERVICE_2_URL}`);
            this.logger.error(`Body: ${JSON.stringify(body)}`);
            this.logger.error(`Response: ${JSON.stringify(error.message)}`);

            return [];
        }
    }
}
