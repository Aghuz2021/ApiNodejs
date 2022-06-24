const jwt = require("jsonwebtoken");
const router = require("express").Router();
require("dotenv").config();
const usuarios = require("../dataccess/userEntry");
const functions = require("../dataccess/functions");

router.post("/", (req, res) => {
	const { body } = req;
	const index = usuarios.buscarUsuario(body.nickname) + 1;
	if (index >= 1) {
		let tokenData;
		const body2 = functions.getOne(index, usuarios.entry);
		if (body2.permisos == "admin") {
			tokenData = {
				nickname: body.nickname,
				id: body2.id,
				permisos: "admin",
			};
		} else {
			tokenData = {
				nickname: body.nickname,
				id: body2.id,
				permisos: "cliente",
			};
		}
		const token = jwt.sign(tokenData, process.env.JWTSECRET, {expiresIn: "5m"
		});
		res
			.status(200)
			.send({ token, nickname: body.nickname, permisos: tokenData.permisos });
	} else {
		return res.status(401).json({ error: "credenciales incorrectas" });
	}
});

module.exports = router;
