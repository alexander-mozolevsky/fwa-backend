import { Body, Controller, Post, Put, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ServerError } from '@constants/errors';

import { MutationUsersBody } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put()
    async update(@Res() res, @Body() body: MutationUsersBody, @Query('username') username: string) {
        try {
            const response = await this.usersService.updateUser(username, body);

            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof ServerError) {
                return res
                    .status(error.statusCode || 400)
                    .json({ message: error.message || 'Bad request' });
            }
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, description: 'User object' })
    async create(@Res() res, @Body() body: MutationUsersBody) {
        try {
            const response = await this.usersService.createUser(body);

            return res.status(200).json(response);
        } catch (error) {
            if (error instanceof ServerError) {
                return res
                    .status(error.statusCode || 400)
                    .json({ message: error.message || 'Bad request' });
            }
        }
    }
}
