import { ClientsModule, Transport } from "@nestjs/microservices";
import { GUSER_SERVICE, PRODUCT_SERVICE, COMMENT_SERVICE } from "./guser/Types/injectabletoken";

export const isProdMicroServices = process.env.PROD ? 
    ClientsModule.register([
      { 
        name: GUSER_SERVICE, 
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL || 'amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
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
          urls: [process.env.RABBIT_MQ_URL || 'amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
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
          urls: [process.env.RABBIT_MQ_URL || 'amqps://eoayjqkg:pHq77ZZcEV1f08J67xO1HHNGfSGTcCbB@shrimp.rmq.cloudamqp.com/eoayjqkg'],
          queue: 'comment_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ])
     : 
    ClientsModule.register([
        {
            name: GUSER_SERVICE,
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 7000
            }
        },
        {
            name: PRODUCT_SERVICE,
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 8000
            }
        },
        {
            name: COMMENT_SERVICE,
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 9000
            }
        },
    ])