import { ProductInput } from './../ProductTypes/input.dto';
import { FTProductResponse, ProductResponse } from './../ProductTypes/productresponse';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from './../../guser/Types/injectabletoken';
import { Inject, Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation } from '@nestjs/graphql';
import { AuthGuard } from 'src/guser/guard/currentuser.guard';
import { map, timeout } from 'rxjs';

@Injectable()
export class UpdateResolver{
    constructor(@Inject(PRODUCT_SERVICE)private productService: ClientProxy){}
    
    @UseGuards(AuthGuard)
    @Mutation(() => FTProductResponse, {nullable: true})
    async update(
        @Context('email')email:string,
        @Context('username')username:string,
        @Args('input'){...input}:ProductInput):Promise<FTProductResponse>{
            
            if(!email || !username) return {fault_tolerence: 'Unauthorized'}
            const payload = Object.assign({email, username}, input)
            try{
                const product = await this.productService.send<ProductResponse, ProductInput>
                ('update', payload)
                    .pipe(timeout(5000))
                    .pipe(map(data => {
                        if(data.error)return {error: data.error, product: null}
                        data.product.createdAt = new Date(data.product.createdAt);
                        data.product.updatedAt = new Date(data.product.updatedAt);
                        data.product.guserImage = data.product.guserImage ? data.product.guserImage : "" 
                        return data
                    })).toPromise()
                return {product}
            }catch{
                return {fault_tolerence: 'Something went wrong. Please try again later.'}
            }
    }
}