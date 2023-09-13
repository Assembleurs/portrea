import { promises as fs } from 'fs';
import path from 'path';

export default async (req, res) => {
    const { inseecode } = req.query;

    if (!inseecode) {
        return res.status(400).json({ error: 'inseecode parameter is required' });
    }

    try {
        // Load the JSON file
        const filePath = path.join(process.cwd(), '/data/france-services/cnum.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        let sumFormation = 0;
        let sumFormed = 0;
        let sumRecruited = 0;
        let SumAttributed = 0;
        let StructuresCount = 0;

        // Sum up the numbers based on the insee code
        for (let key in data) {
            const item = data[key];
            if (item["Code commune Insee"].toString() === inseecode) {
                sumFormation += Number(item["Nb de conseillers en formation"]);
                sumFormed += Number(item["Nb de conseillers formés"]);
                sumRecruited += Number(item["Nb de conseillers recrutés"]);
                SumAttributed += Number(item["Nb de conseillers attribués"]);
                StructuresCount += 1;
            }
        }

        return res.status(200).json({
            "Nb de conseillers en formation": sumFormation,
            "Nb de conseillers formés": sumFormed,
            "Nb de conseillers recrutés": sumRecruited,
            "Nb de conseillers attribués": SumAttributed,
            "StructuresCount": StructuresCount
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
};
