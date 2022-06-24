const getAll = (entry) => {
	return entry;
};

const getOne = (id, entry) => {
	return entry.find((registro) => registro.id == id);
};

const save = (body, entry) => {
	entry.push(body);
};

const borrar = (id, entry) => {
	const index = entry.findIndex((registro) => registro.id == id);
	if (index >= 0) {
		entry.splice(index, 1);
		return true;
	}
	return false;
};

const update = (body, entry) => {
	const index = entry.findIndex((registro) => registro.id == body.id);
	if (index >= 0) {
		entry[index] = body;
		return true;
	}
	return false;
};

const getMaxId = (entry) => {
	return entry.length;
};

module.exports = {
	getAll,
	getOne,
	save,
	borrar,
	update,
	getMaxId,
};
