const fetch = require("node-fetch");

function Film({ films }) {
    return (
        <div>
            <h1>Films</h1>
            <ul>
                {films.map(film => 
                    <li key={film.id}><a href={"/films/" + film.id} >{film.title}</a></li>
                )}
            </ul>            
        </div>

    )
}

export async function getStaticProps() {
    const res = await fetch('https://ghibliapi.herokuapp.com/films')
    const films = await res.json();

    return {
        props: {
            films,
        },
    }
}

export default Film;
