import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ENTITIES } from '@constants/entities';

import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: ENTITIES.RECOMMENDATIONS })
export class RecommendationEntity {
    constructor(partial: Partial<RecommendationEntity>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        type: Number,
        description: 'Defines priority 0-1',
        example: 0.95,
    })
    @Column({ type: 'float' })
    priority: number;

    @ApiProperty({
        type: String,
        description: 'Defines recommendation',
        example: 'Drink water',
    })
    @Column({ type: 'varchar' })
    recommendation: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;
}