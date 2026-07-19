import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { SupabaseModule } from './core/supabase/supabase.module';
import { HealthModule } from './modules/health/health.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string()
          .uri({ scheme: ['postgres', 'postgresql'] })
          .required(),
        FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),
        NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
        PORT: Joi.number().port().default(4000),
        SUPABASE_SERVICE_ROLE_KEY: Joi.string().min(1).required(),
        SUPABASE_URL: Joi.string().uri().required(),
      }),
    }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    ProfilesModule,
    HealthModule,
  ],
})
export class AppModule {}
