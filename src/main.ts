import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerModule,
} from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            whitelist: true,
            // forbidNonWhitelisted: true,
        }),
    );

    // Swagger
    const swaggerCustomOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
    };

    const config = new DocumentBuilder()
        .setTitle("Trello")
        .setDescription("Trello API description")
        .setVersion("1.0")
        .addTag("Trello")
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
            'accessToken',
        )
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
            'refreshToken',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, swaggerCustomOptions);

    // 환경 변수 설정
    const configService = app.get(ConfigService);
    const port: number = configService.get("SERVER_PORT");

    await app.listen(port);
}
bootstrap();
