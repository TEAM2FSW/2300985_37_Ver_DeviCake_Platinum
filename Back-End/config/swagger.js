require('dotenv').config();

module.exports = {
    swaggerOption: {
        definition: {
          openapi: "3.1.0",
          info: {
            title: "DevvyCake API with Swagger",
            version: "0.1.0",
            description:
              "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
              name: "MIT",
              url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
              name: "Ersan Putra",
              url: "https://ersanputra.com",
              email: "admin@ersanputra.com",
            },
          },
          servers: [
            {
                url: "http://localhost:" + process.env.PORT,
            },
            {
                url: "https://creepy-puce-tuna.cyclic.app",
            },
        ],
        security: [{
            bearerAuth: []
        }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                
            }
        }
        },
        apis: ["./routers/*.js", "./routers/**/*.js"],
      }
}