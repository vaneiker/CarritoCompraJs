//Variables
const carrito = document.querySelector('#carrito');
const listacurso = document.querySelector('#lista-cursos');
const vaciarcarritobtn=document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); 
let articuloItem = [];

cargarEventListeners();
function cargarEventListeners(){
    listacurso.addEventListener('click',agregarCurso);
    
    carrito.addEventListener('click',eliminarCurso);

    vaciarcarritobtn.addEventListener('click',()=>{
     articuloItem=[];
     cleanHtml();
    });
}

//Funciones

function agregarCurso(e){ 
    e.preventDefault();    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSelect=e.target.parentElement.parentElement;     
        leerDatos(cursoSelect);
    } 
}

function eliminarCurso(e){
    const curdoId =e.target.getAttribute('data-id');
    articuloItem = articuloItem.filter(curso => curso.id !==curdoId);
    carritoHtml();
}

function leerDatos(curso){
  console.log(curso); 
  const infoCurso={
      imagen:curso.querySelector('img').src,
      titulo:curso.querySelector('h4').textContent,
      precio:curso.querySelector('span').textContent,
      id:curso.querySelector('a').getAttribute('data-id'),
      cantidad:1
  } 
  
  const exists = articuloItem.some( curso => curso.id === infoCurso.id );
  if(exists){
  const cursos=articuloItem.map( curso =>{
  if(curso => curso.id === infoCurso.id){
    curso.cantidad++;
    return curso;
  } else {
      return curso;
  }
  });
  }else{
    articuloItem=[...articuloItem,infoCurso]; 
  }
  carritoHtml();
}

function carritoHtml(){

    cleanHtml();
    articuloItem.forEach(curso=>{
    const row= document.createElement('tr');
    const {imagen,titulo,precio,cantidad,id} = curso;
    row.innerHTML=`
    <td>
      <img src="${imagen}" width="100" /> 
    </td>
    <td>
        ${titulo}
    </td>
    <td>
        ${precio}
    </td>
    <td>
        ${cantidad}
    </td>
    <td> 
       <a href="#" class="borrar-curso" data-id="${id}">X</a>
    </td>
    `
    contenedorCarrito.appendChild(row);
});
}

function cleanHtml(){
    //contenedorCarrito.innerHTML='';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


