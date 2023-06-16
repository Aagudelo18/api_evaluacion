

const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{gestionGet, gestionPost, gestionPut, gestionDelete}=require('../controllers/gestion')
route.get('/', gestionGet)
route.post('/', gestionPost )
route.put('/', gestionPut ) 
route.delete('/', gestionDelete )



module.exports = route


