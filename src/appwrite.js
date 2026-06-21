import { Client, Query, TablesDB } from "appwrite";

// collections -> table
// documents -> rows
// attributes -> columns

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint('https://sfo.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. use Appwrite SDK to check if the search term exists in the db

    try {
        const result = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal('searchTerm', [searchTerm])
            ]
        });

        console.log(result);
    } catch (error) {
        console.error(error);
    }

    // 2. if it does, update the count
    // 3. if it doesn't, create a new row with the search term and count as 1
}