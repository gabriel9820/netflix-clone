import "./styles.css";

interface IProps {
  item: any;
}

export const Destaque: React.FC<IProps> = ({ item }) => {
  const dataLancamento = new Date(item.first_air_date);
  const generos = item.genres.map((genero: any) => genero.name).join(", ");
  const descricao =
    item.overview.length > 250
      ? item.overview.substring(0, 250) + "..."
      : item.overview;

  return (
    <section
      className="destaque"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="destaque-vertical">
        <div className="destaque-horizontal">
          <div className="destaque-nome">{item.original_name}</div>

          <div className="destaque-info">
            <div className="destaque-info-relevancia">
              {item.vote_average} Pontos
            </div>
            <div className="destaque-info-ano">
              {dataLancamento.getFullYear()}
            </div>
            <div className="destaque-info-temporadas">
              {item.number_of_seasons} Temporada
              {item.number_of_seasons > 1 && "s"}
            </div>
          </div>

          <div className="destaque-descricao">{descricao}</div>

          <div className="destaque-botoes">
            <a
              className="destaque-botoes-botao-assistir"
              href={`/assistir/${item.id}`}
            >
              ► Assistir
            </a>
            <a
              className="destaque-botoes-botao-adicionar-lista"
              href={`/lista/adicionar/${item.id}`}
            >
              + Minha Lista
            </a>
          </div>

          <div className="destaque-generos">
            <strong> Gêneros: {generos} </strong>
          </div>
        </div>
      </div>
    </section>
  );
};
