const jwt = require("jsonwebtoken");
require("dotenv").config();

const consoleData = (req, res, next) => {
	console.log("Method:" + req.method);
	console.log("Path:" + req.path);
	console.log("Body:", req.body);
	console.log("-------");
	next();
};

const unkEP = (req, res) => {
	res.status(404).send({ error: "Unknown Endpoint" });
};

const processToken = (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		req.token = authorization.substring(7);
	} else {
		req.token = null;
	}
	next();
};

const validarUserLogin = (req, res, next) => {
	if (!req.token) {
		return res.status(401).json({ error: "token missing" });
	}
	console.log("HITHERE");
	//ACA TIRA ERROR CUANDO TE LOGEAS COMO CLIENTE. TIRA TOKEN EXPIRED. PERO SI LOGEAS COMO ADMIN FUNCIONA BIEN. NO SE BIEN PORQUE TODAVIA
	const decodeToken = jwt.verify(req.token, process.env.JWTSECRET);
	console.log("HITHERE");
	if (!decodeToken.id) {
		return res.status(401).json({ error: "Invalid Token" });
	}

	req.user = decodeToken;
	next();
};

const validarAdmin = (req, res, next) => {
	console.log("HOLA BUENOS DIAS");
	console.log("token del admin: ", req.token);
	const decodeToken = jwt.verify(req.token, process.env.JWTSECRET);
	console.log("Usuario: ", decodeToken);
	const permisos = decodeToken.permisos;

	if (permisos == "admin") {
		req.user = decodeToken;
		console.log("Soy Admin");
	} else {
		console.log("No Soy Admin");
		return res.status(401).json({ error: "No admin token" });
	}

	next();
};

module.exports = {
	consoleData,
	unkEP,
	processToken,
	validarUserLogin,
	validarAdmin,
};
