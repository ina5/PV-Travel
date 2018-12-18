module.exports = {
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5005,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'ina',
    database: process.env.DB_DATABASE_NAME,
    synchronize: false,
    entities: [
        'src/data-base/entity/**/*.entity.ts',
    ],
    migrations: [
        'src/data-base/migration/**/*.ts',
    ],
    cli: {
        entitiesDir: 'src/data-base/entity',
        migrationsDir: 'src/data-base/migration',
    },
}