const express = require('express');
const router = express.Router();
const Item = require('../../models/RentalManagementModels/Item'); 


//add default items
const addDefaultItems = async () => {
  try {
    const count = await Item.countDocuments();
    if (count === 0) { 
      const defaultItems = [
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2020/12/angel_grinder_prescott.jpg",
          itemName: "Prescott – Angle Grinder",
          description: "Rated voltage: 220-240V~50/60Hz",
          quantity: 10,
          oneDayPrice: 250
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2022/02/DIMO-DiTEC-Electric-Drill.jpg",
          itemName: "Electric Drill",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2022/02/DIMO-DiTEC-JIG-SAW.png",
          itemName: "JIG SAW",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2020/05/leiya_ly_c1301.png",
          itemName: "Impact Drill",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2023/05/Untitled-design-2023-05-30T081538.229.png",
          itemName: "Brush Cutter",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2022/02/DIMO-DiTEC-Electric-Drill.jpg",
          itemName: "Electric Drill",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2022/02/DIMO-DiTEC-Electric-Drill.jpg",
          itemName: "Electric Drill",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2022/02/DIMO-DiTEC-Electric-Drill.jpg",
          itemName: "Electric Drill",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        {
          imageUrl: "https://asirihardware.lk/wp-content/uploads/2022/02/DIMO-DiTEC-Electric-Drill.jpg",
          itemName: "Electric Drill",
          description: "DT-ED65- Rated voltage: 220-240V~50/60Hz",
          quantity: 7,
          oneDayPrice: 330
        },
        
      ];

      await Item.insertMany(defaultItems);
      console.log('Default items added successfully');
    }
  } catch (error) {
    console.error('Error adding default items:', error);
  }
};

addDefaultItems(); 




// API endpoint - get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint - add a new item
router.post('/', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint - update an existing item
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  try { 

    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(updatedItem); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint - delete an existing item
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
// API endpoint - update an existing item
router.put('/:itemName/markReceived', async (req, res) => {
  const itemName = req.params.itemName;
  try { 
    const item = await Item.findOne({ itemName });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Increase quantity by 1
    item.quantity += 1;

    const updatedItem = await item.save();

    res.json(updatedItem); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
