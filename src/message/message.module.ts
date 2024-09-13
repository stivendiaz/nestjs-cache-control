import { Global, Module } from "@nestjs/common";
import { MesssageService } from "./message.service";
import { MesssageResolver } from "./message.resolver";
@Global()
@Module({
  imports: [
  ],
  controllers: [],
  providers: [MesssageService, MesssageResolver],
  exports: [MesssageService],
})
export class MesssageModule {}
