# Sortable Superhero Database

## Project Overview
This web application organizes and displays information about superheroes from various universes. It fetches data from a JSON file and presents it in an interactive, sortable, and searchable table format.

## Features
- Fetches superhero data from a remote JSON file
- Displays data in a responsive table
- Supports pagination with adjustable page sizes
- Provides real-time search functionality
- Enables sorting on all columns
- Optimized for performance with large datasets

## Technical Implementation

### Data Fetching and Initialization
The application uses the Fetch API to retrieve superhero data. The `loadData` function initializes the app, populating the heroes array and triggering the initial render.

### Table Rendering
The `renderTable` function is the core of the display logic. It filters heroes based on search criteria, applies pagination, and dynamically generates table rows. This function ensures that only the relevant data is displayed, improving performance.

### Pagination
`renderPagination` creates and updates pagination controls. It calculates the total number of pages based on the current page size and data set, allowing users to navigate through large sets of data efficiently.

### Sorting
The `sortHeros` function implements a flexible sorting mechanism. It handles various data types, including nested object properties, and ensures consistent sorting behavior. The function also properly handles missing or undefined values, always sorting them last.

### Data Access
`getNestedValue` is a utility function that allows easy access to nested object properties. This function is crucial for handling the complex structure of the superhero data, enabling sorting and display of deeply nested information.

### Event Handling
The script sets up event listeners for user interactions such as searching, changing page size, and sorting columns. These listeners trigger appropriate functions to update the display in real-time.

## Usage
- Open `index.html` in a web browser
- Use the search bar to filter heroes by name
- Click column headers to sort the data
- Adjust results per page using the dropdown
- Navigate through pages with the pagination controls

## Data Source
Superhero data is fetched from: https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json

## Contributing
Contributions are welcome. Please fork the repository, create a new branch for your changes, and submit a pull request.


