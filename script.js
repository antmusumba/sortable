const API_URL = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';
let heroes = [];
let displayedHeroes = [];

const fetchData = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        heroes = data;
        renderTable(heroes);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const renderTable = (heroes) => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    displayedHeroes = heroes.slice(0, getPageSize());

    displayedHeroes.forEach(hero => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
            <td>${hero.name}</td>
            <td>${hero.biography.fullName}</td>
            <td>${Object.entries(hero.powerstats).map(([key, value]) => `${key}: ${value}`).join(', ')}</td>
            <td>${hero.appearance.race}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.appearance.height.join(', ')}</td>
            <td>${hero.appearance.weight}</td>
            <td>${hero.biography.placeOfBirth}</td>
            <td>${hero.biography.alignment}</td>
        `;
        row.addEventListener('click', () => showDetails(hero));
        tableBody.appendChild(row);
    });
};

const showDetails = (hero) => {
    document.getElementById('detailName').textContent = hero.name;
    document.getElementById('detailImage').src = hero.images.lg;
    document.getElementById('detailFullName').textContent = hero.biography.fullName;
    // Populate other details as needed
    document.getElementById('detailView').style.display = 'block';
};

document.getElementById('closeDetail').addEventListener('click', () => {
    document.getElementById('detailView').style.display = 'none';
});

const getPageSize = () => {
    const pageSize = document.getElementById('pageSize').value;
    return pageSize === 'all' ? heroes.length : parseInt(pageSize, 10);
};

const searchHeroes = () => {
    const field = document.getElementById('searchField').value;
    const query = document.getElementById('searchInput').value.toLowerCase();
    const operator = document.getElementById('searchOperator').value;

    const filteredHeroes = heroes.filter(hero => {
        let value = hero;
        field.split('.').forEach(key => {
            value = value[key];
        });
        value = value?.toString().toLowerCase() || '';

        switch (operator) {
            case 'include':
                return value.includes(query);
            case 'exclude':
                return !value.includes(query);
            case 'fuzzy':
                return fuzzySearch(value, query); // Implement fuzzy search
            case 'equal':
                return value === query;
            case 'notEqual':
                return value !== query;
            case 'greaterThan':
                return Number(value) > Number(query);
            case 'lesserThan':
                return Number(value) < Number(query);
            default:
                return false;
        }
    });

    renderTable(filteredHeroes);
};

const fuzzySearch = (value, query) => {
    // Implement fuzzy search algorithm if needed
    return value.includes(query); // Simple includes for now
};

document.getElementById('searchInput').addEventListener('input', searchHeroes);
document.getElementById('pageSize').addEventListener('change', () => {
    renderTable(heroes);
});

fetchData();
