import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FTRefreshResponse{
    @Field(() => String, {nullable: true})
    refresh_token?:string
    @Field(() => String, {nullable: true})
    fault_tolerance?:string
}