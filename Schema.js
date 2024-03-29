const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const Organization = mongoose.model('Organization', organizationSchema);

const itemSchema = new mongoose.Schema({
  id: String,
  type: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

const pricingSchema = new mongoose.Schema({
  organization_id: String, 
  item_id: String,
  zone: String,
  base_distance_in_km: Number,
  km_price: Number,
  fix_price: Number,
});

const Pricing = mongoose.model('Pricing', pricingSchema);

module.exports = {
  Organization,
  Item,
  Pricing,
};