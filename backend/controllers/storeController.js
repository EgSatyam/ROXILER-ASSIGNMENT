const { Store, Rating, sequelize } = require('../models');

exports.listStores = async (req, res, next) => {
  try {
    const { name, address } = req.query;
    const where = {};
    if (name) where.name = { [sequelize.Op.like]: `%${name}%` };
    if (address) where.address = { [sequelize.Op.like]: `%${address}%` };
    const stores = await Store.findAll({ where });
    const results = await Promise.all(stores.map(async s => {
      const avgRow = await Rating.findAll({ where: { store_id: s.id }, attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg']] });
      const avg = parseFloat(avgRow[0].get('avg')) || null;
      return { id: s.id, name: s.name, address: s.address, overallRating: avg };
    }));
    res.json(results);
  } catch (err) { next(err); }
};
