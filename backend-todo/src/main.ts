import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard());
  app.enableCors(
    
  );

  //OpenAPI Initialization

  const config = new DocumentBuilder()
  .setTitle('Todos')
  .setDescription('The todos API description')
  .setVersion('1.0')
  .addBearerAuth({
    type : "http",
    scheme : "bearer",
    bearerFormat : "JWT",
    name :"JWT",
    description : "Enter JWT Token",
    in : "header"
  }, "JWT_auth")
  // .addTag('todos')
  .build();

  //Implementating the swagger module
  const documentFactory = () => SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('api', app , documentFactory);
  
  await app.listen(3000);
}
bootstrap();
