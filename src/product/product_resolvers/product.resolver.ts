import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/guser/Types/injectabletoken';
import { ProductsInput } from '../ProductTypes/input.dto';
import { FTProductResponseList } from '../ProductTypes/productresponse';

@Resolver()
export class ProductResolver {
    constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy) {}

    @Query(() => FTProductResponseList,{nullable: true})
    async products(@Args('input') input: ProductsInput
    ):Promise<FTProductResponseList> {
        try{
            const products = await this.productService.send<FTProductResponseList, ProductsInput>
                ('products', input)
                .pipe(timeout(10000))
                .pipe(map(data => {
                    data.products.map(product => {
                        if(!product) return null;
                        product.createdAt = new Date(product.createdAt);
                        product.updatedAt = new Date(product.updatedAt);
                        product.guserImage = product.guserImage ? product.guserImage : "" 
                    })
                    return data
                }))
                .toPromise();
            return products;
        }catch{
            return {
                fault_tolerence: "Error in getting products. Please try again later."
            }
        }
    }
}
