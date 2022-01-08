"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_express_2 = require("apollo-server-express");
const PORT = 4000;
const typeDefs = (0, apollo_server_express_2.gql) `
    type Query {
      defaultPost:String
     }
`;
const resolvers = {
    Query: {
        defaultPost: () => "eat your vegetables",
    },
};
const startServer = async () => {
    const app = (0, express_1.default)();
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://studio.apollographql.com'
    ];
    const corsOptions = {
        credentials: true,
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    };
    app.use((0, cors_1.default)(corsOptions));
    app.get("/", (req, res) => {
        res.json({
            data: "API is working...",
        });
    });
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
};
startServer().catch(e => console.log("error strting server======== ", e));
//# sourceMappingURL=index.js.map