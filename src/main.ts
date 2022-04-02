import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// const logger = (req, res, next) => {
//   console.log(`Reque22st...`);
//   next();
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // *全局中间件
  await app.listen(3000);
}
bootstrap();
