//Variables
let presupuestoUsuario = prompt('¿Cual es tu presupuesto?') //Agrega Presupuesto
const formulario = document.querySelector('.agregar-gasto')
let cantidadPresupuesto; 



//Clases
//Clase Presupuesto
class Presupuesto{
     constructor(presupuesto){
          this.presupuesto = Number(presupuesto)
          this.restante = Number(presupuesto)
     }

     //Metodo para ir restando del presupuesto actual
     restaPresupuesto(cantidadGastos){
          //Envia el valor this.restante y lo resta
          return this.restante -= Number(cantidadGastos)
     }

}





//Clase Interfaz
class Interfaz{
     //Imprime los datos del prompt en el DOM
     //Recivimos los datos del Eventlistener en el else (cantidadPresupuesto.presupuesto)
     insertarPresupuesto(cantidad){

          //Selecionamos los espacios dende vamos a imprimir
          const presupuestoSpan = document.querySelector('span#total')
          const restanteSpan = document.querySelector('span#restante')

          //Imprimimos lo que viene de la propiedad(cantidad)
          presupuestoSpan.innerHTML = `${cantidad}`
          restanteSpan.innerHTML = `${cantidad}`
     }
















     //Imprime los mensajes de Error o Correcto
     //Recivimos los datos del Eventlistener que valida el envio del formuario
     imprimirMensaje(mensaje, tipo){

          const divMensaje = document.createElement('div')//Cremos etiqueta

          divMensaje.classList.add('mensaje', 'alerta')//Cremos clases a las etiquetas

          if(tipo === 'error'){
               divMensaje.classList.add('error')//Si es de tipo error cremos estas clases
          }else{
               divMensaje.classList.add('correcto')//Si no, cremos estas clases
          }

          /*Cargamos el mensaje a la etiqueta funciona igual que:
          divMensaje.innerHTML = `${mensaje}`*/
          divMensaje.appendChild(document.createTextNode(mensaje))

          //Imprimimos en el DOM
          document.querySelector('.contenido-primario').insertBefore(divMensaje, formulario)

          //quitar el mensaje error despues de 3 segundos
          setTimeout(function(){   
               document.querySelector('.contenido-primario .alerta').remove()//Remover mensaje
               formulario.reset()
          },3000)
     }



















     //Agrega los datos del formulario al DOM
     agregarGastosListado(nombre, cantidad){
          //Seleccionamos el padre donde se va a insertar las etiquetas
          const gastosListado = document.querySelector('#gastos ul') 

          const li = document.createElement('li')//Creamos etiqueta
          li.classList.add('listadoGastos')//Cremos clase a la etiqueta
          // Insertamos los valores que vienen de: ui.agregarGastosListado(nombreGastos, cantidadGastos) a la etiqueta
          li.innerHTML = `
               ${nombre} <span class="montoGastos">$ ${cantidad}</span>
          `
          //Imprimimos en el DOM
          gastosListado.appendChild(li)

     }
     //Comprueba el presupuesto restante y trae los datos de los valores cantidadGastos
     presupuestoRestante(cantidadGastos){
          //apuntamos dende se esta gusrdando el restante en el DOM
          const restante = document.querySelector('span#restante')
          
          //Leemos el presupuesto restante de ui.presupuestoRestante(cantidadGastos) y lo comunicamos con a la propiedad restaPresupuesto(cantidadGastos) en la calse Presupuesto
          const restaPresupuestoUsuario = cantidadPresupuesto.restaPresupuesto(cantidadGastos)

          //Imprimimos la resta en restante
          restante.innerHTML = `${restaPresupuestoUsuario}`
          

          //Al Actualizar mando a llamar la propiedad  comprobarPresupuesto()
          this.colorRestante()
     }

     //Cambia de color la caja Restante del presupuesto
     colorRestante(){
          //Leer el valor total
          const presupuestoTotal = cantidadPresupuesto.presupuesto

          //Leer el valor restante
          const presupuestoRestante = cantidadPresupuesto.restante
          
          //Si el valor total dividido entre 4 que es 25% es mayor que el restante
          //Cambiamos las clases
          if((presupuestoTotal / 4) > presupuestoRestante){
               const restante = document.querySelector('.cajaRestanteAlerta')
               restante.classList.remove('cajaRestanteAlerta')
               restante.classList.add('cajaRestantePeligro')

          //Si no, el valor total dividido entre 2 que es 50% es mayor que el restante
          //Cambiamos las clases
          } else if ((presupuestoTotal / 2) > presupuestoRestante){
               const restante = document.querySelector('.cajaRestante')
               restante.classList.remove('cajaRestante')
               restante.classList.add('cajaRestanteAlerta')
          }
     }


}





//Eventlistener
//Eventlistener para cargar datos del prompt
document.addEventListener('DOMContentLoaded', function(e){
     e.preventDefault()

     if(presupuestoUsuario === '' || presupuestoUsuario === null){
          //Si los datos en el prompt estan vacios se recarga la pagina
          window.location.reload()

     }else{
     //Instanciamos Presupuesto y enviamos los datos del prompt al constructor(presupuesto)
          cantidadPresupuesto = new Presupuesto(presupuestoUsuario)

     //Instanciamos Interfaz
          const ui = new Interfaz()
     //Enviamos los datos a la propiedad de la clase Interfaz insertarPresupuesto(cantidad)
          ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
          
     }
})





















//Eventlistener para validar campos vacias del formulario
formulario.addEventListener('submit', function(e){
     e.preventDefault()
     
     //Leer los datos del formulario
     const nombreGastos = document.querySelector('.input-gastos').value
     const cantidadGastos = document.querySelector('.input-cantidad').value

     //instanciamos la Interfaz
     const ui = new Interfaz()

     //Comprovamos los campos del formulario, no esten vacios
     if(nombreGastos === '' || cantidadGastos === ''){
          //Propiedad Interfaz de Mensaje de error
          ui.imprimirMensaje('Hubo un error', 'error')
     }else{
          //Propiedad Interfaz de Mensaje correcto
          ui.imprimirMensaje('Correcto', 'correcto')

          //Agregar gastos al DOM
          ui.agregarGastosListado(nombreGastos, cantidadGastos)

          //Restar gastos del DOM en Restante
          ui.presupuestoRestante(cantidadGastos)
     }
})