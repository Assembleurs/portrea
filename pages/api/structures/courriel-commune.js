import fs from 'fs';
import path from 'path';

// Your JSON data file path. Replace it with your actual file path.
const filePath = path.join(process.cwd(), '/data/structures/code_insee_to_courriel.json');

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { codeinsee } = req.query;

  if (!codeinsee) {
    return res.status(400).json({ error: 'codeinsee is required' });
  }

  // Read JSON file
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);

  const courriels = data[codeinsee];

  if (!courriels) {
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json({ courriels });
}
