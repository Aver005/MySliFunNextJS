export const API_URL = 'http://localhost:3000/api'; // Замените на свой URL API
export const API_KEY = "Test";
export const API_ACTUAL_VERSION = "v1";

export async function Fetch(object, action, version = API_ACTUAL_VERSION, data = {}) 
{
    let url = `${API_URL}/${version}/${object}/${action}?key=${API_KEY}`;
  
    for (let parameter in data) 
    {
        if (!data.hasOwnProperty(parameter))
            continue;
        url += `&${parameter}=${encodeURIComponent(data[parameter])}`;
    }

    console.log(url, data);
    
    return await (await fetch(url)).json();
  }
  