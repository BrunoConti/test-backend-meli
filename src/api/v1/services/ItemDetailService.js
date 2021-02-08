/* eslint-disable linebreak-style */
const itemsDetailSchema = require('../models/ItemDetail');

const getItemDetail = async (data) => {
  const price = JSON.stringify(data.price).split('.');

  const item = {
    id: data.id,
    title: data.title,
    price: {
      currency: data.currency_id,
      amount: price[0],
      decimals: price[1] ? price[1] : 0,
    },
    picture: data.pictures[0].url,
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
    sold_quantity: data.sold_quantity,
    description: data.plain_text,
  };

  const response = await itemsDetailSchema.validateAsync({
    author: {
      name: 'Bruno',
      lastname: 'Conti',
    },
    item,
  });

  return response;
};

module.exports = { getItemDetail };
