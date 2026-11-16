const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/updates.json');

async function readUpdates() {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}
async function writeUpdates(updates) {
  await fs.writeFile(filePath, JSON.stringify(updates, null, 2));
}

exports.getUpdates = async (req, res) => {
  try { res.json(await readUpdates()); }
  catch (error) { res.status(500).json({ message: 'Could not read updates.', error: error.message }); }
};
exports.addUpdate = async (req, res) => {
  try {
    const updates = await readUpdates();
    const update = { id: Date.now(), title: req.body.title, category: req.body.category || 'Announcement', description: req.body.description || '', date: req.body.date || new Date().toISOString().slice(0, 10) };
    if (!update.title) return res.status(400).json({ message: 'Title is required.' });
    updates.push(update); await writeUpdates(updates);
    res.status(201).json({ message: 'Update added.', record: update });
  } catch (error) { res.status(500).json({ message: 'Could not add update.', error: error.message }); }
};
exports.editUpdate = async (req, res) => {
  try {
    const updates = await readUpdates();
    const index = updates.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Update not found.' });
    updates[index] = { ...updates[index], ...req.body, id: updates[index].id };
    await writeUpdates(updates); res.json({ message: 'Update edited.', record: updates[index] });
  } catch (error) { res.status(500).json({ message: 'Could not edit update.', error: error.message }); }
};
exports.deleteUpdate = async (req, res) => {
  try {
    const updates = await readUpdates();
    const remaining = updates.filter(item => item.id !== Number(req.params.id));
    if (remaining.length === updates.length) return res.status(404).json({ message: 'Update not found.' });
    await writeUpdates(remaining); res.json({ message: 'Update deleted.' });
  } catch (error) { res.status(500).json({ message: 'Could not delete update.', error: error.message }); }
};
