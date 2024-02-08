import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierDto {
    @ApiProperty()
    supplier_name: string;
    @ApiProperty()
    contact_name: string;
    @ApiProperty()
    contact_email: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    phone: string;
}
