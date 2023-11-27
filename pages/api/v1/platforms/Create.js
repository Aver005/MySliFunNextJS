import { API_KEY } from '@api';

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res)
{
    const { key, name, ...rawData } = req.query;

    if (key != API_KEY)
        return res.status(401).json({ message: 'Unauthorized' });

    if (!name) 
        return res.status(400).json({ error: 'Name parameter is required' });

    const artistID = uuidv4(); // Генерация уникального UUID
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
        }

        artistsData[artistID] = name;
        artistsData[name] = artistID;
        fs.writeFileSync(artistsPath, JSON.stringify(artistsData, null, 4));

        const filePath = path.join(artistsDir, `${name}.json`);
        if (fs.existsSync(filePath))
            return res.status(400).json({ error: 'Artist with this name already exists' });
        
        const data = {};
        for (const key in rawData) 
        {
            if (!rawData.hasOwnProperty(key))
                continue;
            
            data[key.charAt(0).toUpperCase() + key.slice(1)] = rawData[key];
        }

        fs.writeFileSync(filePath, JSON.stringify(
            { 
                ID: artistID, 
                Name: name,
                ...data
            }, null, 4));
        res.status(200).json({ message: 'Artist created successfully' });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
