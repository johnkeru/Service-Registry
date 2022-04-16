import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import {verify} from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate{

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext()
        const {email, username, guserid} = this.validate(ctx.headers.authorization)
        ctx.email = email
        ctx.username = username
        ctx.guserid = guserid
        return true
    }

    validate(token:string){
        if(!token) return {email:'', username:''}
        const split = token.split(' ')
        if(split[0] !== 'Bearer')return {email:'',}
        try{
            const {email, username, guserid} = verify(split[1], process.env.AT) as {email: string,username:string,guserid:string}
            return {email, username, guserid}
        }catch{
            try{
                const {email, username, guserid} = verify(split[1], process.env.RT) as {email: string,username:string,guserid:string}
                return {email, username, guserid}
            }catch{
                return {email:'',}
            }
        }
    }
}