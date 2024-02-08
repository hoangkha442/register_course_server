import { ApiProperty } from "@nestjs/swagger"

export class bodySignup  {
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
    @ApiProperty()
    full_name: string
    role: string
    @ApiProperty()
    phone: string

    last_login_date: string
}