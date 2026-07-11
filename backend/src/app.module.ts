import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';

// NOTE: Only the Health module is registered here. Per this phase's
// explicit scope (docs/Phase-1-Initialization.md), no business modules
// (Auth, Markets, Predictions, etc.) are implemented yet — those are
// introduced in their own future phases per
// docs/Phase-0.7-Development-Roadmap-and-Implementation-Plan.md.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HealthModule,
  ],
})
export class AppModule {}
