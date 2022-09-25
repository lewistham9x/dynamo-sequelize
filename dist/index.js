"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dynamo_1 = __importDefault(require("./dynamo"));
class DynamoWrapper {
    constructor(...args) {
        const len = args.length;
        const options = args[len - 1];
        if (options &&
            (options.dialect === 'dynamo' || options.dialect === 'dynamodb')) {
            return new dynamo_1.default(...args);
        }
        return new sequelize_1.Sequelize(...args);
    }
}
exports.default = DynamoWrapper;
module.exports = DynamoWrapper;
