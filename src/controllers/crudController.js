function createCrudController(Model, label) {
  return {
    async getAll(req, res) {
      try {
        const records = await Model.find().sort({ createdAt: -1 });
        res.json(records);
      } catch (error) {
        res.status(500).json({ message: `Could not fetch ${label}.`, error: error.message });
      }
    },
    async getOne(req, res) {
      try {
        const record = await Model.findById(req.params.id);
        if (!record) return res.status(404).json({ message: `${label} not found.` });
        res.json(record);
      } catch (error) {
        res.status(400).json({ message: 'Invalid record ID.', error: error.message });
      }
    },
    async create(req, res) {
      try {
        const record = await Model.create(req.body);
        res.status(201).json({ message: `${label} created successfully.`, record });
      } catch (error) {
        res.status(400).json({ message: `Could not create ${label}.`, error: error.message });
      }
    },
    async update(req, res) {
      try {
        const record = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!record) return res.status(404).json({ message: `${label} not found.` });
        res.json({ message: `${label} updated successfully.`, record });
      } catch (error) {
        res.status(400).json({ message: `Could not update ${label}.`, error: error.message });
      }
    },
    async remove(req, res) {
      try {
        const record = await Model.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: `${label} not found.` });
        res.json({ message: `${label} deleted successfully.` });
      } catch (error) {
        res.status(400).json({ message: 'Invalid record ID.', error: error.message });
      }
    }
  };
}
module.exports = createCrudController;
