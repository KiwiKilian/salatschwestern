import { CurrentBillingPeriodService } from '@/modules/api';

export type CloseBillingPeriodParameters = Parameters<typeof CurrentBillingPeriodService.close>[0]['requestBody'];
