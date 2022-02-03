import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { useState } from "react";
import "./styles.css";

interface IProps {
  titulo: string;
  itens: any;
  imagemGrande?: boolean;
}

export const ListaCategoria: React.FC<IProps> = ({
  titulo,
  itens,
  imagemGrande = false,
}) => {
  const larguraItem = imagemGrande ? 200 : 300;
  const alturaItem = imagemGrande ? 300 : 169;
  const larguraLista = itens.results.length * larguraItem;
  const maxScrollX = window.innerWidth - larguraLista - 60;
  const [scrollX, setScrollX] = useState(0);

  const botaoEsquerdoClick = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);

    if (x > 0) {
      x = 0;
    }

    setScrollX(x);
  };

  const botaoDireitoClick = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);

    if (window.innerWidth - larguraLista > x) {
      x = maxScrollX;
    }

    setScrollX(x);
  };

  return (
    <div className="lista-categoria">
      <h2>{titulo}</h2>

      {scrollX < 0 && (
        <div
          className="lista-categoria-botao-esquerdo"
          onClick={botaoEsquerdoClick}
        >
          <NavigateBefore style={{ fontSize: 50, height: alturaItem }} />
        </div>
      )}

      {scrollX !== maxScrollX && (
        <div
          className="lista-categoria-botao-direito"
          onClick={botaoDireitoClick}
        >
          <NavigateNext style={{ fontSize: 50, height: alturaItem }} />
        </div>
      )}

      <div className="lista-categoria-area">
        <div
          className="lista-categoria-itens"
          style={{
            marginLeft: scrollX,
            width: itens.results.length * larguraItem,
          }}
        >
          {itens.results?.map((item: any, key: number) => (
            <div
              key={key}
              className="lista-categoria-item"
              style={{ width: imagemGrande ? 200 : 300 }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${
                  imagemGrande ? item.poster_path : item.backdrop_path
                }`}
                alt={item.original_title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
