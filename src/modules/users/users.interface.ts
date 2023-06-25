import { ApiProperty } from '@nestjs/swagger';

export class MutationUsersBody {
    @ApiProperty({
        type: String,
        description: 'Defines username',
        required: true,
        example: 'user1',
    })
    username: string;

    @ApiProperty({
        type: Number,
        description: 'Defines user height',
        required: true,
        example: 180,
    })
    height: number;

    @ApiProperty({
        type: Number,
        description: 'Defines user weight',
        required: true,
        example: 100,
    })
    weight: number;

    @ApiProperty({
        type: Number,
        description: 'Defines user date of birth',
        required: true,
        example: 1615876858,
    })
    dob: number;
}

export interface RecommendationProps {
    priority: number;
    recommendation: string;
}
