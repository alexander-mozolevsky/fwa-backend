import { Body, Controller, Post, Put, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UserEntity } from 'src/entities/user.entity';

import { ServerError } from '@constants/errors';

import { MutationUsersBody } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put()
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User object', type: UserEntity })
    async update(
        @Res() res: Response,
        @Body() body: MutationUsersBody,
        @Query('username') username: string,
    ) {
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
    @ApiResponse({ status: 200, description: 'User object', type: UserEntity })
    async create(@Res() res: Response, @Body() body: MutationUsersBody) {
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
