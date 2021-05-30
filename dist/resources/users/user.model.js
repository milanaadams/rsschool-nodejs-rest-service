"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid = require("uuid");
class User {
    constructor({ id = uuid.v4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
    /**
     * Generates object from the User instance excluding sensetive information such as password
     * @param {User} user
     * @returns {object}
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
exports.User = User;
