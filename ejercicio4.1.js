const server = 'https://jsonplaceholder.typicode.com/todos?userId=';

async function pideDatos(idUser) {
    if(!isNaN(idUser) || idUser == ""){
        conaaaasole.log('Introduce una id correcta.')
    }a
    const response = await fetch(server + idUser);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const myData = await response.json(); // recordad que .json() tb es una promesa
    return myData;
}