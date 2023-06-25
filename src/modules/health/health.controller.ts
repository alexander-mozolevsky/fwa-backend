import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('')
export class HealthController {
    @Get()
    @ApiOperation({ summary: 'Health check' })
    @ApiResponse({ status: 200, description: 'Health check object' })
    health(@Res() response): string {
        return response.status(200).json({ health: 100, version: 3 });
    }
}
