export interface Post {
    id: string;
    text: string;
}
export interface FindManyOptions {
    skip?: number;
    limit?: number;
    before?: string;
    after?: string;
}
export declare class PostsService {
    private posts;
    private lastPostId;
    create(post: Omit<Post, 'id' | 'date'>): Post;
    findMany({ skip, limit }?: FindManyOptions): Post[];
    find(postId: string): Post | undefined;
    delete(postId: string): void;
    update(postId: string, post: Pick<Post, 'text'>): void;
    getAllPosts(): Post[];
}
