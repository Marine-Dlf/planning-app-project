
export const fetchEvents = async () => {
    try {
        const response = await fetch('http://localhost:5000/events');

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


export const fetchTypes = async () => {
    try {
        const res = await fetch('http://localhost:5000/types')

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json()

        return data

    } catch (error) {
      console.error('Erreur lors de la récupération des types :', error);
      return []
    }
}