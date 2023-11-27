import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
const path = require('path');

class ReleaseManager 
{
    constructor(dataPath) 
    {
        this.releasesPath = path.join(dataPath, 'releases');
        this.releasesFilePath = path.join(dataPath, 'Releases.json');
        this.releasesByArtistPath = path.join(dataPath, 'releases', 'ByArtist.json');
        this.artistsByReleasePath = path.join(dataPath, 'artists', 'ByRelease.json');
        this.СreateFolderIfNotExist();
    }

    СreateFolderIfNotExist() 
    {
        if (!fs.existsSync(this.releasesPath))
            fs.mkdirSync(this.releasesPath);
        if (!fs.existsSync(this.releasesFilePath)) 
            fs.writeFileSync(this.releasesFilePath, '{}');
        if (!fs.existsSync(this.releasesByArtistPath)) 
            fs.writeFileSync(this.releasesByArtistPath, '{}');
    }

    GetAllReleases() 
    {
        const releases = fs.readdirSync(this.releasesPath, 'utf-8');
        return releases.map((releaseID) => this.GetRelease(releaseID));
    }

    GetRelease(releaseID) 
    {
        const filePath = path.join(this.releasesPath, releaseID);

        if (fs.existsSync(filePath)) 
        {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }

        return null;
    }

    NewRelease(data)
    {
        const releaseID = uuidv4();
        let releasesData = {};

        if (fs.existsSync(this.releasesFilePath)) 
        {
            const fileContent = fs.readFileSync(this.releasesFilePath, 'utf-8');
            releasesData = JSON.parse(fileContent);
        }

        releasesData[releaseID] = data.name;
        releasesData[data.name] = releaseID;
        fs.writeFileSync(this.releasesFilePath, JSON.stringify(releasesData, null, 4));
        this.SaveRelease(releaseID, data);
    }

    SaveRelease(releaseID, data)
    {
        const filePath = path.join(this.releasesPath, releaseID);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
    }
}

export default ReleaseManager;
