import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';
import { AdvancedFilterPlugin } from './utils/swagger-plugin.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const theme = new SwaggerTheme();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(':v/docs', app, document, {
    swaggerOptions: {
      filter: true, // Enable the search bar
      showRequestDuration: true, // Show the duration of each request
      plugins: [AdvancedFilterPlugin],
    },
    customCss: theme.getBuffer('flattop' as SwaggerThemeName),
    customSiteTitle: 'Boilerplate Documentation',
  });

  await app.listen(3000);
}
bootstrap();
