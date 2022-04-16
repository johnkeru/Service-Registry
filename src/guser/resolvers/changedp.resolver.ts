import { GUSER_SERVICE, PRODUCT_SERVICE, COMMENT_SERVICE } from './../Types/injectabletoken';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Context, Args, Field, ObjectType } from "@nestjs/graphql";
import { AuthGuard } from "../guard/currentuser.guard";
import { timeout } from 'rxjs';

@ObjectType()
class FTChangeDPRespo{
    @Field({nullable: true})
    image?: string
    @Field({nullable: true})
    fault_tolerance?: string
}

@Resolver()
export class ChangeProfilePicture{
    constructor(
        @Inject(GUSER_SERVICE) private guserService: ClientProxy, 
        @Inject(PRODUCT_SERVICE)private productSErvice:ClientProxy,
        @Inject(COMMENT_SERVICE)private commentService:ClientProxy
    ){}
    
    @UseGuards(AuthGuard)
    @Mutation(() => FTChangeDPRespo, {nullable: true})
    async changedp(@Context('guserid')guserid:string, @Context('email')email:string, @Args('image')image:string):Promise<FTChangeDPRespo>{
        let req = {img: image, guserid}
        let comreq = {img: image, email}
        try{
            this.productSErvice.emit('updateImage', req)
            this.commentService.emit('commentImageChange', comreq)
            const image = await this.guserService.send<string, {img:string,guserid:string}>
                ('changeImage', req)
                .pipe(timeout(10000))
                .toPromise()
            return {image}
        }catch{
            return {fault_tolerance: "Something went wrong. Please try again later."}
        }
    }
}