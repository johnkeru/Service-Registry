import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductDto {
    @Field()
    email: string;

    @Field()
    guserid: string;
    
    @Field()
    username: string;
    
    @Field({defaultValue: ''})
    body?:string
    
    @Field({nullable: false})
    isUserOnline?: boolean;
    
    @Field({defaultValue: 0})
    commentsLength?: number;
    
    @Field({defaultValue: ''})
    backgroundColor: string
    
    @Field({defaultValue: ''})
    guserImage?: string
    
    @Field({defaultValue: ''})
    code?: string
    
    @Field({ defaultValue: false })
    isPrivate: boolean
    
    @Field()
    name: string;
    
    @Field({defaultValue: 0})
    price: number;
    
    @Field({defaultValue: ''})
    description: string;
    
    @Field({defaultValue: ''})
    image: string;
    
    @Field({defaultValue: ''})
    category: string;
    
    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;
    
    @Field()
    _id: string
    
    __v: number;
}
