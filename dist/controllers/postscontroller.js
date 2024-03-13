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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPost = exports.createPost = exports.getPosts = void 0;
const database_1 = require("../database");
//recibimos todos los posts
function getPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield (0, database_1.connect)();
        const posts = yield conn.query('SELECT * FROM posts');
        return res.json(posts[0]);
    });
}
exports.getPosts = getPosts;
//creamos un post
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('INSERT INTO posts SET ?', [newPost]);
        return res.json({
            message: 'El post se ha creado con éxito'
        });
    });
}
exports.createPost = createPost;
//recibimos un post según el id que queramos
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        const posts = yield conn.query('SELECT * FROM posts WHERE id=?', [id]);
        return res.json(posts[0]);
    });
}
exports.getPost = getPost;
//borrar post con el id del usuario
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const conn = yield (0, database_1.connect)();
        yield conn.query('DELETE FROM posts WHERE id=?', [id]);
        return res.json({
            message: 'El post ha sido eliminado correctamente'
        });
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.postId;
        const updatePost = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query('UPDATE posts set ? WHERE id = ?', [updatePost, id]);
        return res.json({
            message: "El post ha sido actualizado correctamente"
        });
    });
}
exports.updatePost = updatePost;
