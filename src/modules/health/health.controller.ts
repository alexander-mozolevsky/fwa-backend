import { Controller, Get, Res } from '@nestjs/common';

@Controller('')
export class HealthController {
    @Get()
    health(@Res() response): string {
        return response.status(200).json({ health: 100 });
    }
}
