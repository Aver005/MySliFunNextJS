import { API_KEY } from '@api';
import { artistManager, releaseManager } from 'lib/DataContext';

export default async function handler(req, res)
{
    const { key, limit } = req.query;
    let { artistID } = req.query;

    if (key != API_KEY)
        return res.status(401).json({ message: 'Unauthorized' });
    if (!artistID) artistID = -1;

    try 
    {
        if (artistID == -1)
        {
            const releases = releaseManager.GetAllReleases();
            return res.status(200).json({ 
                Releases: limit ? releases.slice(0, parseInt(limit, 10)) : releases
            });
        }

        const releases = artistManager.GetReleasesByArtist(artistID);
        return res.status(200).json({ 
            Releases: limit ? releases.slice(0, parseInt(limit, 10)) : releases
        });
    } 
    catch (error) 
    {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
