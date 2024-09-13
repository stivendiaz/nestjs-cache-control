import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { GraphQLModule, Int } from "@nestjs/graphql";
import * as redisStore from "cache-manager-redis-store";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import {
  DirectiveLocation,
  GraphQLBoolean,
  GraphQLDirective,
  GraphQLEnumType,
} from "graphql";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { MesssageModule } from "./message/message.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      plugins: [ApolloServerPluginCacheControl(), responseCachePlugin()],
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "cacheControl",
            args: {
              maxAge: { type: Int },
              scope: {
                type: new GraphQLEnumType({
                  name: "CacheControlScope",
                  values: {
                    PUBLIC: {},
                    PRIVATE: {},
                  },
                }),
              },
              inheritMaxAge: { type: GraphQLBoolean },
            },
            locations: [
              DirectiveLocation.FIELD_DEFINITION,
              DirectiveLocation.OBJECT,
              DirectiveLocation.INTERFACE,
              DirectiveLocation.UNION,
              DirectiveLocation.QUERY,
            ],
          }),
        ],
      },
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ttl: config.get("REDIS_DEFAULT_TTL"),
        isGlobal: true,
        store: redisStore,
        host: config.get("REDIS_HOST"),
        port: config.get("REDIS_POST"),
      }),
      inject: [ConfigService],
    }),
    MesssageModule,
  ],
})
export class AppModule {}
