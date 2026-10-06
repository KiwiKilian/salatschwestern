import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BillingPeriod } from "@/billing-periods/entities/billing-period.entity";

@Injectable()
export class BillingPeriodsService {
  constructor(
    @InjectRepository(BillingPeriod) private billingPeriodsRepository: Repository<BillingPeriod>,
  ) {}

  findAll(): Promise<BillingPeriod[]> {
    return this.billingPeriodsRepository.find({
      relations: { salads: true, groceries: true },
      order: {
        billingDate: "DESC",
      },
    });
  }

  findOne(id: string): Promise<BillingPeriod> {
    return this.billingPeriodsRepository.findOneOrFail({
      where: { id },

      relations: {
        salads: { user: true },
        groceries: { users: true },
      },
      order: {
        salads: {
          date: "ASC",
          user: {
            displayName: "ASC",
          },
        },
        groceries: {
          date: "ASC",
          users: {
            displayName: "ASC",
          },
        },
      },
    });
  }
}
