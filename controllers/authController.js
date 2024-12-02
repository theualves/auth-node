const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registro de usuário
exports.register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ msg: "Campos obrigatórios não preenchidos!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não coincidem!" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(422).json({ msg: "Email já cadastrado!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: passwordHash });
    await user.save();

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor!" });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ msg: "Campos obrigatórios não preenchidos!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);
    
    res.status(200).json({ msg: "Autenticação bem-sucedida!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro no servidor!" });
  }
};
