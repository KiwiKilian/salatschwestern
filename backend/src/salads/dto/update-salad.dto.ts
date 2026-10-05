import { PartialType } from '@nestjs/swagger';

import { CreateSaladDto } from '@/salads/dto/create-salad.dto';

export class UpdateSaladDto extends PartialType(CreateSaladDto) {}
