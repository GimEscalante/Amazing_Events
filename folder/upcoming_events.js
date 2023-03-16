//Constantes capturadas
const tarjetaDinamica = document.getElementById("tarjetaDinamica")
const checkboxs = document.getElementById("checkboxs")
const input = document.querySelector("input")

input.addEventListener("input", filtro)

checkboxs.addEventListener("change",filtro)

//Llamando las funciones

mostrarTarjetas(data.events)
crearCheckboxes(data.events)


//Funciones
function filtro(){
    let primerfiltro = filtrarPorTexto(data.events,input.value)
    let segundofiltro = filtrarPorCategory(primerfiltro)
    mostrarTarjetas(segundofiltro)
}

function mostrarTarjetas(array){ 
    if(array.length == 0){
        tarjetaDinamica.innerHTML="<h2 class='display-1 fw-bolder'>No se encontraron coincidencias</h2>"
        return
    }
    let tarjetas =""
    array.map(elemento=>{
        if(elemento.date>=data.currentDate){
            tarjetas+=`<div class="card" style="width: 25rem; height:32rem;">
            <img src=" ${elemento.image}" class="card-img-top p-3" alt="...">
            <div class="card-body text-center">
            <h5 class="card-title text-center">${elemento.name}</h5>
            <p class="card-text text-center">${elemento.description}</p>
            <p class="text-start">${`Price $` + elemento.price}</p>
            <a href="details.html?id=${elemento.id}" class="btn btn-primary">Ver más</a>
            </div>
            </div>`
        }
    })
    
    tarjetaDinamica.innerHTML=tarjetas
}

function filtrarPorTexto(array,texto){
    let arrayNuevo = array.filter(elemento=> elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayNuevo
}

function crearCheckboxes(array){
    let arrayCategory= array.map(elemento=> elemento.category)
    let setCategory= new Set(arrayCategory.sort((a,b)=>{
        if (a<b){
            return -1
        }
        if (a>b){
            return 1
        }
        return 0
    }))
    let checks=""
    setCategory.forEach(elemento=>{
        checks += `<div class="form-check">
        <input class="form-check-input" type="checkbox" value="${elemento}" id="${elemento}">
        <label class="form-check-label" for="${elemento}">
            ${elemento}
        </label>
    </div>`
    })
    checkboxs.innerHTML=checks
}

function filtrarPorCategory(array){
    let checkboxes =  document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let checkeados = arrayChecks.filter(check => check.checked)
    if (checkeados.length==0){
        return array
    }
    let categorias = checkeados.map(check=>check.value)
    let arrayNuevo = array.filter(elemento=> categorias.includes(elemento.category))
    return arrayNuevo
}






