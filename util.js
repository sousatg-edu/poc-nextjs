import fetch from 'node-fetch';

async function getPosts(page=null) {
    let url = "http://localhost:8080/wp-json/wp/v2/posts";

    if (page) {
        url += `?page=${page}`;
    }

    const res = await fetch(url);

    const totalPages = res.headers.get('X-WP-TotalPages');

    const posts = await res.json();

    return {
        totalPages,
        posts,
    };
}

async function getAllPostPages() {
    const initialPage = await getPosts();

    for(let i=1; i<=initialPage.total_pages; i++) {

    }
}

module.exports = {
    getPosts
}
