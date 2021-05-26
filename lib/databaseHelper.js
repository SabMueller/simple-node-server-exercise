import fs from 'fs';

export function saveToDatabase(database, databaseFile = 'db.json') {
  fs.writeFile(databaseFile, JSON.stringify(database, null, 2), (error) => {
    if (error) {
      console.errer(error.message);
      response.json({
        success: false,
        message: 'Database could not be written.',
      });
    }
  });
}

export function loadFromDatabase(databaseFile = 'db.json') {
  try {
    const database = fs.readFileSync(databaseFile);
    //sync funktionen sind nicht so gut, da die anwendung wartet bis alle sync dateien geladen sind
    return JSON.parse(database);
  } catch (error) {
    console.error(error.message);
    return;
  }
}
