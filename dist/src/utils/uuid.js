"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A method to build unique identifiers.
 * @returns UUID string.
 */
function uuid() {
    return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
exports.default = uuid;
