document.querySelector('#generar-nombre').addEventListener('submit',cargarNombres)


function cargarNombres(e){
     e.preventDefault()

     // Leer las variables

     const origen = document.getElementById('origen');
     const origenSeleccionado = origen.options[origen.selectedIndex].value;

     const genero = document.getElementById('genero');
     const generoSeleccionado = genero.options[genero.selectedIndex].value;

     const cantidad = document.getElementById('numero').value;
     
     //ingreso la url que me permite hacer la peticion http
     let url = '';
     url += 'https://randomuser.me/api/?inc=gender,name,nat&';
     // Si hay origen agregarlo a la URL
     if(origenSeleccionado !== '') {
          url += `nat=${origenSeleccionado}&`;
     }
     // Si hay un genero agregarlo a la URL
     if(generoSeleccionado !== '') {
          url += `gender=${generoSeleccionado}&`;
     }
     // Si hay una cantidad agregarlo a la URL
     if(cantidad !== '') {
          url += `results=${cantidad}&`;
     }

     // crear Fetch
     fetch(url)
          //res contiene la respuesta de la peticion http, con res.json convierto la respuesta a archivo json(.text() para archivo de texto)
          .then( res => res.json() )
          //data contiene todos los datos del archivo json
          .then(data => {
               let html = `<h5>Nombres Generados</h5>`;
               html += `<ul class="lista">`;
               // estoy accediendo a un array de nombre results dentro del json
               // la estructura que tiene el json es mas amplia aqui estan los campos que necesito
               // "results": [
               //      {
               //        "gender": "male",
               //        "name": {
               //          "title": "mr",
               //          "first": "brad",
               //          "last": "gibson"
               //        },
                      
               //        "nat": "IE"
               //      }
               //    ]
                  
               data.results.forEach(nombre => {
                    html += `
                         <li>${nombre.name.first}</li>
                    `;
               })
               html += `</ul>`;
               document.querySelector('#resultado').innerHTML = html;
          })
          .catch(error =>  console.log(error) )
}