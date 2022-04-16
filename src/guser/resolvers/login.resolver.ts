import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { map, timeout } from "rxjs";
import { GUSER_SERVICE } from "../Types/injectabletoken";
import { LoginInput } from "../Types/inputs.ts";
import { FTRegisterResponse, RegiserResponse } from "../Types/response.dto";

//experimentalDecorators

@Resolver()
export class LoginResolver {
    constructor(@Inject(GUSER_SERVICE)private guser_service:ClientProxy){}

    @Mutation(() => FTRegisterResponse, {nullable: true})
    async login(@Args('input')input:LoginInput):Promise<FTRegisterResponse>{
        try{
            const login_response = await this.guser_service.send('login', input)
                .pipe(timeout(5000))
                .pipe(map((data:RegiserResponse) => data))
                .toPromise()
            return {login: login_response}
        }catch(e){
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
        
}