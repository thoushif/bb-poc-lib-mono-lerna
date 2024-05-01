"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const axios_1 = __importDefault(require("axios"));
class Request {
    constructor(baseUrl, headers = {}, httpClient = axios_1.default) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.httpClient = httpClient;
    }
    makeRequest(method_1, endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (method, endpoint, body = null) {
            const url = `${this.baseUrl}/${endpoint}`;
            try {
                const options = {
                    headers: this.headers,
                    method,
                    url,
                    data: {},
                };
                if (body)
                    options["data"] = body;
                const response = yield this.httpClient(options);
                return { status: response.status, body: response.data, error: null };
            }
            catch (error) {
                return this.handleError(error);
            }
        });
    }
    setAuthorizationHeader(authorization) {
        this.headers = Object.assign(Object.assign({}, this.headers), authorization);
    }
    post(endpoint, body) {
        return this.makeRequest("post", endpoint, body);
    }
    get(endpoint) {
        return this.makeRequest("get", endpoint);
    }
    handleError(error) {
        if (error.response) {
            return {
                status: error.response.status,
                body: error.response.data,
                error: null,
            };
        }
        return { status: null, body: null, error };
    }
}
exports.Request = Request;
