import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AddComment } from './comment/resolvers/AddComment';
import { GetComments } from './comment/resolvers/GetComments';
import { isProdMicroServices } from './environment';
import { ChangeProfilePicture } from './guser/resolvers/changedp.resolver';
import { GuserResolver } from './guser/resolvers/gusers.resolver';
import { LoginResolver } from './guser/resolvers/login.resolver';
import { LogoutResolver } from './guser/resolvers/logout.resolver';
import { MeResolver } from './guser/resolvers/me.resolver';
import { RefreshResolver } from './guser/resolvers/refresh.resolver';
import { RegisterResolver } from './guser/resolvers/register.resolver';
import { CreateResolver } from './product/product_resolvers/create.resolver';
import { DeleteResolver } from './product/product_resolvers/delete.resolver';
import { FindByIdResolver } from './product/product_resolvers/findbyid.resolver';
import { ProductResolver } from './product/product_resolvers/product.resolver';
import { UpdateResolver } from './product/product_resolvers/update.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
    }),
    isProdMicroServices
  ],
  providers: [
    GuserResolver,
    RegisterResolver,
    MeResolver,
    RefreshResolver,
    LoginResolver,
    ProductResolver,
    DeleteResolver,
    CreateResolver,
    LogoutResolver,
    AddComment,
    GetComments,
    UpdateResolver,
    FindByIdResolver,
    ChangeProfilePicture,
  ],
})
export class AppModule {}
