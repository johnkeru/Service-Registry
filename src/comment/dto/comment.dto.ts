import { Field, InputType, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class CommentDTO {
    @Field()
    id: number;
    @Field()
    username: string
    @Field()
    email: string
    @Field()
    productId: string
    @Field({nullable: true})
    image?: string
    @Field()
    comment:string
    @Field()
    createdAt: Date
    @Field()
    updatedAt: Date
}

@InputType()
export class GetCommentsInput{
    @Field()
    limit: number
    @Field({nullable: true})
    cursor?: number
    @Field()
    productId: string
}

@ObjectType()
export class GetCommentsResponse{
    @Field()
    hasMore: boolean
    @Field(() => [CommentDTO])
    comments: CommentDTO[]
}

@ObjectType()
export class FTGetCommentsResponse{
    @Field({nullable:true})
    fault_tolerance?: string
    @Field(() => GetCommentsResponse, {nullable:true})
    comments?: GetCommentsResponse
}


@InputType()
export class AddCommentInput{
    @Field({nullable:true})
    username?:string
    @Field({nullable:true})
    email?: string
    @Field({nullable: true})
    image?: string
    @Field()
    productId: string
    @Field()
    comment:string
}

@ObjectType()
export class FTAddCommentResponse{
    @Field(() => CommentDTO, {nullable: true})
    comment?: CommentDTO
    @Field({nullable: true})
    fault_tolerance?: string
}