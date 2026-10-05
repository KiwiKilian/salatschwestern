import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter extends BaseExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    super.catch(new NotFoundException(), host);
  }
}
