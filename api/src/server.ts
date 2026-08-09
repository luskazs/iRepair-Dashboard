import "dotenv/config";
import { app } from "./config/expressConfig.js";

const port = Number(process.env.PORT) || 3030;

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "API do iRepair funcionando",
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});