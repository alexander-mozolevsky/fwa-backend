import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ENTITIES } from '@constants/entities';

import { UserEntity } from './user.entity';

@Entity({ name: ENTITIES.RECOMMENDATIONS })
export class RecommendationEntity {
    constructor(partial: Partial<RecommendationEntity>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float' })
    priority: number;

    @Column({ type: 'varchar' })
    recommendation: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;
}
