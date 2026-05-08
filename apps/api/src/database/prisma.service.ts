import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
  async healthCheck(): Promise<boolean> {
    return true;
  }
}
