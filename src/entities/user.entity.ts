import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ENTITIES } from '@constants/entities';

import { RecommendationEntity } from './recommendation.entity';

@Entity({ name: ENTITIES.USERS })
export class UserEntity {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        type: String,
        description: 'Defines username',
        example: 'user1',
    })
    @Index()
    @IsNotEmpty()
    @IsEmail()
    @Column()
    username: string;

    @ApiProperty({
        type: Number,
        description: 'Defines weight',
        example: 80,
    })
    @Column({ type: 'float' })
    weight: number;

    @ApiProperty({
        type: Number,
        description: 'Defines height',
        example: 180,
    })
    @Column({ type: 'float' })
    height: number;

    @ApiProperty({
        type: Number,
        description: 'Defines day of births',
        example: 1615876858,
    })
    @Column({ type: 'int' })
    dob: number;

    @OneToMany(() => RecommendationEntity, (recommendation) => recommendation.user)
    @JoinColumn()
    recommendations: RecommendationEntity[];
}
