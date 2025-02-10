"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const bike_routes_1 = require("@app/express/src/routes/bike.routes");
const user_routes_1 = require("@app/express/src/routes/user.routes");
const incident_routes_1 = require("@app/express/src/routes/incident.routes");
const maintenance_routes_1 = require("@app/express/src/routes/maintenance.routes");
const parts_routes_1 = require("@app/express/src/routes/parts.routes");
const sequelize_1 = require("@app/sequelize/sequelize");
const mongoose_1 = require("@app/mongoose/mongoose");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/bikes", bike_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/incidents", incident_routes_1.default);
app.use("/maintenance", maintenance_routes_1.default);
app.use("/parts", parts_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello, TypeScript + Node.js + Express!");
});
async function start() {
    try {
        const sequelizeConnector = new sequelize_1.default();
        await sequelizeConnector.connect();
        const mongooseConnector = new mongoose_1.default();
        await mongooseConnector.connect();
    }
    catch (error) {
        console.error("Error while initializing database:", error);
    }
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
start();
