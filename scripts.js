async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = `
        <h2>Google Sheets Data</h2>
        <pre>${JSON.stringify(data.sheetData, null, 2)}</pre>
        <h2>Price API Data</h2>
        <pre>${JSON.stringify(data.priceData, null, 2)}</pre>
    `;
}

fetchData();
