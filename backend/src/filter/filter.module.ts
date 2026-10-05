import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { EntityNotFoundFilter } from '@/filter/entity-not-found.filter';

@Module({
  providers: [{ provide: APP_FILTER, useClass: EntityNotFoundFilter }],
})
export class FilterModule {}
