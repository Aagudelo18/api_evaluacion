//Importar paquetes requeridos de node
const {response}= require('express')

 
//Importacion de los modelos 
const Gestion =require('../models/gestion')

//insercion, modificacion de datos

//consultar
const gestionGet = async(req, res = response)=>{
    const{direccion}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los usuarios colsultar los uasuarios
    const gestion = await Gestion.find()
    res.json({
        gestion
    })
}


const gestionPost= async(req, res= response)=>{
    //captura atributos o parametros
    const body=req.body
    let mensaje=''
    console.log(body)
   
   // const{nombre,password,rol,estado}=req.query
   // try si esta bien ejecuta lo de adentro el cath si esta malo muestra error
   try{
    const gestion = new Gestion(body) //instaciar el objeto
    //guardar objeto
    await gestion.save()
    mensaje='La insercion se realizo exitosamente'

   } catch(error){
    if (error) {
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    
       
    }


    res.json({
        msg: mensaje
    })

    
}
//Modificar
const gestionPut = async(req,res = response) => {
  
    const {direccion,latitud,longitud,descripcion,fecha} = req.body
    let mensaje = ''

    try {
        const gestion = await Gestion.findOneAndUpdate({direccion: direccion},{latitud: latitud,longitud: longitud, 
            descripcion: descripcion, fecha: fecha}) //Buscar por dirección y modificar
        mensaje = 'La modificación se realizo exitosamente'
    } catch (error) {
        mensaje = 'Se presentaron problemas en la modificación'
    }

    res.json({
        msg: mensaje
    })
}



const gestionDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const gestion= await Gestion.deleteOne({_id : _id})
        mensaje='La eliminacion se efectuo correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en  la eliminacion.'

    }

   

    res.json({
        msg: mensaje 
    })

}


module.exports={
    gestionGet,
    gestionPost,
    gestionPut,
    gestionDelete
}
