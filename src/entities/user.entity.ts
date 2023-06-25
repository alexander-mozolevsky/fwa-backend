import { IsEmail, IsNotEmpty } from 'class-validator';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

import { ENTITIES } from '@constants/entities';

import { RecommendationEntity } from './recommendation.entity';

@Entity({ name: ENTITIES.USERS })
export class UserEntity {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @IsNotEmpty()
    @IsEmail()
    @Column()
    username: string;

    @Column({ type: 'float' })
    weight: number;

    @Column({ type: 'float' })
    height: number;

    @Column({ type: 'int' })
    dob: number;

    @OneToMany(() => RecommendationEntity, (recommendation) => recommendation.user)
    @JoinColumn()
    recommendations: RecommendationEntity[];
}
