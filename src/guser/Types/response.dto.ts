import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class Error{
    @Field()
    field: string
    @Field()
    msg: string
}
@ObjectType()
export class RegiserResponse{
    @Field({nullable: true})
    access_token?: string
    @Field(() => Error, {nullable: true})
    error?: Error
}
@ObjectType()
export class FTRegisterResponse{
    @Field(() => RegiserResponse, {nullable:true})
    register?: RegiserResponse
    @Field(() => RegiserResponse, {nullable:true})
    login?: RegiserResponse
    @Field({nullable:true})
    fault_tolerance?:string
}