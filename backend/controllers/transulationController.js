import express from 'express';
import Transulation from '../models/transulationModel.js';

const router = express.Router();

// Create a new transulation entry (POST)
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const { roomName, deviceName, pin } = req.body;
    const newTransulation = await Transulation.create({ roomName, deviceName, pin });
    console.log(newTransulation);
    res.status(201).json(newTransulation);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to create transulation', details: error.message });
  }
});

// Get all transulation entries (GET)
router.get('/', async (req, res) => {
  try {
    const transulations = await Transulation.findAll();
    res.status(200).json(transulations);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to retrieve transulations', details: error.message });
  }
});

// Get a specific transulation entry by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const transulation = await Transulation.findByPk(req.params.id);
    if (transulation) {
      res.status(200).json(transulation);
    } else {
      res.status(404).json({ error: 'Transulation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transulation', details: error.message });
  }
});

// Update a specific transulation entry by ID (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { roomName, deviceName, pin } = req.body;
    const transulation = await Transulation.findByPk(req.params.id);
    if (transulation) {
      transulation.roomName = roomName || transulation.roomName;
      transulation.deviceName = deviceName || transulation.deviceName;
      transulation.pin = pin || transulation.pin;
      await transulation.save();
      res.status(200).json(transulation);
    } else {
      res.status(404).json({ error: 'Transulation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transulation', details: error.message });
  }
});

// Delete a specific transulation entry by ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const transulation = await Transulation.findByPk(req.params.id);
    if (transulation) {
      await transulation.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Transulation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transulation', details: error.message });
  }
});

export default router;
