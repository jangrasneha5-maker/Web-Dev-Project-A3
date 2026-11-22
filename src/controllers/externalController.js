exports.searchMusic = async (req, res) => {
  try {
    const term = String(req.query.term || '').trim();
    if (!term) return res.status(400).json({ message: 'Enter an artist, album or song to search.' });
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=12`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`iTunes API returned ${response.status}`);
    const data = await response.json();
    res.json(data.results.map(item => ({
      trackName: item.trackName,
      artistName: item.artistName,
      collectionName: item.collectionName,
      artworkUrl: item.artworkUrl100,
      previewUrl: item.previewUrl,
      trackViewUrl: item.trackViewUrl,
      releaseDate: item.releaseDate
    })));
  } catch (error) {
    res.status(502).json({ message: 'External music search is temporarily unavailable.', error: error.message });
  }
};
