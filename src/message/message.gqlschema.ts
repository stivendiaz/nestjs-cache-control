import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MesssageGQLSchema {
  @Field(() => String, { nullable: true })
  message: string;
}
