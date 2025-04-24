export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpont = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpont, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error('Failed ot fetch movies', { cause: response.statusText });
  }

  const data = await response.json();

  return data.results;
};
