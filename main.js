'use strict'

const server = 'https://jsonplaceholder.typicode.com';

const idUser = prompt('Introduce la id de un usuario:');

primerMetodo(idUser);
segundoMetodo();
tercerMetodo();
cuartoMetodo();
quintoMetodo(idUser);

//Mostrar en consola la id, nick y nombre.
async function primerMetodo(idUser) {

    if(isNaN(idUser) || idUser == ''){
        alert('Introduce una id correcta.')
    } else {
        const usuario = await pideDatosUser(idUser);
        console.log('Id: ' + usuario.id);
        console.log('Nick: ' + usuario.username);
        console.log('Nombre: ' + usuario.name);
    }
}

async function pideDatosUser(idUser) {
    const response = await fetch(server + '/users/' + idUser);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const myData = await response.json();
    return myData;
}

//Mostrar en consola el array de tareas de dicho usuario.
async function segundoMetodo() {
    const idUser = prompt('Introduce la id de un todo:');

    if(isNaN(idUser) || idUser == ''){
        alert('Introduce una id correcta.')
    } else {
        const usuarios = await pideDatosTodosId(idUser);
        console.log(usuarios);
    }
}

async function pideDatosTodosId(idTodo) {
    const response = await fetch(server + '/todos?userId=' + idTodo);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const myData = await response.json();
    return myData;
}

//Preguntar la id de la tarea que deseamos borrar y la borrará mostrando por consola.
async function pideDeletePost(idPost) {
    const response = await fetch(server + '/posts/' + idPost, {method: "DELETE"});
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const myData = await response.json();
    return myData;
}

async function tercerMetodo() {
    const idPost = prompt('Introduce la id de un post:');

    if(isNaN(idPost) || idPost == ''){
        alert('Introduce una id correcta.')
    } else {
        const newPosts = await pideDeletePost();
        console.log(newPosts);
    }
}

//Preguntar la id de la tarea a la que cambiar el estado (completed) y lo cambiará, mostrando por consola lo devuelto por la API.
async function cuartoMetodo() {
    const idTodo = prompt('Introduce la id de un todo:');

    if(isNaN(idTodo) || idTodo == ''){
        alert('Introduce una id correcta.')
    } else {
        const data = {"completed" : true};
        const newTodo = await updateDatos(idTodo, data);
        console.log(newTodo);
    }
}

async function updateDatos(id, data) {
    const response = await fetch(server + '/todos/' + id, {method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    return response.json();
}

//Preguntar el título de una nueva tarea y la añadirá, mostrando por consola lo devuelto por la API.
async function quintoMetodo(idUser) {
    const title = prompt('Introduce el titulo de tu nueva tarea:');
    const data = {"userId" : idUser, "id" : getAllTodos().lenght, "title" : title, "completed" : false};
    const newTodo = await createDatos(data);
    console.log(newTodo);
}

async function createDatos(data) {
    const response = await fetch(`${server}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
}

async function getAllTodos() {
    const response = await fetch(server + '/todos/');
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const myData = await response.json();
    return myData;
}