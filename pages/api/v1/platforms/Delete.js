import { API_KEY } from '@api';

import fs from 'fs';
import path from 'path';

export default function handler(req, res)
{
    let { key, name, ID } = req.query;

    if (key != API_KEY)
        return res.status(401).json({ message: 'Unauthorized' });

    if (!name && !ID) 
        return res.status(400).json({ error: 'Name or ID parameter is required' });

    const dataDir = path.join(process.cwd(), 'data');
    const artistsPath = path.join(dataDir, 'Artists.json');
    const artistsDir = path.join(dataDir, 'artists');

    try 
    {
        let artistsData = {};

        if (fs.existsSync(artistsPath))
        {
            const fileContent = fs.readFileSync(artistsPath, 'utf-8');
            artistsData = JSON.parse(fileContent);
            
            if (!ID)
            {
                if (!artistsData.hasOwnProperty(name))
                    return res.status(404).json({ error: 'Artist not found' });

                ID = artistsData[name];
            }

            if (!name)
            {
                if (!artistsData.hasOwnProperty(ID))
                    return res.status(404).json({ error: 'Artist not found' });

                name = artistsData[ID];
            }
            
            delete artistsData[ID];
            delete artistsData[name];
            
            fs.writeFileSync(artistsPath, JSON.stringify(artistsData, null, 4));
        }

        const filePath = path.join(artistsDir, `${name}.json`);

        if (!fs.existsSync(filePath))
            return res.status(400).json({ error: 'Artist with this name NOT exists' });
        
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'Artist deleted successfully' });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
