import express from "express";
import dotenv from "dotenv";
import carrosRoutes from "./src/routes/carrosRoutes.js";

const serverPort = process.env.PORT || 3000
const app = express();

app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
    res.send("🏎️ API da velocidade funcionando....");
});
 app.use("/carros", carrosRoutes);


app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort}`);
});