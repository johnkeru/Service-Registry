import { Inject } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { map, timeout } from "rxjs";
import { GUSER_SERVICE } from "../Types/injectabletoken";
import { RegiserInput } from "../Types/inputs.ts";
import { FTRegisterResponse,RegiserResponse } from "../Types/response.dto";

@Resolver()
export class RegisterResolver {
    constructor(@Inject(GUSER_SERVICE)private guser_service: ClientProxy) {}
    
    @Mutation(() => FTRegisterResponse, {nullable: true})
    async register(@Args('input')input:RegiserInput):Promise<FTRegisterResponse>{
        try{
            const register_response = await this.guser_service.send('register', input)
                .pipe(timeout(5000))
                .pipe(map((data:RegiserResponse) => data))
                .toPromise()
            return {
                register: register_response
            }
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
}