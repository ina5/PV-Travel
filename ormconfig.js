module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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