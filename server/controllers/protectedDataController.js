const data = {
	protectedData: require('../model/protectedData.json'),
}

const getProtectedData = (req, res) => {
	res.json(data.protectedData);
}


module.exports = {
	getProtectedData,
}
