import { Inject, Injectable } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs';
import { ProductDto } from '../ProductTypes/product.dto';
import { PRODUCT_SERVICE } from './../../guser/Types/injectabletoken';
import { FTOnlyOneProductResponse } from './../ProductTypes/productresponse';

@Injectable()
export class FindByIdResolver {
    constructor(@Inject(PRODUCT_SERVICE)private productService:ClientProxy) {}

    @Query(() => FTOnlyOneProductResponse)
    async findById(@Args("_id")_id: string): Promise<FTOnlyOneProductResponse> {
        try {
            if(!_id)return{fault_tolerence: "No id provided"}
            const product = await this.productService.send<ProductDto, string>
                ('product', _id)
                .pipe(timeout(5000))
                .pipe(map(data => {
                    if(!data) return null
                    data.createdAt = new Date(data.createdAt);
                    data.updatedAt = new Date(data.updatedAt);
                    data.guserImage = data.guserImage ? data.guserImage : "" 
                    return data
                }))
                .toPromise()
            return {product}
        } catch {
            return {fault_tolerence: "Something went wrong. Please try again later."}
        }
    }
}