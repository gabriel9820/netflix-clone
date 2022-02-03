const API_URL = "https://api.themoviedb.org/3";
const FINAL_ENDPOINT = `language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`;

const tmdbRequest = async (endpoint: string) => {
  const request = await fetch(`${API_URL}${endpoint}`);
  return await request.json();
};

export const obterOriginaisAsync = async () => {
  return await tmdbRequest(`/discover/tv?with_network=213&${FINAL_ENDPOINT}`);
};

export const obterRecomendadosAsync = async () => {
  return await tmdbRequest(`/trending/all/week?&${FINAL_ENDPOINT}`);
};

export const obterEmAltaAsync = async () => {
  return await tmdbRequest(`/movie/top_rated/?${FINAL_ENDPOINT}`);
};

export const obterAcaoAsync = async () => {
  return await tmdbRequest(`/discover/movie/?with_genres=28&${FINAL_ENDPOINT}`);
};

export const obterComediaAsync = async () => {
  return await tmdbRequest(`/discover/movie/?with_genres=35&${FINAL_ENDPOINT}`);
};

export const obterTerrorAsync = async () => {
  return await tmdbRequest(`/discover/movie/?with_genres=27&${FINAL_ENDPOINT}`);
};

export const obterRomanceAsync = async () => {
  return await tmdbRequest(
    `/discover/movie/?with_genres=10749&${FINAL_ENDPOINT}`
  );
};

export const obterDocumentariosAsync = async () => {
  return await tmdbRequest(`/discover/movie/?with_genres=99&${FINAL_ENDPOINT}`);
};

export const obterInformacoesFilmeAsync = async (
  filmeId: number,
  tipo: string
) => {
  return await tmdbRequest(`/${tipo}/${filmeId}?${FINAL_ENDPOINT}`);
};
