import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MesssageService {
  constructor() {}

  async findOne(message: string) {
      // Simulate an expensive operation
      await new Promise((resolve) => setTimeout(resolve, 10000));

      return {
        message: `this is a message that takes 10 seconds: ${message}`,
      };
  }
}
