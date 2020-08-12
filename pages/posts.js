const fetch = require("node-fetch");

function Posts({ posts }) {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => 
                    <li key={post.id}><a href={"/post/" + post.id} >{post.title.rendered}</a></li>
                )}
            </ul>            
        </div>

    )
}

export default Posts;

export async function getStaticProps() {
    const res = await fetch('http://localhost:8080/wp-json/wp/v2/posts')
    const posts = await res.json();

    return {
        props: {
            posts,
        },
    }
}
