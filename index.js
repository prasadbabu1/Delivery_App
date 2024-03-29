const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Organization, Item, Pricing, PriceCalculation } = require('./Schema');
const app = express();

app.use(bodyParser.json());

const connectToMongoDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://Delivery_App:Delivery_App@cluster0.cafokwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Failed to connect to MongoDB Atlas', error);
    }
  };
  
  connectToMongoDB();

app.post('/api/calculate-price', async (req, res) => {
  const { zone, organization_id, total_distance, item_type } = req.body;

  if (!zone || !organization_id || !total_distance || !item_type) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  const organization = await Organization.findOne({ id: organization_id });
  const item = await Item.findOne({ type: item_type });
  const pricing = await Pricing.findOne({
    organization_id: organization_id,
    item_id: item_type,
    zone: zone,
  });

  if (!organization || !item || !pricing) {
    return res.status(404).send({ error: 'Organization, Item, or Pricing not found' });
  }

  const price = PriceCalculation(
    total_distance,
    item_type,
    pricing.fix_price,
    pricing.base_distance_in_km,
    pricing.km_price
  );

  res.send({ total_price: price });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));