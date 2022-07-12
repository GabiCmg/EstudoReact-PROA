import React, {useEffect, useState} from 'react'; //executar ao recarregar a tela
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const[movieList, setMovieList] = useState([]);
  const[featuredData, setFeaturedData] = useState(null); //ligar com o filme que queremos os dados, 1h14min
  const[blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //pegando as listas (pegando a lista TOTAL.) min:40:37
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o Featured,1h16min - aleatoriamente 1h20
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

      console.log(chosenInfo);//1h27
    }

    loadAll();
  }, []);

  useEffect(()=> {
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    //começo da pag, 44:18
    <div className="page"> 

    <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

     <section className="lists">
       {movieList.map((item, key)=>(
       <MovieRow key={key} title={item.title} items={item.items}/>
       ))}
     </section>

     <footer>
       Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web <br/>
       Direitos de imagem para Netflix <br/>
       Dados pegos do site Themoviedb.org
     </footer>

     {movieList.legth <= 0 &&
     <div className="loading">
       <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
     </div>
     }
    </div>
  );
}
