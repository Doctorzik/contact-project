const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Users Api",
    description: "Users Api",
  },
  host: "localhost:3000",
  schema: ["https", "http"],
};

const outPutFile = "./swagger.json";
const endPointsFiles = ["./routes/index.js"];

swaggerAutogen(outPutFile, endPointsFiles, doc);
