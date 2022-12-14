const { Router } = require('express');
const { body } = require('express-validator');
const { createCategory, obtainCategories, obtainCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { validateFields, validateJWT, isAdminRole } = require('../middlewares');
const { validateExistsCategory} = require('../helpers/db-validator')

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
],obtainCategories);

router.get('/:id', [
    validateJWT,
    body('id').custom(validateExistsCategory),
    validateFields
], obtainCategory);

router.post('/', [
    validateJWT,
    body( 'name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory);

router.put('/:id',[
    validateJWT,
    body( 'name', 'Name is required').not().isEmpty(),
    body('id').custom(validateExistsCategory),
    validateFields
], updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    body('id').custom(validateExistsCategory),
    validateFields
], deleteCategory);

module.exports = router;