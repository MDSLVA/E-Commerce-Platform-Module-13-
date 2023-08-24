const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, as: "productsInCategory" }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by id with associated Products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: "productsInCategory" }]
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
