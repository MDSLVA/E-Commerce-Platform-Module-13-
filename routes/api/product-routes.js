const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category,}, { model: Tag, through: ProductTag, as: "Product_Tag", }],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category,}, { model: Tag, through: ProductTag, as: "Product_Tag", }],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
