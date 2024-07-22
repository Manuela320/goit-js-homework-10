import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = "live_itj9PbD6GyDUwPRh4m1XA8zUatMJnFsOBk2ugpDAwZDVUhowQBT0q38IgvNxK650";

export async function fetchBreeds() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Unexpected response format');
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching breeds:", error);
        throw new Error('Failed to fetch breeds');
    }
}

export async function fetchCatByBreed(breedId) {
    try {
        if (!breedId) {
            throw new Error('No breed ID provided');
        }
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
            throw new Error('No data found for the provided breed ID');
        }
        return response.data[0];
    } catch (error) {
        console.error("Error fetching cat by breed:", error);
        throw new Error('Failed to fetch cat by breed');
    }
}