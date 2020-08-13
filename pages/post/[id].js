const fetch = require("node-fetch");

function Post({post}) {
    return (
        <div>
            <h1>{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
        </div>
    )
}

export default Post;

export async function getServerSideProps({params}) {
    const res = await fetch(`http://localhost:8080/wp-json/wp/v2/posts/${params.id}`);
    const post = await res.json();

    return {
        props: {
            post
        }
    }
}

/*
export async function getStaticPaths() {
    const res = await fetch('http://localhost:8080/wp-json/wp/v2/posts')
    const posts = await res.json();

    const paths = posts.map(post => `/post/${post.id}`);

    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const res = await fetch(`http://localhost:8080/wp-json/wp/v2/posts/${params.id}`);
    const post = await res.json();

    return {props: {post}}
}
*/