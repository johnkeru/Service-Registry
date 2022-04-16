import { Field, ObjectType } from "@nestjs/graphql";
import { ProductDto } from "./product.dto";

@ObjectType()
class ProductError{
    @Field()
    field: string
    @Field()
    msg: string
}


@ObjectType()
export class FTOnlyOneProductResponse{
    @Field(() => ProductDto, {nullable: true})
    product?: ProductDto
    @Field(() => String, {nullable: true})
    fault_tolerence?: string
}

@ObjectType()
export class ProductResponse {
    @Field(() => ProductDto, {nullable: true})
    product?: ProductDto
    @Field(() => ProductError, {nullable: true})
    error?: ProductError;
}

@ObjectType()
export class FTProductResponse{
    @Field(() => ProductResponse, {nullable: true})
    product?: ProductResponse;
    @Field({nullable: true})
    fault_tolerence?: string;
}

@ObjectType()
export class FTProductResponseList {
    @Field(() => [ProductDto], {nullable: true})
    products?: ProductDto[]
    @Field({nullable: true})
    hasMore?: boolean
    @Field({nullable: true})
    fault_tolerence?: string;
}