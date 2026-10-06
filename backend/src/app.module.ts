import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SlackModule } from 'nestjs-slack';
import { DataSource, DataSourceOptions } from 'typeorm';

import { AccountBalancesModule } from '@/account-balances/account-balances.module';
import { BalancesModule } from '@/balances/balances.module';
import { BillingPeriodsModule } from '@/billing-periods/billing-periods.module';
import { CurrentBillingPeriodModule } from '@/current-billing-period/current-billing-period.module';
import { FilterModule } from '@/filter/filter.module';
import { FinancialTransactionsModule } from '@/financial-transactions/financial-transactions.module';
import { GroceriesModule } from '@/groceries/groceries.module';
import { HealthModule } from '@/health/health.module';
import { NotificationModule } from '@/notification/notification.module';
import { postgresConnectionOptions } from '@/ormconfig';
import { SaladsModule } from '@/salads/salads.module';
import { SerializationModule } from '@/serialization/serialization.module';
import { EnvironmentVariables } from '@/types/EnvironmentVariables';
import { UserBalancesModule } from '@/user-balances/user-balances.module';
import { UsersModule } from '@/users/users.module';
import { ValidationModule } from '@/validation/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        TYPEORM_ENTITIES: Joi.string().required(),
        TYPEORM_MIGRATIONS: Joi.string().required(),
        TYPEORM_MIGRATIONS_RUN: Joi.string().required(),
        TYPEORM_SYNCHRONIZE: Joi.string().required(),

        CORS_ORIGIN: Joi.string().required(),

        SLACK_CHANNEL: Joi.string(),
        SLACK_WEBHOOK_URL: Joi.string(),

        SWAGGER_ENABLED: Joi.boolean().required(),
        SWAGGER_USERNAME: Joi.string(),
        SWAGGER_PASSWORD: Joi.string(),
      }).and('SLACK_CHANNEL', 'SLACK_WEBHOOK_URL'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...postgresConnectionOptions,
        entities: [],
        migrations: ['dist/migrations/*.js'],
        autoLoadEntities: true,
      }),

      dataSourceFactory: async (options: DataSourceOptions) => new DataSource(options).initialize(),
    }),
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        defaultChannel: configService.get('SLACK_CHANNEL') ?? '',
        type: 'webhook',
        channels: [
          {
            name: configService.get('SLACK_CHANNEL') ?? '',
            url: configService.get('SLACK_WEBHOOK_URL') ?? '',
          },
        ],
      }),
    }),
    ScheduleModule.forRoot(),

    ValidationModule,
    SerializationModule,
    FilterModule,
    HealthModule,

    AccountBalancesModule,
    BalancesModule,
    BillingPeriodsModule,
    CurrentBillingPeriodModule,
    FinancialTransactionsModule,
    GroceriesModule,
    SaladsModule,
    UserBalancesModule,
    UsersModule,
    NotificationModule,
  ],
})
export class AppModule {}
