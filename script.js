document.addEventListener('DOMContentLoaded', function() {
    let heroes = [];
    let currentPage = 1;
    let itemsPerPage = 20;
    let currentSortColumn = 'name';
    let isAscending = true;

    function loadData(data) {
        heroes = data;
        sortHeroes(currentSortColumn, isAscending);
        renderTable();
        renderPagination();
    }

    function renderTable() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filteredHeroes = heroes.filter(hero => 
            hero.name.toLowerCase().includes(searchTerm)
        );

        const tbody = document.querySelector('#heroTable tbody');
        tbody.innerHTML = '';

        let startIndex, endIndex;
        if (itemsPerPage === 'all') {
            startIndex = 0;
            endIndex = filteredHeroes.length;
        } else {
            startIndex = (currentPage - 1) * parseInt(itemsPerPage);
            endIndex = Math.min(startIndex + parseInt(itemsPerPage), filteredHeroes.length);
        }

        for (let i = startIndex; i < endIndex; i++) {
            const hero = filteredHeroes[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
                <td>${hero.name}</td>
                <td>${hero.biography.fullName || ''}</td>
                <td>${hero.powerstats.intelligence}</td>
                <td>${hero.powerstats.strength}</td>
                <td>${hero.powerstats.speed}</td>
                <td>${hero.powerstats.durability}</td>
                <td>${hero.powerstats.power}</td>
                <td>${hero.powerstats.combat}</td>
                <td>${hero.appearance.race || ''}</td>
                <td>${hero.appearance.gender || ''}</td>
                <td>${hero.appearance.height[1] || ''}</td>
                <td>${hero.appearance.weight[1] || ''}</td>
                <td>${hero.biography.placeOfBirth || ''}</td>
                <td>${hero.biography.alignment || ''}</td>
            `;
            tbody.appendChild(row);
        }
        renderPagination();
    }

    function renderPagination() {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        if (itemsPerPage === 'all') return;

        const totalPages = Math.ceil(heroes.length / parseInt(itemsPerPage));

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        paginationDiv.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.disabled = currentPage === i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderTable();
            });
            paginationDiv.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
        paginationDiv.appendChild(nextButton);
    }

    function sortHeroes(column, ascending = true) {
        currentSortColumn = column;
        isAscending = ascending;

        heroes.sort((a, b) => {
            let valueA = getNestedValue(a, column);
            let valueB = getNestedValue(b, column);

            const isValueAMissing = valueA === null || valueA === undefined || valueA === 'N/A' || valueA === '-' || valueA === '';
            const isValueBMissing = valueB === null || valueB === undefined || valueB === 'N/A' || valueB === '-' || valueB === '';

            if (isValueAMissing && isValueBMissing) return 0;
            if (isValueAMissing) return ascending ? 1 : -1;
            if (isValueBMissing) return ascending ? -1 : 1;

            if (column === 'appearance.weight') {
                valueA = parseFloat(valueA[1].toLowerCase().replace(/[^\d.]/g, ''));
                valueB = parseFloat(valueB[1].toLowerCase().replace(/[^\d.]/g, ''));
            } 
            else if (column === 'appearance.height') {
                valueA = parseFloat(valueA[1].split(' ')[0]);
                valueB = parseFloat(valueB[1].split(' ')[0]);
            } 
            else if (typeof valueA === 'string' && typeof valueB === 'string') {
                valueA = valueA.trim().toLowerCase();
                valueB = valueB.trim().toLowerCase();
                return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }

            if (valueA < valueB) return ascending ? -1 : 1;
            if (valueA > valueB) return ascending ? 1 : -1;
            return 0;
        });

        renderTable();
    }

    function getNestedValue(obj, path) {
        const keys = path.split('.');
        let value = obj;
        for (const key of keys) {
            if (value && value.hasOwnProperty(key)) {
                value = value[key];
            } else {
                return '';
            }
        }
        return value;
    }

    document.getElementById('search').addEventListener('input', () => {
        currentPage = 1;
        renderTable();
    });

    document.getElementById('pageSize').addEventListener('change', function(e) {
        itemsPerPage = e.target.value;
        currentPage = 1;
        renderTable();
    });

    document.querySelectorAll('#heroTable th').forEach(th => {
        th.addEventListener('click', function() {
            const column = this.dataset.sort;
            if (column === currentSortColumn) {
                isAscending = !isAscending;
            } else {
                isAscending = true;
            }
            sortHeroes(column, isAscending);
        });
    });

    const dataUrl = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';
    fetch(dataUrl)
        .then(response => response.json())
        .then(loadData)
        .catch(error => console.error('Error loading data:', error));
});