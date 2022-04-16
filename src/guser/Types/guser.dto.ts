import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GuserDTO {
    @Field()
    id: string 
    @Field()
    email: string
    @Field()
    username: string
    @Field({defaultValue: false})
    active?: boolean
    @Field({nullable: true})
    image?: string
    @Field()
    created_at: Date
    @Field()
    updated_at: Date
}
@ObjectType()
export class FTMeResponse{
    @Field(() => GuserDTO, {nullable:true})
    guser?: GuserDTO
    @Field({nullable:true})
    fault_tolerance?:string
}
@ObjectType()
export class FTGusersResponse{
    @Field(() => [GuserDTO], {nullable:true})
    gusers?: GuserDTO[]
    @Field({nullable:true})
    fault_tolerance?:string
}
