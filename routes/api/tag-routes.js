const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, as: "Tag_Product" }],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one tag by id
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: "Tag_Product" }],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
