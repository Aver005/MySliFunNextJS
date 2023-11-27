import { API_KEY } from '@api';
import { artistManager } from 'lib/DataContext';

export default async function handler(req, res) 
{
    const { key, pn } = req.query;

    if (key != API_KEY) 
        return res.status(401).json({ message: 'Unauthorized' });

    if (!pn)
        return res.status(401).json({ message: 'Profile Name not exist!' });

    const data = artistManager.GetArtistByProfileName(pn);
    res.status(200).json(data);
}
