const fetch = require("node-fetch");

function Film({film}) {
    return (
        <di>
            <h1>{film.title}</h1>
            <p>{film.description}</p>
        </di>
    )
}

export default Film;

export async function getStaticPaths() {
    const res = await fetch('https://ghibliapi.herokuapp.com/films')
    const films = await res.json();

    const paths = films.map(film => `/films/${film.id}`);

    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const res = await fetch(`https://ghibliapi.herokuapp.com/films/${params.id}`);
    const film = await res.json();

    return {props: {film}}
}
