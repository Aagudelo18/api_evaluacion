 
//al desplegar en el servidor colocar la base de datos del servidor 
 const url = 'http://localhost:8081/api/gestion'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url, {
        method:'GET',
        mode:'cors',
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })

    //obtener la respuesta y convertirla a json 

    .then((resp)=> resp.json())
    //data contiene la informacion
    .then(function(data){
        //devuelve los datos
        let listaGestion = data.gestion
        //manera de llevar  rapido la lista
        return listaGestion.map(function(gestion){
            
            respuesta+=`<tr><td>${gestion.direccion}</td>`+
            `<td>${gestion.latitud}</td>`+
            `<td>${gestion.longitud}</td>`+
            `<td>${gestion.descripcion}</td>`+
            `<td>${gestion.fecha}</td>`+
            `<td> <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar( ${JSON.stringify(gestion)})'>Editar</a> <td><a class="waves-effect waves-light btn modal-danger red" href='#' onclick='eliminar(${JSON.stringify(gestion)})'>Eliminar</a></td></tr>`   
            body.innerHTML= respuesta 
            
        })
    })
}

const registrar = async() =>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion= document.getElementById('descripcion').value
   

    if ((_latitud.length >= 6,13 && _latitud.length <=6,217) && (_longitud.length >= -75,34 && _longitud.length <= -75,567)){
        let _gestion = {
            direccion : _direccion,
            latitud :_latitud,
            longitud : _longitud,
            descripcion: _descripcion
        }
        fetch (url,{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_gestion),//Convertir el objeto _usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
         //   alert(json.msg)// mensaje que retorna la api
         Swal.fire(
            json.msg,
            '',
            'success'
          )
    })
        
    }else{
       // alert('La contraseña y la confirmación de contraseña no coinciden')
       Swal.fire(
        'El rago de la latitud es 6.13 a 6.217 y la longitud de -75.34 a -75.567. latitud y longitud podrian estar fuera del rango, revisa por favor',
        '',
        'error'
      )
    }   
}


const editar=(gestion)=>{
    document.getElementById('direccion').value= ''
    document.getElementById('latitud').value=''
    document.getElementById('longitud').value= ''
    document.getElementById('descripcion').value= ''

    document.getElementById('direccion').value= gestion.direccion
    document.getElementById('latitud').value= gestion.latitud
    document.getElementById('longitud').value= gestion.longitud
    document.getElementById('descripcion').value= gestion.descripcion
    
}

const actualizar = async () => {

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value


        let _gestion = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_gestion),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            Swal.fire(
                json.msg,
                '',
                'success'
              ).then(() => {
                location.reload();
              })
        })
}


const eliminar = (id)=>{
    if(confirm('Esta seguro de realizar la eliminacion?')== true){
  
    
            let gestion = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(gestion),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                alert(json.msg)
        })
       
    }
    
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)

}

if(document.querySelector('#btnActualizar')){
   document.querySelector('#btnActualizar')
   .addEventListener('click', actualizar)
}




