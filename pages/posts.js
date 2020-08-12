import React, {useState, useEffect} from 'react';
import fetch from 'node-fetch';
import ReactPaginate from 'react-paginate';
import Router, {withRouter} from 'next/router';


function Posts(props) {
    const [isLoading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', stopLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        }
    }, []);

    const pagginationHandler = (page) => {
        const currentPath = props.router.pathname;
        const currentQuery = props.router.query;
        currentQuery.page = page.selected + 1;

        props.router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }

    let content = null;

    if (isLoading) {
        content = <div>Loading...</div>
    } else {
        content = (
            <ul>
                {props.posts.map(post => 
                    <li key={post.id}><a href={"/post/" + post.id} >{post.title.rendered}</a></li>
                )}
            </ul>
        )
    }

    return (
        <div>
            <h1>Posts</h1>
            <div>
                {content}
            </div>

            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                activeClassName={'active'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}

                initialPage={props.currentPage - 1}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pagginationHandler}
            />
        </div>
    )
}

export default withRouter(Posts);

export async function getServerSideProps({query}) {
    const page = query.page || 1; 
    const res = await fetch(`http://localhost:8080/wp-json/wp/v2/posts?page=${page}`);
    const posts = await res.json();

    return {
        props: {
            totalCount: 50,
            pageCount: 5,
            currentPage: 1,
            perPage: 10,
            posts: posts,
        },
    }
}
