/* eslint-disable linebreak-style */
const itemsSchema = require('../models/Items');

const getItems = async (data) => {
  const items = [];
  await data.results.forEach((i) => {
    const price = JSON.stringify(i.price).split('.');
    items.push({
      id: i.id,
      title: i.title,
      price: {
        currency: i.currency_id,
        amount: parseInt(price[0], 10),
        decimals: price[1] ? price[1] : 0,
      },
      picture: i.thumbnail,
      condition: i.condition,
      free_shipping: i.shipping.free_shipping,
      address: i.address.state_name,
    });
  });

  const categories =
    data.filters && data.filters.length
      ? data.filters
          .find((f) => f.id === 'category')
          .values[0].path_from_root.map((c) => c.name)
      : [];

  const response = await itemsSchema.validateAsync({
    author: {
      name: 'Bruno',
      lastname: 'Conti',
    },
    categories,
    items,
  });

  return response;
};

module.exports = { getItems };
