import { Router } from 'express';
const { get, getById, create, updateById, deleteById } = require('../controllers/Product');

const router = Router();

router.get('/', get);
router.get('/:_id', getById);
router.post('/', create);
router.put('/:_id', updateById);
router.delete('/:_id', deleteById);

export default router;
