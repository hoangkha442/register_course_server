import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    product_name: string;
    @ApiProperty()
    product_picture: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity_in_stock: number;
    @ApiProperty()
    category_id: number;
    @ApiProperty()
    supplier_id: number
}
