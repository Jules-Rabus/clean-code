import { ApiProperty } from '@nestjs/swagger';

export class signInDto {

    @ApiProperty({ example: 'example@example.com' })
    email: string;

    @ApiProperty({ example: 'P@ssw0rd' })
    password: string;
}