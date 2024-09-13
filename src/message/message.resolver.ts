import { Resolver, Args, Query, Int } from "@nestjs/graphql";
import { CacheControl } from "src/shared/decorators/cache-control.decorator";
import { MesssageService } from "./message.service";
import { MesssageGQLSchema } from "./message.gqlschema";

@Resolver(() => MesssageGQLSchema)
export class MesssageResolver {
  constructor(private readonly appService: MesssageService) {}

  @CacheControl({ maxAge: 100 })
  @Query(() => MesssageGQLSchema)
  async getMesssage(
    @Args("message", { type: () => String }) message: string,
  ) {
    const startTime = performance.now();
    const result = await this.appService.findOne(message)
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} milliseconds`);
    return result;
  }
}
