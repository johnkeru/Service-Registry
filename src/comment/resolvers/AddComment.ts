import { PRODUCT_SERVICE } from './../../guser/Types/injectabletoken';
import { Inject, Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation } from "@nestjs/graphql";
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from "rxjs";
import { AuthGuard } from "src/guser/guard/currentuser.guard";
import { COMMENT_SERVICE } from "src/guser/Types/injectabletoken";
import { AddCommentInput, CommentDTO, FTAddCommentResponse } from "../dto/comment.dto";


@Injectable()
export class AddComment{
    
    constructor(
        @Inject(COMMENT_SERVICE)private commentService: ClientProxy,
        @Inject(PRODUCT_SERVICE)private productService: ClientProxy
    ){}

    @UseGuards(AuthGuard)
    @Mutation(() => FTAddCommentResponse)
    async addComment(
        @Context('email')email:string,
        @Context('username')username:string,
        @Args('input'){...input}: AddCommentInput):Promise<FTAddCommentResponse>
        {
            const {productId} = input
            const body = Object.assign({email, username}, input);
            if(!email || !username) return {comment: null, fault_tolerance: 'no_user'}
            try{
                this.productService.emit('addComment', productId)
                const comment = await this.commentService.send<CommentDTO, AddCommentInput>
                    ('commentAdd', body)
                    .pipe(timeout(10000))
                    .pipe(map(data => {
                        if(!data) return null
                        data.createdAt = new Date(data.createdAt)
                        data.updatedAt = new Date(data.updatedAt)
                        return data
                    }))
                    .toPromise()
                return {comment}
            }catch{
                return {fault_tolerance: 'Something went wrong. Please try again later.'}
            }
        }
}