const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    development: {
        //client: "mysql",
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: 5432,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            //host: "localhost",
            //port: 3306,
            //user: "root",
            //password: "",
            //database: "fullstackgazin",
            //filename: path.resolve(__dirname, "src", "database", "database.db"),
        },
        migrations: {
            directory: path.resolve(
                __dirname,
                "src",
                "database",
                "knex",
                "migrations"
            ),
        },
        useNullAsDefault: true,
    },
};
