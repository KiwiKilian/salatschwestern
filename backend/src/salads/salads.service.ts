import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { NotificationService } from "@/notification/notification.service";
import { CreateSaladDto } from "@/salads/dto/create-salad.dto";
import { UpdateSaladDto } from "@/salads/dto/update-salad.dto";
import { Salad } from "@/salads/entities/salad.entity";
import { User } from "@/users/entities/user.entity";

@Injectable()
export class SaladsService {
  constructor(
    @InjectRepository(Salad) private saladsRepository: Repository<Salad>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  async create({ userId, ...createSaladDto }: CreateSaladDto): Promise<Salad> {
    const salad = await this.saladsRepository.save(
      this.saladsRepository.create({
        ...createSaladDto,
        user: await this.usersRepository.findOneByOrFail({ id: userId }),
      }),
    );
    this.notificationService.saladCreated(salad);

    return salad;
  }

  findAll(): Promise<Salad[]> {
    return this.saladsRepository.find({ relations: { user: true, billingPeriod: true } });
  }

  findOne(id: string): Promise<Salad> {
    return this.saladsRepository.findOneOrFail({
      where: { id },
      relations: { user: true, billingPeriod: true },
    });
  }

  async update(id: string, updateSaladDto: UpdateSaladDto): Promise<Salad> {
    const salad = await this.findOne(id);

    if (salad.billingPeriod) {
      throw new ForbiddenException();
    }

    return this.saladsRepository.save(Object.assign(salad, updateSaladDto));
  }

  async remove(id: string): Promise<Salad> {
    const salad = await this.findOne(id);

    if (salad.billingPeriod) {
      throw new ForbiddenException();
    }

    const removedSalad = await this.saladsRepository.remove(salad);
    this.notificationService.saladRemoved(removedSalad);

    return removedSalad;
  }
}
