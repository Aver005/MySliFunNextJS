import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
const path = require('path');

class ArtistManager 
{
    constructor(dataPath) 
    {
        this.artistsPath = path.join(dataPath, 'artists');
        this.artistsFilePath = path.join(dataPath, 'Artists.json');
        this.releasesByArtistPath = path.join(dataPath, 'releases', 'ByArtist.json');
        this.artistsByReleasePath = path.join(dataPath, 'artists', 'ByRelease.json');
        this.CreateFolderIfNotExist();
    }

    CreateFolderIfNotExist() 
    {
        if (!fs.existsSync(this.artistsPath)) 
            fs.mkdirSync(this.artistsPath);
        if (!fs.existsSync(this.artistsFilePath)) 
            fs.writeFileSync(this.artistsFilePath, '{}');
        if (!fs.existsSync(this.artistsByReleasePath)) 
            fs.writeFileSync(this.artistsByReleasePath, '{}');
    }

    GetAllArtists() 
    {
        const artists = fs.readdirSync(this.artistsPath, 'utf-8');
        return artists.map((artistID) => this.GetArtist(artistID));
    }

    GetArtistsData()
    {
        return JSON.parse(fs.readFileSync(this.artistsFilePath, 'utf-8'));
    }

    GetReleases(artistID)
    {
        
    }

    NewArtist(data)
    {
        const artistID = uuidv4();
        const artistsData = this.GetArtistsData();
        artistsData[artistID] = data.ProfileName;
        artistsData[data.ProfileName] = artistID;
        data['ID'] = artistID;
        this.SaveArtistsData(artistsData);
        this.SaveArtist(artistID, data);
        return artistID;
    }

    GetArtist(artistID) 
    {
        const filePath = path.join(this.artistsPath, artistID + ".json");
        if (!fs.existsSync(filePath)) return null;
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    GetArtistByProfileName(profileName)
    {
        if (!fs.existsSync(this.artistsFilePath)) return null;
        const artistID = this.GetArtistsData()[profileName];
        return this.GetArtist(artistID);
    }

    SaveArtist(artistID, data) 
    {
        const filePath = path.join(this.artistsPath, artistID + ".json");
        fs.writeFileSync(
            filePath, 
            JSON.stringify(data, null, 4), 'utf-8'
        );
    }

    SaveArtistsData(data)
    {
        fs.writeFileSync(
            this.artistsFilePath, 
            JSON.stringify(data, null, 4)
        );
    }
}

export default ArtistManager;
