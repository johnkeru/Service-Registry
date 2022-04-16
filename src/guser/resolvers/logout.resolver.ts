import { Inject, UseGuards } from "@nestjs/common";
import { Context, Mutation, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { timeout } from "rxjs";
import { AuthGuard } from "../guard/currentuser.guard";
import { GUSER_SERVICE, PRODUCT_SERVICE } from "../Types/injectabletoken";

@Resolver()
export class LogoutResolver {
    constructor(
        @Inject(GUSER_SERVICE)private guser_service:ClientProxy,
        @Inject(PRODUCT_SERVICE)private product_service:ClientProxy
        ){}
    
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    async logout(@Context('email')email:string):Promise<string>{
        try{
            this.product_service.emit('guser-offline', email);
            const res = await this.guser_service
                .send('logout', email)
                .pipe(timeout(5000))
                .pipe(data => !data ? null : data)
                .toPromise();
            return !res ? 'try again.' : res
        }catch{
            return "Something went wrong. Please try again later."
        }
    }
}