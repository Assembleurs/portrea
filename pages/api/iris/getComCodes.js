import fetch from 'node-fetch';

export async function getComCodes(codeEpci) {
  // Load epci data from API
  const response = await fetch(`https://geo.api.gouv.fr/epcis/${codeEpci}/communes`);
  const epciData = await response.json();

  // Extract com codes for the specified codeEpci
  return epciData.map(commune => commune.code);
}
