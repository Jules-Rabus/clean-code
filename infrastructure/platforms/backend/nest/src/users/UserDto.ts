import User from '@app/domain/entities/User';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements Partial<User> {
    
    @ApiProperty({ example: '189b5715-9853-4271-af3c-f154ec5241d8' })
    identifier: string;

    @ApiProperty({ example: 'example@example.com' })
    email: string;

    @ApiProperty({ example: 'John' })
    firstName: string;

    @ApiProperty({ example: 'Doe' })
    lastName: string;

    @ApiProperty({ example: 'P@ssw0rd' })
    password: string;

    @ApiProperty({ type: String, isArray: true, example: ['user'] })
    roles: string[];

    @ApiProperty({ example: true })
    isActive: boolean;

    @ApiProperty({ example: true })
    isEmailVerified: boolean;
}