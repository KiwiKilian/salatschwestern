import { Column } from 'typeorm';

import { BaseEntity } from '@/base-entities/base-entity.entity';
import { ColumnDecimalTransformer } from '@/transformers/ColumnDecimalTransformer';

export abstract class FinancialTransaction extends BaseEntity {
  @Column('date')
  date: string;

  @Column('decimal', { precision: 5, scale: 2, transformer: new ColumnDecimalTransformer() })
  amount: number;
}
