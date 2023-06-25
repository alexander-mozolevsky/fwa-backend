import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { ServerError } from '@constants/errors';

import { GetRecommendationsProps } from './recommendations.interface';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
    constructor(private readonly recommendationsService: RecommendationsService) {}

    @Get()
    async getRecommendations(
        @Res() res: Response,
        @Query('height') height: GetRecommendationsProps['height'],
        @Query('weight') weight: GetRecommendationsProps['weight'],
        @Query('dob') dob: GetRecommendationsProps['dob'],
    ) {
        try {
            const recommendations = await this.recommendationsService.getRecommendations({
                height,
                weight,
                dob,
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
