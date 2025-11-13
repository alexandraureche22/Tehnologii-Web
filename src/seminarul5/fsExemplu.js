import fs from "fs";
import { rimraf } from "rimraf";

// creează director
const folder = "./testFolder";
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
  console.log("Director creat:", folder);
}

// creează fișier în director
const filePath = `${folder}/fisier.txt`;
fs.writeFileSync(filePath, "Salut! Acesta este un fișier de test.");
console.log("Fișier creat:", filePath);

// sterge directorul
rimraf(folder)
  .then(() => console.log("Directorul a fost șters cu succes!"))
  .catch((err) => console.error("Eroare la ștergere:", err));
