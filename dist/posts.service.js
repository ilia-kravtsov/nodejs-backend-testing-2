"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor() {
        this.posts = [];
        this.lastPostId = 1;
    }
    create(post) {
        const postWithId = Object.assign(Object.assign({}, post), { id: this.lastPostId.toString() });
        this.lastPostId++;
        this.posts.push(postWithId);
        return postWithId;
    }
    findMany({ skip, limit } = {}) {
        let foundPosts = this.posts;
        if (skip !== undefined) {
            foundPosts = foundPosts.slice(skip);
        }
        if (limit !== undefined) {
            foundPosts = foundPosts.slice(0, limit);
        }
        return foundPosts;
    }
    find(postId) {
        return this.posts.find(({ id }) => id === postId);
    }
    delete(postId) {
        this.posts = this.posts.filter(({ id }) => id !== postId);
    }
    update(postId, post) {
        const postToUpdate = this.find(postId);
        if (!postToUpdate) {
            throw new Error('Пост не найден');
        }
        Object.assign(postToUpdate, post);
    }
    getAllPosts() {
        return this.posts;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map