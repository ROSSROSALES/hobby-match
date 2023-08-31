
const BASE_URL = "https://api.jikan.moe/v4";

async function fetchAPI(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`)
  const data = await response.json();
  return data
}

export const getTopAnime = () => {
  return fetchAPI("top/anime");
};

export default fetchAPI;
