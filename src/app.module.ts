import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AddComment } from './comment/resolvers/AddComment';
import { GetComments } from './comment/resolvers/GetComments';
import { ChangeProfilePicture } from './guser/resolvers/changedp.resolver';
import { GuserResolver } from './guser/resolvers/gusers.resolver';
import { LoginResolver } from './guser/resolvers/login.resolver';
import { LogoutResolver } from './guser/resolvers/logout.resolver';
import { MeResolver } from './guser/resolvers/me.resolver';
import { RefreshResolver } from './guser/resolvers/refresh.resolver';
import { RegisterResolver } from './guser/resolvers/register.resolver';
import { COMMENT_SERVICE, GUSER_SERVICE, PRODUCT_SERVICE } from './guser/Types/injectabletoken';
import { CreateResolver } from './product/product_resolvers/create.resolver';
import { DeleteResolver } from './product/product_resolvers/delete.resolver';
import { FindByIdResolver } from './product/product_resolvers/findbyid.resolver';
import { ProductResolver } from './product/product_resolvers/product.resolver';
import { UpdateResolver } from './product/product_resolvers/update.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ClientsModule.register([
      { 
        name: GUSER_SERVICE, 
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
          queue: 'guser_queue',
          queueOptions: {
            durable: false
          },
        },
      },
      { 
        name: PRODUCT_SERVICE, 
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
          queue: 'product_queue',
          queueOptions: {
            durable: false
          },
        },
      },
      {
        name: COMMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
          queue: 'comment_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ]),
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
