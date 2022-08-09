import { NestFactoryStatic } from './factory'
import { AppModule } from './app.module';


async function bootstrap() {
  const NestFactory = new NestFactoryStatic()
  const app = await NestFactory.create(AppModule);

  await app.listen(3001, () => console.log('listening on http://localhost:3001'));
}

bootstrap();

