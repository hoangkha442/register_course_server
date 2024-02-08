import { ApiProperty } from "@nestjs/swagger"

export class bodyLogin {
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}