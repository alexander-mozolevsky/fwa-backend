import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { ServerError } from '@constants/errors';

import { MutationUsersBody } from './users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersTable: Repository<UserEntity>,
    ) {}

    public async findUser(username: string): Promise<UserEntity> {
        return await this.usersTable.findOne({ where: { username } });
    }

    public async throwIfUserDoesNotExist(username: string): Promise<void> {
        const user = await this.findUser(username);

        if (!user) {
            throw new ServerError(HttpStatus.CONFLICT, 'User does not exist');
        }
    }

    private async throwIfUserExist(username: string): Promise<UserEntity> {
        const user = await this.findUser(username);

        if (user) {
            throw new ServerError(HttpStatus.CONFLICT, 'User already exists');
        }

        return user;
    }

    async createUser(body: MutationUsersBody) {
        await this.throwIfUserExist(body.username);

        const user = this.usersTable.save(
            new UserEntity({
                username: body.username,
                weight: body.weight,
                height: body.height,
                dob: body.dob,
            }),
        );

        return user;
    }

    async updateUser(username: string, body: MutationUsersBody) {
        if (username !== body.username) {
            // Check if the new username exists or not
            await this.throwIfUserExist(body.username);
        }

        const user = new UserEntity({
            username: body.username,
            weight: body.weight,
            height: body.height,
            dob: body.dob,
        });

        await this.usersTable.update({ username }, user);

        return user;
    }
}
