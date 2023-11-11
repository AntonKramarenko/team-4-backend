
const { Router } = require('express')
const router = Router()
const Object = require('../models/object')

router.get('/objects', async (req, res) => {
  try {
    const object = await Object.find()
    res.json(object)
  }catch (error){
    console.log('error', error);
    res.statusMessage = "GET error";
    res.status(400).end();
  }
})

router.post('/objects', async (req, res) => {
  try {
    const object = new Object({
      classification: req.body.classification,
      name: req.body.name,
      address: req.body.address,
      coordinates: req.body.coordinates,
      contact: req.body.contact,
      attributes: req.body.attributes,
    })
    await object.save()
    return res.sendStatus(200)
  } catch (error){
    console.log('error', error);
    res.statusMessage = "GET error";
    res.status(400).end();
  }
})

router.patch('/objects/:id', async (req, res) => {
  const objectId = req.params.id;

  try {
    const updatedObject = await Object.findOneAndUpdate(
        { id: objectId },
        {
          classification: req.body.classification,
          name: req.body.name,
          address: req.body.address,
          coordinates: req.body.coordinates,
          contact: req.body.contact,
          attributes: req.body.attributes,
        },
        { new: true }
    );

    if (!updatedObject) {
      return res.status(404).json({ error: 'Object not found' });
    }

    res.json(updatedObject);
  } catch (error) {
    console.log('error', error);
    res.statusMessage = "An error occurred while updating the object";
    res.status(400).end();

  }
});

router.delete('/objects/:id', async (req, res) => {
  try {
    await Object.findOneAndDelete({ id: req.params.id })
    const cards = await Object.find()

    res.json(cards)
  } catch (error){
    console.log('error', error);
    res.statusMessage = "GET error";
    res.status(400).end();
  }
})

module.exports = router
