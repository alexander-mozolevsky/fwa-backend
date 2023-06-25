import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ServerError } from '@constants/errors';

import {
    GetHistoryRecommendationsProps,
    GetRecommendationsProps,
} from './recommendations.interface';
import { RecommendationsService } from './recommendations.service';

// POST /users - create USER
// GET /recommendations?username=user1 - get and save history recommendations
// GET /recommendations/history?username=user1 - my history recommendations

@Controller('recommendations')
export class RecommendationsController {
    constructor(private readonly recommendationsService: RecommendationsService) {}

    @Get()
    async getNewRecommendations(
        @Res() res: Response,
        @Query('username') username: GetRecommendationsProps['username'],
    ) {
        try {
            const recommendations = await this.recommendationsService.getNewRecommendations({
                username,
            });

            return res.status(200).json({ recommendations });
        } catch (error) {
            if (error instanceof ServerError) {
                return res
                    .status(error.statusCode || 400)
                    .json({ message: error.message || 'Bad request' });
            }
        }
    }

    @Get('history')
    async getHistoryRecommendations(
        @Res() res: Response,
        @Query('username') username: GetHistoryRecommendationsProps['username'],
    ) {
        try {
            const recommendations = await this.recommendationsService.getHistoryRecommendations({
                username,
            });

            return res.status(200).json({ recommendations });
        } catch (error) {
            if (error instanceof ServerError) {
                return res
                    .status(error.statusCode || 400)
                    .json({ message: error.message || 'Bad request' });
            }
        }
    }
}
