const userController = require("./controllers/userController");

var _ver = function (pathName, version) {
    return { 'path': pathName, 'version': version || '1.0.0' };
};

exports = module.exports = function(server) {
    server.post(_ver('/api/register'), userController.register);
    server.get(_ver('/api/profile'), userController.profile);
}