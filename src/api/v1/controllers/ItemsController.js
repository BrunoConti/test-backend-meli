/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const axios = require('axios');
const itemsService = require('../services/ItemsService');
const itemDetailService = require('../services/ItemDetailService');

const findAll = (req, res) => {
  axios
    .get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`
    )
    .then(async ({ data }) => {
      const response = await itemsService.getItems(data);
      res.send(response);
    })
    .catch((err) => {
      console.log('Error', err);
      res.status(400).send({ status: 'Error', message: err.message });
    });
};

const findOne = async (req, res) => {
  try {
    const itemPromise = axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const descriptionPromise = axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );

    const [{ data: item }, { data: description }] = await Promise.all([
      itemPromise,
      descriptionPromise,
    ]);

    const response = await itemDetailService.getItemDetail({
      ...item,
      ...description,
    });
    res.send(response);
  } catch (err) {
    console.log('Error:', err);
    res.status(400).send({ status: 'Error', message: err.message });
  }
};

module.exports = { findAll, findOne };
