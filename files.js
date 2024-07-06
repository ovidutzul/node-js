const fs = require (`fs`).promises;

async function listFilesInDirectory() {
  try {
    const files = await fs.readdir(__dirname);
    console.log(files);

    const fileDetails = await Promise.all(
      files.map(async filename => {
        const stats = await fs.stat(filename);
        return {
         Name: filename,
         Size: stats.size,
         Date: stats.mtime
        }
      })
    );

    console.table(fileDetails);
  } catch (err) {
    console.error(err.message);
  }   
}

async function exampleFileOperations() {
  const filename = 'example.txt';

  try {

    // Scriem intr-un fisier
    await fs.writeFile(filename, 'Hello, World!', 'utf8');
    console.log('Fisierul a fost scris cu succes:');
    
    // Citim continutul fisierului
    const data = await fs.readFile(filename, 'utf8');
    console.log('Continutul fisierului:', data);
    
    // Adaugam text in fisier
    await fs.appendFile(filename, '\nThis is an appended line.', 'utf8');
    console.log('Textul a fost adaugat cu succes.');
  
    // Redenumim fisierul
    const newFilename = 'example-renamed.txt'; 
    await fs.rename(filename, newFilename);
    console.log(`Fisierul a fost redenumit in ${newFilename}.`);

    // Stergem fisierul
    await fs.unlink(newFilename);
    console.log('Fisierul a fost sters cu succes:');
 
  } catch (err) {
    // Gestionam eventualele erori
    console.log(err.message);
  }

}

listFilesInDirectory ();
exampleFileOperations();