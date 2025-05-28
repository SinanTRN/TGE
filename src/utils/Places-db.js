import * as SQLite from "expo-sqlite";

let database;

export async function openDBAsync() {
    if(database) return;
    database = await SQLite.openDatabaseAsync("locations.db");
}

// 'type' alanı: "donation" veya "volunteer"
export async function init() {
    return database.runAsync(
        `CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
    );`
    );
}

export function insertLocation({ title, type, address, lat, lng }) {
    return database.runAsync(
        "INSERT INTO locations (title, type, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
        [title, type, address, lat, lng]
    );
}

export async function fetchAllLocations() {
    const allRows = await database.getAllAsync("SELECT * FROM locations");
    return allRows;
}
