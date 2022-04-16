import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { map, timeout } from 'rxjs';
import { FTGusersResponse, GuserDTO } from '../Types/guser.dto';
import { GUSER_SERVICE } from '../Types/injectabletoken';

@Resolver()
export class GuserResolver {
    constructor(@Inject(GUSER_SERVICE)private guser_service:ClientProxy){}

  @Query(() => FTGusersResponse, {nullable: true})
    async findAllGuser():Promise<FTGusersResponse>{
        try{
            const gusers = await this.guser_service.send('gusers', 'find it!!!')
                .pipe(timeout(5000))
                .pipe(map((data:GuserDTO[]) => {
                    data.map(d => {
                        d.created_at = new Date(d.created_at)
                        d.updated_at = new Date(d.updated_at)
                    })
                    return data
                }))
                .toPromise()
            return {gusers}
        }
        catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
}
