import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(config.get<number>("PORT"), () => {
    console.info(
      "[Endpoint] 🚀 Application running on: ",
      config.get<string>("BASE_URL")
    );
    console.info(
      "[GraphQL] 📖 GraphQL playground running on: ",
      config.get<string>("BASE_URL") +
        config.get<string>("GRAPHQL_PLAYGROUND_PATH")
    );
  });
}
bootstrap();
