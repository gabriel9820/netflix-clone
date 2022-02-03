import { useEffect, useState } from "react";

import "./App.css";
import { Destaque } from "./components/Destaque";
import { Header } from "./components/Header";
import { ListaCategoria } from "./components/ListaCategoria";
import { ICategoria } from "./interfaces/categoria.interface";
import {
  obterAcaoAsync,
  obterComediaAsync,
  obterDocumentariosAsync,
  obterEmAltaAsync,
  obterInformacoesFilmeAsync,
  obterOriginaisAsync,
  obterRecomendadosAsync,
  obterRomanceAsync,
  obterTerrorAsync,
} from "./services/api";

const buscarCategoriasAsync = async (): Promise<ICategoria[]> => {
  return [
    {
      categoria: "originais",
      titulo: "Originais Netflix",
      itens: await obterOriginaisAsync(),
    },
    {
      categoria: "recomendados",
      titulo: "Recomendados para Você",
      itens: await obterRecomendadosAsync(),
    },
    {
      categoria: "emAlta",
      titulo: "Em Alta",
      itens: await obterEmAltaAsync(),
    },
    {
      categoria: "acao",
      titulo: "Ação",
      itens: await obterAcaoAsync(),
    },
    {
      categoria: "comedia",
      titulo: "Comédia",
      itens: await obterComediaAsync(),
    },
    {
      categoria: "terror",
      titulo: "Terror",
      itens: await obterTerrorAsync(),
    },
    {
      categoria: "romance",
      titulo: "Romance",
      itens: await obterRomanceAsync(),
    },
    {
      categoria: "documentarios",
      titulo: "Documentários",
      itens: await obterDocumentariosAsync(),
    },
  ];
};

const App = () => {
  const [listaCategorias, setListaCategorias] = useState<ICategoria[]>([]);
  const [destaque, setDestaque] = useState(null);
  const [headerPreto, setHeaderPreto] = useState(false);

  useEffect(() => {
    const buscarTodos = async () => {
      const categorias = await buscarCategoriasAsync();
      setListaCategorias(categorias);

      const originais = categorias.filter(
        (categoria) => categoria.categoria === "originais"
      );

      const indiceDestaque = Math.floor(
        Math.random() * (originais[0].itens.results.length - 1)
      );
      const filmeDestaque = originais[0].itens.results[indiceDestaque];
      const informacoesDestaque = await obterInformacoesFilmeAsync(
        filmeDestaque.id,
        "tv"
      );
      setDestaque(informacoesDestaque);
    };

    buscarTodos();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 0) {
        setHeaderPreto(true);
      } else {
        setHeaderPreto(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="pagina">
      <Header headerPreto={headerPreto} />

      {destaque && <Destaque item={destaque} />}

      <section className="listas">
        {listaCategorias?.map((categoria, key) => (
          <ListaCategoria
            key={key}
            titulo={categoria.titulo}
            itens={categoria.itens}
            imagemGrande={categoria.categoria === "originais"}
          />
        ))}
      </section>

      <footer>
        Feito por Gabriel Alves <br />
        Direitos de imagem para <a href="https://www.netflix.com/">Netflix</a>
        <br />
        Dados obtidos na api do <a href="https://www.themoviedb.org/">TMDB</a>
      </footer>

      {!listaCategorias.length && (
        <div className="carregando">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="carregando"
          />
        </div>
      )}
    </div>
  );
};

export default App;
