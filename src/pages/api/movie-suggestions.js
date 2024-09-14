import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req, res) {
  const { query, category } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    let endpoint = `${TMDB_BASE_URL}/search/movie`;
    let params = {
      api_key: TMDB_API_KEY,
      query: query,
      language: 'en-US',
      page: 1,
      include_adult: false
    };

    // Add additional parameters for daily and infinite modes
    if (category === 'daily' || category === 'infinite') {
      params = {
        ...params,
        'vote_count.gte': 100, // Ensure some popularity
        sort_by: 'vote_average.desc' // Sort by rating
      };
    }

    const response = await axios.get(endpoint, { params });

    const suggestions = response.data.results
      .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date
      }))
      .slice(0, 5); // Limit to top 5 results

    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching movie suggestions:', error);
    res.status(500).json({ error: 'Error fetching movie suggestions', details: error.message });
  }
}