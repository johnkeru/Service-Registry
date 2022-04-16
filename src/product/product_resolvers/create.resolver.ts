import { Inject, Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { map, timeout } from "rxjs";
import { AuthGuard } from "src/guser/guard/currentuser.guard";
import { PRODUCT_SERVICE } from "src/guser/Types/injectabletoken";
import { ProductInput } from "../ProductTypes/input.dto";
import { FTProductResponse, ProductResponse } from "../ProductTypes/productresponse";

@Injectable()
export class CreateResolver {
    constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy) {}

    @UseGuards(AuthGuard)
    @Mutation(() => FTProductResponse, {nullable: true})
    async create(
        @Context('email')email: string, 
        @Context('username')username:string,
        @Context('guserid')guserid:string,
        @Args('input'){...anything}: ProductInput): Promise<FTProductResponse> {
        if(!email) return {product:null}
        if(!username) return {product:null}
        const prod = Object.assign({email, username, guserid}, anything)
        try{
            const product = await this.productService.send<ProductResponse, ProductInput>
                ('create',prod)
                .pipe(timeout(5000))
                .pipe(map(data => {
                    if(data.error)return {error: data.error, product: null}
                    data.product.createdAt = new Date(data.product.createdAt);
                    data.product.updatedAt = new Date(data.product.updatedAt);
                    data.product.guserImage = data.product.guserImage ? data.product.guserImage : "" 
                    return data
                }))
                .toPromise();
            return {product};
        }catch{
            return {
                fault_tolerence: "Error in creating product"
            }
        }
    }
}