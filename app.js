const botones = document.querySelector('#botones')
const nombreUsuario = document.querySelector('#nombreUsuario')

firebase.auth().onAuthStateChanged(user => {
    if(user){
        nombreUsuario.innerHTML = user.displayName
        accionCerrarSesion()
    }else{
        accionAcceder()
        console.log('usuario no registrado')
        nombreUsuario.innerHTML = 'Chat'
        contenidoWeb.innerHTML = /*html*/`
            <p class="lead mt-5 text-center">Debes iniciar sesión</p>
        `
    }
})

const accionAcceder = () => {

    botones.innerHTML = /*html*/`
        <button class="btn btn-outline-success" id="btnAcceder">Acceder</button>
    `
    
    const btnAcceder = document.querySelector('#btnAcceder')
    
    btnAcceder.addEventListener('click', async() => {
        console.log('entro')
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await firebase.auth().signInWithPopup(provider)
        } catch (error) {
            console.log(error)
        }
    })

}

const accionCerrarSesion = () => {
    botones.innerHTML = /*html*/`
        <button class="btn btn-outline-danger" id="btnCerrar">Cerrar Sesión</button>
    `
    const btnCerrar = document.querySelector('#btnCerrar')
    btnCerrar.addEventListener('click', () => firebase.auth().signOut())
}