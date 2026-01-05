import fs from "fs";
import path from "path";

const frontmatterPath = path.join(process.cwd(), "public/_frontmatter");
const publicPath = path.join(process.cwd(), "public");
const cardsDir = path.join(publicPath, "cards");

// Create cards directory if it doesn't exist
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

try {
  const folders = fs.readdirSync(frontmatterPath);
  const cardIds: string[] = [];

  // Copy each card's JSON to public/cards
  for (const folder of folders) {
    const jsonPath = path.join(frontmatterPath, folder, "frontmatter.json");

    if (fs.existsSync(jsonPath)) {
      const fileContent = fs.readFileSync(jsonPath, "utf-8");
      const cardData = JSON.parse(fileContent);

      // Write card data to public/cards/{id}.json
      fs.writeFileSync(path.join(cardsDir, `${folder}.json`), JSON.stringify(cardData, null, 2));

      cardIds.push(folder);
    }
  }

  // Create manifest file
  fs.writeFileSync(path.join(publicPath, "cards-manifest.json"), JSON.stringify({ cardIds }, null, 2));

  console.log(`Generated ${cardIds.length} card JSON files and manifest`);
} catch (error) {
  console.error("Error generating card files:", error);
  process.exit(1);
}
