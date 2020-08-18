	firebase.auth().onAuthStateChanged(user => {
    if(user){
        formulario.classList = 'input-group mb-3 fixed-bottom container'
        contenidoChat(user)
    }else{
        formulario.classList = 'input-group mb-3 fixed-bottom container d-none'
    }
	})
	const contenidoChat = (user) => {

    formulario.addEventListener('submit', event => {
        event.preventDefault()
        console.log(texto.value)
        if(!texto.value.trim()){
            console.log('texto vacio')
            return
        }
        firebase.firestore().collection('chat').add({
            texto: texto.value,
            uid: user.uid,
            fecha: Date.now()
        }).then(res => {
            console.log('texto agregado')
        })
        texto.value = ''
    })

    firebase.firestore().collection('chat').orderBy('fecha')
        .onSnapshot(query => {
            query.forEach(doc => {
                if(user.uid === doc.data().uid){
                    contenidoWeb.innerHTML += /*html*/`
                    <div class="d-flex justify-content-end mb-2">
                        <span class="badge badge-primary">
                            ${doc.data().texto}
                        </span>
                    </div>
                    `
                }else{
                    contenidoWeb.innerHTML += /*html*/`
                    <div class="d-flex justify-content-start mb-2">
                        <span class="badge badge-secondary">${doc.data().texto}</span>
                    </div>
                    `
                }
                contenidoWeb.scrollTop = contenidoWeb.scrollHeight
            })
        })

}