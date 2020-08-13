import Link from 'next/link';
import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import util from '../../util';

export default function Products({posts, currentPage, totalPages}) {
    const router = useRouter();

    if(router.isFallback) {
        return <h1>Loading...</h1>
     }

    if (posts.length === 0) {
        return <>
            <DefaultErrorPage statusCode={404} />
        </>;
    }

    return <>
        <ul>
            {posts.map(post => <li>
                <h3>{post.title.rendered}</h3>
            </li>)}
        </ul>

        <ul>
    	  {Array.from({length: totalPages}, (_, index) => {
              index += 1;
              return <li className={index === currentPage ? 'active' : undefined}>
                  <Link href="/products/[page]" as={`/products/${index}`}>
                      <a>Go to page {index}</a>
                    </Link>
                </li>
            })}
    </ul>
    </>
}


export async function getStaticProps({ params }) {
    const {posts, totalPages} = await util.getPosts(params.page);

    return {
        props: {
            posts,
            currentPage: params.page,
            totalPages,
        }
    }
}

export async function getStaticPaths() {
    return {
        fallback: true,
        paths: [
            {params: {page: "1"}},
            {params: {page: "2"}},
            {params: {page: "3"}},
            {params: {page: "4"}},
            {params: {page: "5"}},           
        ],
    }
}