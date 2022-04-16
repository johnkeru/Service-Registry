import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RegiserInput {
    @Field()
    email: string
    @Field()
    username: string
    @Field()
    password: string
}


@InputType()
export class LoginInput {
    @Field()
    email: string
    @Field()
    password: string
}