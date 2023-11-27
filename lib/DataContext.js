import path from 'path';
import ReleaseManager from 'models/ReleasesManager';
import ArtistManager from 'models/ArtistsManager';

const dataPath = path.join(process.cwd(), 'data');
const releaseManager = new ReleaseManager(dataPath);
const artistManager = new ArtistManager(dataPath);

export { releaseManager, artistManager };
