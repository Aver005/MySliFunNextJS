import { API_KEY } from '@api';
import { artistManager } from 'lib/DataContext';

export default async function handler(req, res)
{
    const { key, limit } = req.query;

    if (key != API_KEY)
        return res.status(401).json({ message: 'Unauthorized' });

    try 
    {
        const artists = artistManager.GetAllArtists();
        res.status(200).json({ 
            Artists: limit ? artists.slice(0, parseInt(limit, 10)) : artists
        });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
