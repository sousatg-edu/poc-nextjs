import util from './util';

test("Get posts from the api", async () => {
    const posts = await util.getPosts(5);

    expect(posts).toBeDefined();
});
