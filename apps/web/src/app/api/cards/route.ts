import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface CreditCard {
  title: string;
  image: string;
  issuer: string;
  dueDate: string;
  upperLimit: number;
  id: string;
}

export async function GET() {
  try {
    const frontmatterPath = path.join(process.cwd(), "public/_frontmatter");

    // Read all directories in _frontmatter
    const folders = fs.readdirSync(frontmatterPath);
    const cards: CreditCard[] = [];

    for (const folder of folders) {
      const jsonPath = path.join(frontmatterPath, folder, "frontmatter.json");

      if (fs.existsSync(jsonPath)) {
        const fileContent = fs.readFileSync(jsonPath, "utf-8");
        const cardData = JSON.parse(fileContent);

        cards.push({
          ...cardData,
          id: folder, // Use folder name as ID
        });
      }
    }

    // Sort cards by title
    cards.sort((a, b) => a.title.localeCompare(b.title));

    return NextResponse.json(cards);
  } catch (error) {
    console.error("Error loading cards:", error);
    return NextResponse.json({ error: "Failed to load cards" }, { status: 500 });
  }
}
