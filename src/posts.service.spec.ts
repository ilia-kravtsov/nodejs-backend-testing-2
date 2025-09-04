import {Post, PostsService} from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
      {text: 'Post 5'},
      {text: 'Post 6'},
      {text: 'Post 7'},
      {text: 'Post 8'},
      {text: 'Post 9'},
      {text: 'Post 10'},
      {text: 'Post 11'},
      {text: 'Post 12'},
      {text: 'Post 13'},
      {text: 'Post 14'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const allPosts: Post[] = postsService.findMany();
      const posts: Post[] = postsService.getAllPosts()

      expect(posts).toEqual(allPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      const skip: number = 5;
      const limit: number = 7;

      const result: Post[] = postsService.findMany({ skip, limit });
      const allPosts: Post[] = postsService.getAllPosts();

      const expectedLength: number = Math.min(limit, allPosts.length - skip);

      expect(result.length).toBe(expectedLength);

      if (expectedLength > 0) {
        expect(result[0].text).toBe(allPosts[skip].text);
      }

      if (expectedLength > 1) {
        expect(result[expectedLength - 1].text).toBe(
          allPosts[skip + expectedLength - 1].text
        );
      }
    });

    it('should delete post from posts', () => {
      const deletePostId: string = '1';

      const postsBeforeDeleting: Post[] = [...postsService.getAllPosts()];
      postsService.delete(deletePostId);
      const postsAfterDeleting: Post[] = postsService.getAllPosts()

      expect(postsBeforeDeleting.length).toBe(postsAfterDeleting.length + 1);
      expect(postsAfterDeleting[0]).toEqual({id: '2', text: 'Post 2'});
    })

    it('should update post in posts', () => {
      const updatePostId: string = '1';
      const updatePostText: string = 'Post 007';

      const postsBeforeUpdating: Post[] = postsService.getAllPosts().map(p => ({ ...p }));
      postsService.update(updatePostId, { text: updatePostText });
      const updatedPost = postsService.find(updatePostId);

      expect(updatedPost).toBeDefined();
      expect(updatedPost!.text).toBe(updatePostText);

      const otherPost = postsService.find('2');
      expect(otherPost!.text).toBe('Post 2');

      expect(postsService.getAllPosts().length).toBe(postsBeforeUpdating.length);
    })
  });
});