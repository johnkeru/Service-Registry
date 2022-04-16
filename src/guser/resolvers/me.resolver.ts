import { PRODUCT_SERVICE } from './../Types/injectabletoken';
import { Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { map, timeout,  } from "rxjs";
import { AuthGuard } from "../guard/currentuser.guard";
import { FTMeResponse, GuserDTO } from "../Types/guser.dto";
import { GUSER_SERVICE } from "../Types/injectabletoken";

@Resolver()
export class MeResolver {
    constructor(
        @Inject(GUSER_SERVICE)private guser_service:ClientProxy,
        @Inject(PRODUCT_SERVICE)private product_service:ClientProxy
    ){}
    
    @UseGuards(AuthGuard)
    @Query(() => FTMeResponse)
    async me(@Context('email')email:string):Promise<FTMeResponse>{
        try{
            this.product_service.emit('guser-online', email);
            const guser = await this.guser_service
                .send('me', !email ? "" : email)
                .pipe(timeout(10000))
                .pipe(map((res:GuserDTO|null) => {
                    if(!res)return null
                    res.created_at = new Date(res.created_at)
                    res.updated_at = new Date(res.updated_at)
                    return res
                }))
                .toPromise();
            return {guser}
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }

    @Query(() => FTMeResponse)
    async findGuserById(@Args('id', {defaultValue: ""})id:string):Promise<FTMeResponse>{
        try{
            if(!id)return {guser: null}
            const guser = await this.guser_service
                .send('guserid', id)
                .pipe(timeout(10000))
                .pipe(map((res:GuserDTO|null) => {
                    if(!res)return null
                    res.created_at = new Date(res.created_at)
                    res.updated_at = new Date(res.updated_at)
                    return res
                }))
                .toPromise();
            return {guser}
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }

}