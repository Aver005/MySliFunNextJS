import { API_KEY } from '@api';
import { releaseManager } from 'lib/DataContext';

export default function handler(req, res)
{
    const { key, name, ...rawData } = req.query;

    if (key != API_KEY)
        return res.status(401).json({ message: 'Unauthorized' });

    if (!name) 
        return res.status(400).json({ error: 'Name parameter is required' });

    try 
    {
        const data = {};

        for (const key in rawData) 
        {
            if (!rawData.hasOwnProperty(key))
                continue;
            
            data[key.charAt(0).toUpperCase() + key.slice(1)] = rawData[key];
        }

        releaseManager.NewRelease(data);
        res.status(200).json({ message: 'Release created successfully' });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
