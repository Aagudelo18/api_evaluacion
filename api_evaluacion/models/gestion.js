//Migracion 
const {Schema, model}=require('mongoose')

const GestionSchema= Schema({ 
    //se define tipos de datos
    direccion:{
        type: String,
        required: [true,'El campo direccion es requerido']

    },
    latitud:{
        type:Number,
        required:[true, 'El campo latitud es requerido'],
        minlength: [6,13, 'La latitud minima es 6.13'],
        maxlength: [6,217, 'La latitud maxima es 6.217'], 
    },

    longitud:{
        type:Number,
        required:[true, 'El campo longitud es requerido'],
        minlength: [-75,34, 'La longitud minima es -75.34'],
        maxlength: [-75,567, 'La longitud maxima es -75.567'],

    },

    descripcion:{
        type: String,
        required:[true, 'El campo descricion es requerido']
       
    },

    fecha:{
        type:Date,
        required: [true, 'La fecha y la hora es requerida'],
        default: new Date
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Gestion', GestionSchema)//Exportar el modelo

