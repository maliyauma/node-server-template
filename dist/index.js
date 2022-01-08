"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const TestResolver_1 = require("./resolvers/TestResolver");
const typedefs_1 = require("./typeDefs/typedefs");
const mongoose_auto_increment_1 = __importDefault(require("mongoose-auto-increment"));
const PORT = 4000;
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
    const uri = "mongodb://localhost:27017/testmongo";
    mongoose_1.default.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("connected to newmango db"));
    const connection = mongoose_1.default.createConnection(uri);
    mongoose_auto_increment_1.default.initialize(connection);
    app.get("/", (req, res) => {
        res.json({
            data: "API is working...",
        });
    });
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typedefs_1.typeDefs,
        resolvers: TestResolver_1.resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
};
startServer().catch(e => console.log("error strting server======== ", e));
//# sourceMappingURL=index.js.map