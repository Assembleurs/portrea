import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { codeEpci } = req.query;

  if (!codeEpci) {
    return res.status(400).json({ message: 'codeEpci query parameter is required' });
  }

  try {
    const response = await fetch(`https://geo.api.gouv.fr/epcis/${codeEpci}/communes`);
    const data = await response.json();
    const codes = data.map(item => item.code);
    res.status(200).json(codes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
}
