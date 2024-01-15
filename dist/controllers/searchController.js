"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeData = void 0;
// Import required modules and dependencies
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
// Define the path to the data directory
const dataPath = path_1.default.join(__dirname, '../../data');
// Function to load and filter data based on filename and search text
function loadAndFilterData(filename, searchText) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Construct the file path
            const filePath = path_1.default.join(dataPath, filename);
            // Read the raw data from the file
            const rawData = yield promises_1.default.readFile(filePath, 'utf-8');
            // Parse the raw data into a JavaScript object
            const data = JSON.parse(rawData);
            // Initialize a variable to store the filtered data
            let filteredData;
            // Switch based on the filename to apply specific filters
            switch (filename) {
                case 'sales_orders.json':
                case 'purchase_orders.json':
                    // Filter sales and purchase orders based on MaterialName
                    filteredData = data.filter((item) => item.MaterialName.toLowerCase().includes(searchText.toLowerCase()));
                    break;
                case 'materials.json':
                    // Filter materials based on MaterialName
                    filteredData = data.filter((item) => item.MaterialName.toLowerCase().includes(searchText.toLowerCase()));
                    break;
                case 'equipments.json':
                    // Filter equipments based on EquipmentName
                    filteredData = data.filter((item) => item.EquipmentName.toLowerCase().includes(searchText.toLowerCase()));
                    break;
                case 'workforce.json':
                    // Filter workforce based on Name
                    filteredData = data.filter((item) => item.Name.toLowerCase().includes(searchText.toLowerCase()));
                    break;
                default:
                    // Throw an error for unknown file types
                    throw new Error(`Tipo de arquivo desconhecido: ${filename}`);
            }
            // Return the filtered data
            return filteredData;
        }
        catch (error) {
            // Handle errors by logging them to the console and rethrowing
            console.error(`Erro ao carregar ou filtrar dados de ${filename}: ${error}`);
            throw error;
        }
    });
}
// Function to normalize data by calling loadAndFilterData for each data type
function normalizeData(searchText) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call loadAndFilterData for each data type
            const salesOrders = yield loadAndFilterData('sales_orders.json', searchText);
            const purchaseOrders = yield loadAndFilterData('purchase_orders.json', searchText);
            const materials = yield loadAndFilterData('materials.json', searchText);
            const equipments = yield loadAndFilterData('equipments.json', searchText);
            const workforce = yield loadAndFilterData('workforce.json', searchText);
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
        }
        catch (error) {
            // Handle errors by logging them to the console and rethrowing
            console.error(`Erro ao normalizar dados: ${error}`);
            throw error;
        }
    });
}
exports.normalizeData = normalizeData;
