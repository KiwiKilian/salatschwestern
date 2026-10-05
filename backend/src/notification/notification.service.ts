import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import currency from 'currency.js';
import dayjs, { Dayjs } from 'dayjs';
import { SlackService } from 'nestjs-slack';
import { Blocks, Md, Message } from 'slack-block-builder';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { BillingPeriod } from '@/billing-periods/entities/billing-period.entity';
import { Salad } from '@/salads/entities/salad.entity';
import { euro } from '@/setup/euro';

const SALAD_GROCERY_COUNT_HOUR = 10;

@Injectable()
export class NotificationService {
  constructor(
    private readonly slackService: SlackService,
    @InjectRepository(Salad) private saladsRepository: Repository<Salad>,
  ) {}

  private async getSaladsForWeek(date: Dayjs) {
    const monday = date.startOf('week');

    return this.saladsRepository.find({
      where: {
        date: And(
          MoreThanOrEqual(monday.format('YYYY-MM-DD')),
          LessThanOrEqual(monday.set('day', 5).format('YYYY-MM-DD')),
        ),
      },
      order: {
        date: 'ASC',
      },
    });
  }

  async saladCreated(salad: Salad) {
    const salads = await this.getSaladsForWeek(dayjs(salad.date));

    if (salads.length >= 1 && dayjs().isAfter(dayjs(`${salads[0].date} ${SALAD_GROCERY_COUNT_HOUR}:00`))) {
      await this.slackService.sendBlocks(
        Message()
          .blocks(
            Blocks.Section().text(
              `➕ ${Md.bold(salad.user.displayName)} isst am ${Md.bold(dayjs(salad.date).format('dddd'))} den ${Md.bold(
                dayjs(salad.date).format('DD.MM.'),
              )} auch einen Salat.`,
            ),
          )
          .getBlocks(),
      );
    }
  }

  async saladRemoved(salad: Salad) {
    await this.slackService.sendBlocks(
      Message()
        .blocks(
          Blocks.Section().text(
            `❌ ${Md.bold(salad.user.displayName)} isst am ${Md.bold(dayjs(salad.date).format('dddd'))} den ${Md.bold(
              dayjs(salad.date).format('DD.MM.'),
            )} doch keinen Salat.`,
          ),
        )
        .getBlocks(),
    );
  }

  @Cron('0 8 * * 1')
  private async addSalads() {
    await this.slackService.sendBlocks(
      Message()
        .blocks(
          Blocks.Section().text(
            `🗓️ Es ist Zeit die ${Md.bold(Md.link('https://salatschwestern.example.com/', 'Salate einzutragen'))}!`,
          ),
        )
        .getBlocks(),
    );
  }

  @Cron(`0 ${SALAD_GROCERY_COUNT_HOUR} * * 1-5`)
  private async saladGroceryCount() {
    const salads = await this.getSaladsForWeek(dayjs());

    if (salads.length > 0 && salads[0].date === dayjs().format('YYYY-MM-DD')) {
      await this.slackService.sendBlocks(
        Message()
          .blocks(Blocks.Section().text(`📋 Diese Woche werden ${Md.bold(salads.length.toString())} Salate gegessen.`))
          .getBlocks(),
      );
      await this.slackService.sendBlocks(Message().blocks(Blocks.Section().text(`🛒 Wer geht einkaufen?`)).getBlocks());
      await this.slackService.sendBlocks(Message().blocks(Blocks.Section().text(`🥚 Wer kocht Eier?`)).getBlocks());
      await this.slackService.sendBlocks(
        Message().blocks(Blocks.Section().text(`🌾 Wer kocht Getreide/Körner?`)).getBlocks(),
      );
    }
  }

  @Cron('55 11 * * 1-5')
  private async saladDayCount() {
    const salads = await this.saladsRepository.find({
      where: { date: dayjs().format('YYYY-MM-DD') },
      relations: {
        user: true,
      },
    });

    if (salads.length > 0) {
      await this.slackService.sendBlocks(
        Message()
          .blocks(
            Blocks.Section().text(
              `🥗 Heute werden ${Md.bold(salads.length.toString())} Salate gegessen, mit dabei sind:`,
            ),
            Blocks.Section().text(
              Md.listBullet(salads.map(({ user: { displayName } }) => displayName).sort((a, b) => a.localeCompare(b))),
            ),
          )
          .getBlocks(),
      );
    }
  }

  async currentBillingPeriodClosed({
    billingPeriod,
    accountBalanceDifference,
  }: {
    billingPeriod: BillingPeriod;
    accountBalanceDifference: currency;
  }) {
    if (billingPeriod.salads) {
      const salads = billingPeriod.salads.sort(({ date: a }, { date: b }) => a.localeCompare(b));

      const sentences = [
        `🤑 Es wurde für den Zeitraum ${Md.bold(dayjs(salads[0].date).format('DD.MM.'))} bis ${Md.bold(
          dayjs(salads[salads.length - 1].date).format('DD.MM.'),
        )} abgerechnet.`,
        `Es wurden ${Md.bold(
          billingPeriod.salads.length.toString(),
        )} Salate gegessen bei einem Salatpreis von ${Md.bold(euro(billingPeriod.saladPrice).format())}.`,
      ];

      if (accountBalanceDifference.value === 0) {
        sentences.push('Der Betrag in der Kasse war ausgeglichen.');
      } else if (accountBalanceDifference.value > 0) {
        sentences.push(`Die Kasse hatte einen Überschuss von ${Md.bold(accountBalanceDifference.format())}.`);
      } else if (accountBalanceDifference.value < 0) {
        sentences.push(`Die Kasse hatte einen Fehlbetrag von ${Md.bold(accountBalanceDifference.format())}.`);
      }

      sentences.push(
        `Bitte ${Md.bold(Md.link('https://salatschwestern.example.com/schwestern', 'gleicht eure Kontostände aus'))}.`,
      );

      await this.slackService.sendBlocks(
        Message()
          .blocks(Blocks.Section().text(sentences.join(' ')))
          .getBlocks(),
      );
    }
  }
}
