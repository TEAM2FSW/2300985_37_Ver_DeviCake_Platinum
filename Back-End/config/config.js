require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres",
    "timezone": "+07:00",
    "dialectOptions": {
      "ssl": {
        "require": true, 
        "rejectUnauthorized": false
      },
      "sslmode": "require"
    }
  },
  "test": {
    "username": "postgres",
    "password": "admin",
    "database": "db_devvi",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}