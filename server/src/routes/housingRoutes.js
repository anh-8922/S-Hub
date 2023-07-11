import express from 'express'
import {handleAddNewProperty,
        handleListProperties,
        handleListProperiesByUSer,
        handeleDeleteProperty,
        handleEditProperties,
        handleListOnePropery} from '../controllers/housingControllers.js'
import upload from "../config/cloudinary.js"


const router = express.Router()

router.post('/addnewproperty', upload.array('images', 5), handleAddNewProperty)
router.get ('/listproperties', handleListProperties)
router.get ('/listoneproperty/:id', handleListOnePropery)
router.get ('/listpropertiesbyuser', handleListProperiesByUSer)
router.delete('/delete/:id', handeleDeleteProperty)
router.put('/edit', upload.array('image', 5), handleEditProperties)

export default router