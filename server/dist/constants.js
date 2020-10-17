"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__db__ = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV !== "production";
exports.__db__ = 'mongodb://localhost:27017/serviceAgency';
//# sourceMappingURL=constants.js.map