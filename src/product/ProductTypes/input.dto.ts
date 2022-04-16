import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductInput{
    @Field({nullable: true})
    _id?: string;
    @Field()
    name: string;
    @Field()
    category: string;
    @Field({nullable: true})
    body?:string
    @Field({nullable: true})
    price?: number;
    @Field({nullable: true})
    description?: string
    @Field({nullable: true})
    guserImage?: string
    @Field({nullable: true})
    image?: string
    @Field({nullable: true})
    backgroundColor?: string
    @Field({nullable: true})
    code?: string
    @Field({nullable: true})
    isPrivate?: boolean
}

@InputType()
export class ProductsInput{
    @Field({nullable: true})
    cursor?: string
    @Field()
    limit: number
    @Field({nullable: true})
    category?: string
    @Field({nullable: true})
    search?: string
    @Field({nullable: true})
    guserid?: string
}