import { API_KEY } from '@api';
import { artistManager } from 'lib/DataContext';
import { ConvertSnakeToCamel, FormatString } from 'lib/Utils';

export default function handler(req, res)
{
    const { key, name, ...rawData } = req.query;
    let profile_name = rawData.profile_name;

    if (key != API_KEY)
        return res.status(401).json({ Message: 'Unauthorized' });

    if (!name) 
        return res.status(400).json({ Error: 'Name parameter is required' });

    if (!profile_name)
        profile_name = FormatString(name);

    try 
    {
        const data = {
            'Name': name,
            'ProfileName': profile_name
        };

        for (const key in rawData) 
        {
            if (!rawData.hasOwnProperty(key))
                continue;
            
            data[ConvertSnakeToCamel(key)] = rawData[key];
        }

        const artistID = artistManager.NewArtist(data);
        res.status(200).json({ 
            Message: 'Artist created successfully',
            ArtistID: artistID,
            ProfileName: profile_name
        });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
}
