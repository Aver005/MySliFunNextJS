import { API_KEY } from '@api';

import fs from 'fs';
import path from 'path';

export default async function handler(req, res)
{
    const { key, limit } = req.query;

    if (key != API_KEY)
        return res.status(401).json({ message: 'Unauthorized' });

    try 
    {
        const artists = [];
        const artistsDir = path.join(process.cwd(), 'data', 'artists');
        const files = await fs.promises.readdir(artistsDir);

        for (const artistFile of files) 
        {
            const filePath = path.join(artistsDir, artistFile);
            const stats = await fs.promises.stat(filePath);

            if (!stats.isFile())
                continue;
            
            if (!fs.existsSync(filePath)) 
                continue;
            
            // Читаем файл и десериализуем JSON
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            artists.push(JSON.parse(fileContent));
        }
    
        res.status(200).json({ 
            artists: limit ? artists.slice(0, parseInt(limit, 10)) : artists
        });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
