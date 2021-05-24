const formContainer = document.querySelector('.form--container')
const form = document.querySelector('.form')
const inputName = document.getElementById('inputName')
const inputApellido = document.getElementById('inputApellido')
const selectGender = document.getElementById('selectGender')
const selectCountry = document.getElementById('selectCountry')
const selectMonth = document.getElementById('selectMonth')
const selectDay = document.getElementById('selectDay')
const selectYear = document.getElementById('selectYear')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const inputConfirmPassword = document.getElementById('inputConfirmPassword')
const formButton = document.getElementById('formButton')

const inputNameError=document.getElementById('inputNameError')
const inputApellidoError=document.getElementById('inputApellidoError')
const inputEmailError =document.getElementById('inputEmailError')
const inputPasswordError =document.getElementById('inputPasswordError')
const inputConfirmPasswordError =document.getElementById('inputConfirmPasswordError')
const passwordRules= document.getElementById('passwordRules')

const lobbyContainer = document.getElementById('lobbyContainer')
const lobbyTittleUsername = document.getElementById('lobbyTittleUsername')
const lobbyUserName = document.getElementById('lobbyUserName')
const lobbyUserApellido = document.getElementById('lobbyUserApellido')
const lobbyUserGender = document.getElementById('lobbyUserGender')
const lobbyUserBirthday = document.getElementById('lobbyUserBirthday')
const lobbyUserAge = document.getElementById('lobbyUserAge')
const lobbyUserNacionality = document.getElementById('lobbyUserNacionality')
const lobbyUserEmail = document.getElementById('lobbyUserEmail')


class Persona {
    constructor(nombre, apellido, genero, pais, month, day, year, email, password){
        this.Nombre = nombre
        this.Apellido = apellido
        this.Genero = genero
        this.Pais = pais
        this.FechaNacimiento = `${month}/${day}/${year}`
        this.Email = email
        this.Password = password
    }

    edad(){
        const fechaNatal = new Date(this.FechaNacimiento).getTime()
        const fechaActual = new Date().getTime()
        const anioHumano = 1000 * 60 * 60 * 24 * 365 //Milisegundos, Segundos, Minutos, Horas, Dias
        const diferenciaDeAnios = parseInt(((fechaActual - fechaNatal) / anioHumano))
        return `${diferenciaDeAnios} años`
    }

}

// Inicialización
let listaDePersonas = [], password, completeCampo = false, camposErroneos = []

const LIMPIAR_CAMPOS = ()=>{
    inputName.value = ''
    inputApellido.value = ''
    selectGender.value = 'Genero'
    selectCountry.value = 'Nacionality'
    selectYear.value = 'Year'
    selectMonth.value = 'Month'
    selectDay.value = 'Day'
    inputEmail.value = ''
    inputPassword.value = ''
    inputConfirmPassword.value = ''
}

const ANIMACION_ERROR = (campoErroneo)=>{
    campoErroneo.classList.add('campo-erroneo')
    let campoConError = campoErroneo.name

    if(campoConError==='Campo nombre'){
        inputNameError.classList.remove('out')
    }

    if(campoConError==='Campo apellido'){
        inputApellidoError.classList.remove('out')
    }

    if(campoConError==='Campo email'){
        inputEmailError.classList.remove('out')
    }

    if(campoConError==='Campo password'){
        inputPasswordError.classList.remove('out')
    }

    if(campoConError==='Campo confirm password'){
        inputConfirmPasswordError.classList.remove('out')
    }
}

const ANIMACION_CORRECT = (campoErroneo)=>{
    campoErroneo.classList.remove('campo-erroneo')
    let campoConError = campoErroneo.name

    if(campoConError==='Campo nombre'){
        inputNameError.classList.add('out')
    }

    if(campoConError==='Campo apellido'){
        inputApellidoError.classList.add('out')
    }

    if(campoConError==='Campo email'){
        inputEmailError.classList.add('out')
    }

    if(campoConError==='Campo password'){
        inputPasswordError.classList.add('out')
    }

    if(campoConError==='Campo confirm password'){
        inputConfirmPasswordError.classList.add('out')
    }
}

const VALIDAR_CAMPOS = (campoAValidar)=>{
    const nombreValido = /^[A-Za-zÑñÁÉÍÓÚáéíóúöü\s]+$/i.test(inputName.value)
    const apellidoValido = /^[A-Za-zÑñÁÉÍÓÚáéíóúöü\s]+$/i.test(inputApellido.value)
    const correoValido = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail.value)
    const passwordValido = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/g.test(inputPassword.value)

    if(campoAValidar.value === ''){
        console.log(`Verificar ${campoAValidar.name}`)
        ANIMACION_ERROR(campoAValidar)
        camposErroneos.push(campoAValidar)
        console.log(camposErroneos)
        completeCampo = false
    } else{
        ANIMACION_CORRECT(campoAValidar)
        completeCampo = true
        if(campoAValidar.name === 'Campo nombre' && !nombreValido){
                console.log(`El nombre "${inputName.value}" no es un nombre válido`)
                completeCampo = false
                ANIMACION_ERROR(inputName)
        }

        else if(campoAValidar.name === 'Campo apellido' && !apellidoValido){
                console.log(`El apellido "${inputApellido.value}" no es un apellido válido`)
                completeCampo = false
                ANIMACION_ERROR(inputApellido)

        }

        else if(campoAValidar.name === 'Campo email' && !correoValido){
                console.log(`El correo "${inputEmail.value}" no es un correo válido`)
                completeCampo = false
                ANIMACION_ERROR(inputEmail)
        }

        else if (campoAValidar.name === 'Campo password' || campoAValidar.name === 'Campo confirm password'){
            if(inputPassword.value==='' || inputConfirmPassword.value===''){
                console.log('Debe llenar el campo de Contraseña')
                completeCampo = false
            } else{
                if(inputPassword.value !== inputConfirmPassword.value){
                    console.log('Las contraseñas ingresadas no son iguales')
                } else{
                    if(!passwordValido){
                        console.log(`La contraseña ingresada no es válida`)
                        inputPassword.value = ''
                        inputConfirmPassword.value = ''
                        completeCampo = false
                        passwordRules.classList.remove('out')
                        setTimeout(function(){passwordRules.classList.add('out')}, 3000)
                    }
                }
            }
        }
    }
}

const CAMPOS_VACIOS = ()=>{
    if(inputName.value==='') inputName.classList.add('campo-erroneo')
    if(inputApellido.value==='') inputApellido.classList.add('campo-erroneo')
    if(selectGender.value==='') selectGender.classList.add('campo-erroneo')
    if(selectCountry.value==='') selectCountry.classList.add('campo-erroneo')
    if(selectMonth.value==='') selectMonth.classList.add('campo-erroneo')
    if(selectDay.value==='') selectDay.classList.add('campo-erroneo')
    if(selectYear.value==='') selectYear.classList.add('campo-erroneo')
    if(inputEmail.value==='') inputEmail.classList.add('campo-erroneo')
    if (password===undefined || inputPassword.value === '' || inputConfirmPassword.value === ''){
        inputConfirmPassword.classList.add('campo-erroneo')
        inputPassword.classList.add('campo-erroneo')
    }
}

const MOSTRAR_USUARIO = ()=>{
    console.log(listaDePersonas[0])
    lobbyTittleUsername.textContent = listaDePersonas[0].Nombre
    lobbyUserName.textContent = listaDePersonas[0].Nombre
    lobbyUserApellido.textContent = listaDePersonas[0].Apellido
    lobbyUserGender.textContent = listaDePersonas[0].Genero
    lobbyUserBirthday.textContent = listaDePersonas[0].FechaNacimiento
    lobbyUserNacionality.textContent = listaDePersonas[0].Pais
    lobbyUserEmail.textContent = listaDePersonas[0].Email
    lobbyUserAge.textContent = listaDePersonas[0].edad()
    formContainer.classList.remove('form--container')
    formContainer.classList.add('out')
    lobbyContainer.classList.remove('out')
}

const CAMBIAR_MES = ()=>{
//Dias que cambian segun Anos
const anosViciestos = [1904, 1908, 1912, 1916, 1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024]
const meses30 = [04, 06, 09, 11]

const day29 = document.getElementById('day29')
const day30 = document.getElementById('day30')
const day31 = document.getElementById('day31')

    if (meses30.includes(parseInt(selectMonth.value))){
        day31.classList.add('out')
    }
    else if(selectMonth.value === "02"){
        selectDay.value=''
        day30.classList.add('out')
        day31.classList.add('out')

        if(!anosViciestos.includes(parseInt(selectYear.value))){
            selectDay.value=''
            day29.classList.add('out')
        }
        else {
            day29.classList.remove('out')
        }
    }
    else {
        day30.classList.remove('out')
        day31.classList.remove('out')
        day29.classList.remove('out')
    }

}

const AGREGAR_PERSONAS = ()=>{
    if(completeCampo === false){
        alert('Rellene todos los campos')
        for(let campo of camposErroneos){
            campo.classList.add('campo-erroneo')
        }
        CAMPOS_VACIOS()
    } else{
        let nuevaPersona = new Persona(inputName.value, inputApellido.value, selectGender.value, selectCountry.value, selectYear.value, selectMonth.value, selectDay.value, inputEmail.value, inputPassword.value)
        listaDePersonas.push(nuevaPersona)
        console.log(listaDePersonas)
        LIMPIAR_CAMPOS()
        MOSTRAR_USUARIO()
    }
}

selectMonth.addEventListener('change', CAMBIAR_MES)
selectYear.addEventListener('change', CAMBIAR_MES)
formButton.addEventListener('click', AGREGAR_PERSONAS)
