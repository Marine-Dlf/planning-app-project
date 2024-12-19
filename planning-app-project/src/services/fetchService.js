
const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();         // If the response is correct, we extract the JSON data from the response

        if (!Array.isArray(data)) {                 // Check if data is an array
          throw new Error('Les données renvoyées ne sont pas valides.');
        }
        return data

    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        return []
    }
};


export const fetchEvents = () => fetchData('http://localhost:5000/events');
export const fetchTypes = () => fetchData('http://localhost:5000/types');