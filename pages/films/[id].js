import {Card, CardContent, Typography} from '@material-ui/core';

const fetch = require("node-fetch");

function Film({film}) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">{film.title}</Typography>
                <Typography variant="body1" component="p">{film.description}</Typography>
            </CardContent>
        </Card>
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
