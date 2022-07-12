//minha chave (API)
const API_KEY = '485630ecac60e8ab685688b266e869be';
//base da url
const API_BASE = 'https://api.themoviedb.org/3';

/* ORDEM:
originais 
recomendados
em alta
ação 
comédia
terror
romance
documentário
*/

//função para fazer o fetch, vai buscar para repetir 
// fazer e esperar... (min do vídeo: 38)
const basicFetch = async (endpoint) => { 
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
};

//função para retorno das listas
export default{
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                //para buscar as infos dos filmes :
                //ordem: /movie/{movie_id}/similar (site:https://www.themoviedb.org/)
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items:  await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            }, 
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    //função para pegar info de filme 1h24
    getMovieInfo: async (movieId, type)=> {
        let info = {};
             
        if(movieId){
            switch(type){
                case 'movie':  
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }
        return info
    }
}