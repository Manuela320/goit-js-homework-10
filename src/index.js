import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', async () => {
    const breedSelect = document.querySelector('.breed-select');
    const loader = document.querySelector('.loader');
    const error = document.querySelector('.error');
    const catInfo = document.querySelector('.cat-info');
    const catImage = document.querySelector('.cat-image');
    const catName = document.querySelector('.cat-name');
    const catDescription = document.querySelector('.cat-description');
    const catTemperament = document.querySelector('.cat-temperament');

    async function loadBreeds() {
        loader.hidden = false;
        breedSelect.hidden = true;
        try {
            const breeds = await fetchBreeds();
            if (!breeds || breeds.length === 0) {
                throw new Error('No breeds found');
            }
            breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
            new SlimSelect({ select: breedSelect });
            breedSelect.hidden = false;
        } catch (e) {
            error.hidden = false;
            console.error('Error fetching breeds:', e);
        } finally {
            loader.hidden = true;
        }
    }

    breedSelect.addEventListener('change', async () => {
        const breedId = breedSelect.value;
        if (!breedId) return;

        loader.hidden = false;
        catInfo.hidden = true;
        error.hidden = true;
        try {
            const cat = await fetchCatByBreed(breedId);
            if (!cat || !cat.breeds || cat.breeds.length === 0) {
                throw new Error('No cat information found');
            }
            catImage.src = cat.url;
            catName.textContent = cat.breeds[0].name;
            catDescription.textContent = cat.breeds[0].description;
            catTemperament.textContent = cat.breeds[0].temperament;
            catInfo.hidden = false;
        } catch (e) {
            error.hidden = false;
            Notiflix.Notify.failure('Failed to load cat information.');
            console.error('Error fetching cat by breed:', e);
        } finally {
            loader.hidden = true;
        }
    });

    loadBreeds();
});