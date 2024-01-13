// Import required modules and dependencies
import fs from 'fs/promises';
import path from 'path';

// Define the path to the data directory
const dataPath = path.join(__dirname, '../../data');

// Function to load and filter data based on filename and search text
async function loadAndFilterData(filename: string, searchText: string) {
  try {
    // Construct the file path
    const filePath = path.join(dataPath, filename);

    // Read the raw data from the file
    const rawData = await fs.readFile(filePath, 'utf-8');

    // Parse the raw data into a JavaScript object
    const data = JSON.parse(rawData);

    // Initialize a variable to store the filtered data
    let filteredData;

    // Switch based on the filename to apply specific filters
    switch (filename) {
      case 'sales_orders.json':
      case 'purchase_orders.json':
        // Filter sales and purchase orders based on MaterialName
        filteredData = data.filter((item: any) =>
          item.MaterialName.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      case 'materials.json':
        // Filter materials based on MaterialName
        filteredData = data.filter((item: any) =>
          item.MaterialName.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      case 'equipments.json':
        // Filter equipments based on EquipmentName
        filteredData = data.filter((item: any) =>
          item.EquipmentName.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      case 'workforce.json':
        // Filter workforce based on Name
        filteredData = data.filter((item: any) =>
          item.Name.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      default:
        // Throw an error for unknown file types
        throw new Error(`Tipo de arquivo desconhecido: ${filename}`);
    }

    // Return the filtered data
    return filteredData;
  } catch (error) {
    // Handle errors by logging them to the console and rethrowing
    console.error(`Erro ao carregar ou filtrar dados de ${filename}: ${error}`);
    throw error;
  }
}

// Function to normalize data by calling loadAndFilterData for each data type
async function normalizeData(searchText: string) {
  try {
    // Call loadAndFilterData for each data type
    const salesOrders = await loadAndFilterData('sales_orders.json', searchText);
    const purchaseOrders = await loadAndFilterData('purchase_orders.json', searchText);
    const materials = await loadAndFilterData('materials.json', searchText);
    const equipments = await loadAndFilterData('equipments.json', searchText);
    const workforce = await loadAndFilterData('workforce.json', searchText);

    // Organize the normalized data
    const normalizedData = {
      salesOrders,
      purchaseOrders,
      products: materials,
      equipments,
      workforce,
    };

    // Return the normalized data
    return normalizedData;
  } catch (error) {
    // Handle errors by logging them to the console and rethrowing
    console.error(`Erro ao normalizar dados: ${error}`);
    throw error;
  }
}

// Export the normalizeData function
export { normalizeData };