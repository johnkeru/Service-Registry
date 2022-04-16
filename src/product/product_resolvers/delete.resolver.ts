import { Injectable, Inject } from "@nestjs/common";
import { Mutation, Args } from "@nestjs/graphql";
import { ClientProxy } from "@nestjs/microservices";
import { PRODUCT_SERVICE } from "src/guser/Types/injectabletoken";

@Injectable()
export class DeleteResolver {
    constructor(@Inject(PRODUCT_SERVICE) private readonly productService: ClientProxy) {}

    @Mutation(() => String)
    async delete(@Args('_id') _id: string): Promise<string> {
        return await this.productService.send<string, string>('delete', _id).toPromise();
    }
 
}