const User = require("../models/User");

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, "-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar o usuário!" });
  }
};
