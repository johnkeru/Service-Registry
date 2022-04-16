import { Inject, Injectable } from "@nestjs/common";
import { Args, Query } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { map, timeout } from "rxjs";
import { COMMENT_SERVICE } from "src/guser/Types/injectabletoken";
import { FTGetCommentsResponse, GetCommentsInput } from "../dto/comment.dto";
import { GetCommentsResponse } from './../dto/comment.dto';


@Injectable()
export class GetComments {
    constructor(@Inject(COMMENT_SERVICE)private commentService:ClientProxy){}

    @Query(() => FTGetCommentsResponse)
    async getComments(@Args('input')input:GetCommentsInput):Promise<FTGetCommentsResponse>{
        try{
            const comments = await this.commentService.send<GetCommentsResponse, GetCommentsInput>('comments', input)
                .pipe(timeout(10000))
                .pipe(map(data => {
                    if(!data) return null
                    data.comments.map(c => {
                        c.createdAt = new Date(c.createdAt)
                        c.updatedAt = new Date(c.updatedAt)
                    })
                    return data
                }))
                .toPromise()
            return {comments}
        }catch {
            return {fault_tolerance: 'Something went wrong. Please try again later.'}
        }
    }

    @Query(() => String)
    sayHi(){
        return 'Hello'
    }

}