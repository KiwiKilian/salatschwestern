import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from '@/base-entities/base-entity.entity';
import { Grocery } from '@/groceries/entities/grocery.entity';
import { Salad } from '@/salads/entities/salad.entity';
import { UserBalance } from '@/user-balances/entities/user-balance.entity';

@Entity()
export class User extends BaseEntity {
  @Index({ unique: true })
  @Column('varchar')
  email: string;

  @Column('varchar')
  displayName: string;

  @Column('boolean', { default: true })
  active: boolean;

  @OneToMany(() => Salad, (salad) => salad.user)
  salads?: Salad[];

  @OneToMany(() => UserBalance, (userBalance) => userBalance.user)
  userBalances?: UserBalance[];

  @ManyToMany(() => Grocery, (grocery) => grocery.users)
  @JoinTable()
  groceries?: Grocery[];

  @BeforeInsert()
  @BeforeUpdate()
  private emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
