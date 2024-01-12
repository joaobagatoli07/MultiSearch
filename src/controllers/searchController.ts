import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(__dirname, '../../data');

async function loadAndFilterData(filename: string, searchText: string) {
  try {
    const filePath = path.join(dataPath, filename);
    const rawData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    let filteredData;

    switch (filename) {
      case 'sales_orders.json':
      case 'purchase_orders.json':
        filteredData = data.filter((item: any) =>
          item.MaterialName.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      case 'materials.json':
        filteredData = data.filter((item: any) =>
          item.MaterialName.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      case 'equipments.json':
        filteredData = data.filter((item: any) =>
          item.EquipmentName.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      case 'workforce.json':
        filteredData = data.filter((item: any) =>
          item.Name.toLowerCase().includes(searchText.toLowerCase())
        );
        break;
      default:
        throw new Error(`Tipo de arquivo desconhecido: ${filename}`);
    }

    return filteredData;
  } catch (error) {
    console.error(`Erro ao carregar ou filtrar dados de ${filename}: ${error}`);
    throw error;
  }
}

async function normalizeData(searchText: string) {
  try {
    const salesOrders = await loadAndFilterData('sales_orders.json', searchText);
    const purchaseOrders = await loadAndFilterData('purchase_orders.json', searchText);
    const materials = await loadAndFilterData('materials.json', searchText);
    const equipments = await loadAndFilterData('equipments.json', searchText);
    const workforce = await loadAndFilterData('workforce.json', searchText);

    const normalizedData = {
      salesOrders,
      purchaseOrders,
      products: materials,
      equipments,
      workforce,
    };

    return normalizedData;
  } catch (error) {
    console.error(`Erro ao normalizar dados: ${error}`);
    throw error;
  }
}

export { normalizeData };
