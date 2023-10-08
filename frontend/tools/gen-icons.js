import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { capitalize } from "lodash-es";

async function generateIndexFile() {
  const iconsFolder = "./icons";
  const indexFilePath = path.join(iconsFolder, "index.js");

  try {
    const files = await fs.readdir(iconsFolder);

    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    const exportStatements = svgFiles
      .map((file) => {
        const iconName = path
          .basename(file, ".svg")
          .split("-")
          .map(capitalize)
          .join("");

        return `export { default as ${iconName}Icon } from "./${file}";`;
      })
      .join("\n");

    await fs.writeFile(indexFilePath, exportStatements);

    console.log(chalk.green("\n✨ Generated all icons!\n"));
  } catch (err) {
    console.error("Error:", err);
  }
}

generateIndexFile();
