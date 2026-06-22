import { Client, ID, Query, TablesDB } from "appwrite";

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
    // if searchTerm bad, exit; else, log and continue
    if (!searchTerm?.trim()) {
        return;
    } else {
        console.log(`search term: ${searchTerm}`); // log searchTerm
    } 
    
    try {
        // 1. use Appwrite SDK to check if the search term exists in the db
        // returns smth like {total:0, rows:[{id:"djlsfa", searchTerm:"dsafkj", ...}], toString:f} 
        const searchTermRows = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            queries: [
                Query.equal('searchTerm', [searchTerm])
            ]
        });

        // 2. if search term is not in db, create a new row with the search term and count as 1
        if (searchTermRows.total === 0) {
            console.log(`${searchTerm} does not exist in db. Adding...`);
            
            const newRow = await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: {
                    "searchTerm": searchTerm,
                    "count": 1,
                    "poster_url": movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png',
                    "movie_id": movie.id
                }
            });
            console.log("added row!", newRow);

        } else {
            // 3. if search term is in db, update the count
            console.log(`${searchTerm} is in db. Updating the count...`);

            const updatedRow = await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: searchTermRows.rows[0].$id,
                data: {
                    "count": searchTermRows.rows[0].count + 1
                }
            });

            console.log("count updated!", updatedRow);
        }

    } catch (error) {
        console.error(error);
    }

    // 2. if it does, update the count
    // 3. if it doesn't, create a new row with the search term and count as 1
}