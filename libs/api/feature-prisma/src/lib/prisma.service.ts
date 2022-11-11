import {Inject, Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import {DB_CONFIG, dbConfig} from "@youtube-clone/api/utils-config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(dbConfig.KEY) private databaseConfig: DB_CONFIG) {
    super({
      datasources: {
        db: {
          url: databaseConfig.uri
        }
      }
    });

    console.log(databaseConfig)
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
