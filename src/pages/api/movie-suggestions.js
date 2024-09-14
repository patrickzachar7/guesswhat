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

    // Adjust the search based on the category
    if (category === 'daily' || category === 'infinite') {
      // For daily and infinite modes, we might want to search in a specific list or with specific criteria
      // This is just an example, adjust according to your specific requirements
      endpoint = `${TMDB_BASE_URL}/discover/movie`;
      params = {
        ...params,
        sort_by: 'popularity.desc',
        'primary_release_date.gte': '1990-01-01', // Example: Only movies from 1990 onwards
        'vote_count.gte': 1000 // Example: Only movies with at least 1000 votes
      };
    }

    const response = await axios.get(endpoint, { params });

    const suggestions = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date
    }));

    res.status(200).json(suggestions);
  } catch (error) {
    console.error('Error fetching movie suggestions:', error);
    res.status(500).json({ error: 'Error fetching movie suggestions' });
  }
}