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
    "username": process.env.TEST_POSTGRES_USER,
    "password": process.env.TEST_POSTGRES_PASSWORD,
    "database": process.env.TEST_POSTGRES_DATABASE,
    "host": process.env.TEST_POSTGRES_HOST,
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
  "production": {
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
}
}
