import { Inject, UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { map, timeout } from "rxjs";
import { AuthGuard } from "../guard/currentuser.guard";
import { GUSER_SERVICE } from "../Types/injectabletoken";
import { FTRefreshResponse } from "../Types/refresh.dto";

@Resolver()
export class RefreshResolver {
    constructor(@Inject(GUSER_SERVICE)private guser_service:ClientProxy){}

    @UseGuards(AuthGuard)
    @Query(() => FTRefreshResponse, {nullable: true})
    async refresh(@Context('email')email:string):Promise<FTRefreshResponse>{
        if(!email) return null
        try{
            const refresh_token = await this.guser_service.send('refresh', email)
            .pipe(timeout(5000))
            .pipe(map((data:string) => data ? data : null))
            .toPromise()
            return {
                refresh_token
            }
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
}