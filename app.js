require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Configuração do banco
require("./config/db");

// Importando rotas
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Definindo rotas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Rota pública
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
