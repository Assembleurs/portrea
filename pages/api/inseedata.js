import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const { id } = req.query;

    // Call the existing API
    const response = await fetch(`https://portrea-js.vercel.app/api/locationmatch?id=${id}`);
    const data = await response.json();

    // Extract the specified fields from each object
    const extractedData = data.map(item => {
      const record = item?.record;
      if (record && record.fields) {
        return {
          ind_40_54: record.fields.ind_40_54 || 0,
          ind_25_39: record.fields.ind_25_39 || 0,
          men_pauv: record.fields.men_pauv || 0,
          log_soc: record.fields.log_soc || 0,
          log_ap_90: record.fields.log_ap_90 || 0,
          log_70_90: record.fields.log_70_90 || 0,
          ind_0_3: record.fields.ind_0_3 || 0,
          log_45_70: record.fields.log_45_70 || 0,
          ind_6_10: record.fields.ind_6_10 || 0,
          ind_11_17: record.fields.ind_11_17 || 0,
          ind_80p: record.fields.ind_80p || 0,
          men_surf: record.fields.men_surf || 0,
          ind_55_64: record.fields.ind_55_64 || 0,
          ind_65_79: record.fields.ind_65_79 || 0,
          men_fmp: record.fields.men_fmp || 0,
          men_coll: record.fields.men_coll || 0,
          log_av45: record.fields.log_av45 || 0,
          ind_inc: record.fields.ind_inc || 0,
          pop_carr: record.fields.pop_carr || 0,
          ind_18_24: record.fields.ind_18_24 || 0,
          men: record.fields.men || 0,
          log_soc: record.fields.log_soc || 0,
          men_1ind: record.fields.men_1ind || 0,
          men_5ind: record.fields.men_5ind || 0,
        };
      }
      return null;
    }).filter(item => item !== null);

    // Aggregate the values
    const aggregatedData = extractedData.reduce((accumulator, currentValue) => {
      for (const key in currentValue) {
        if (currentValue.hasOwnProperty(key)) {
          accumulator[key] = (accumulator[key] || 0) + currentValue[key];
        }
      }
      return accumulator;
    }, {});

    res.status(200).json(aggregatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
