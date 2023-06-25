import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { RecommendationEntity } from 'src/entities/recommendation.entity';

import { ServerError } from '@constants/errors';

import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
    constructor(private readonly recommendationsService: RecommendationsService) {}

    @Get()
    @ApiOperation({ summary: 'Generate new recommendations' })
    @ApiResponse({
        status: 200,
        description: 'Generate new recommendations for user',
        type: RecommendationEntity,
        isArray: true,
    })
    async getNewRecommendations(@Res() res: Response, @Query('username') username: string) {
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
    @ApiOperation({ summary: 'History recommendations' })
    @ApiResponse({
        status: 200,
        description: 'Get users saved recommendations history',
        type: RecommendationEntity,
        isArray: true,
    })
    async getHistoryRecommendations(@Res() res: Response, @Query('username') username: string) {
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
