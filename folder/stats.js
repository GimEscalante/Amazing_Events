let tabla1 = document.getElementById("tabla1")
const tabla2 = document.getElementById("tabla2")
const tabla3 = document.getElementById("tabla3")


fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(eventos => {
    
    const Filter1 = eventos.events.filter(events =>
        (events.date > eventos.currentDate)
    );
    
    const Filter2 = eventos.events.filter(events =>
        (events.date < eventos.currentDate)
    )

    creoObjeto(Filter2);
    segundaTabla(Categorias(Filter1), Filter1)
    tercerTabla(Categorias(Filter2), Filter2);
})


function Categorias(array) {
    let arrayCategoria = array.map(elemento => elemento.category)
    let setCategory = new Set(arrayCategoria.sort((a,b)=>{
        if(a < b){
            return -1
        }
        if(a > b){
            return 1
        }
        return 0
    }))
    return setCategory
}

function largestCapacityEvent(array) {
    let largestCapacity = 0;
    let eventCapacity = 0;
    array.forEach(event => {
        
        if (event.capacity > largestCapacity) {
            largestCapacity = event.capacity;
            eventCapacity = event;
        }
        });
    return eventCapacity;
}

let largestAttendancePercentage = 0; 
let lowestAttendancePercentage = 100; 

function highestAttendance(array) {
    let largestAttendance = 0;
    array.forEach(event => {
        let attendancePercentage = event.assistance/ event.capacity *100;
        if (attendancePercentage > largestAttendancePercentage) {
            largestAttendancePercentage = attendancePercentage;
            largestAttendance = event;
        }
    });
    return largestAttendance
}

function lowestAttendance(array) {
    let largestAttendance = 0;
    array.forEach(event => {
        let attendancePercentage = event.assistance/ event.capacity *100;
        if (attendancePercentage < largestAttendancePercentage) {
            largestAttendancePercentage = attendancePercentage;
            largestAttendance = event;
        }
    });
    return largestAttendance
}

function creoObjeto(array) {
    let htmlInner = ""
    let arrayPrueba = []
    arrayPrueba.push(largestCapacityEvent(array))
    arrayPrueba.push(highestAttendance(array))
    arrayPrueba.push(lowestAttendance(array))
    htmlInner +=
    `<td class="col-lg-3">`+arrayPrueba[1].name+` (`+ ((arrayPrueba[1].assistance / arrayPrueba[1].capacity * 100).toFixed(2)) +`%)</td>` +
    `<td class="col-lg-3">`+arrayPrueba[2].name+` (`+ ((arrayPrueba[2].assistance / arrayPrueba[2].capacity * 100).toFixed(2)) +`%)</td>` +
    `<td class="col-lg-3">`+arrayPrueba[0].name+` (`+ arrayPrueba[0].capacity +`)</td>`
    tabla1.innerHTML = htmlInner
}

function segundaTabla(arrayCategorias, arrayObj){
    let internoHTML = ""
    arrayCategorias.forEach(elemento => {
        let numeroIncome = 0
        let numeroPorcentageAssistance = 0
        let numeroPorcentageCapacity = 0
        let prueba1 = arrayObj.filter(element => element.category == elemento);
        let prueba2 = prueba1.forEach(elemento=>{
            numeroIncome += elemento.price * elemento.estimate
            numeroPorcentageAssistance += elemento.estimate
            numeroPorcentageCapacity += elemento.capacity
        })
        internoHTML +=`<tr><td class="col-lg-3">`+elemento+`</td><td class="col-lg-3">$ `+numeroIncome+`</td><td class="col-lg-3">`+((numeroPorcentageAssistance / numeroPorcentageCapacity * 100).toFixed(2))+` %</td></tr>`
    })
    tabla2.innerHTML = internoHTML
}

function tercerTabla(arrayCategorias, arrayObj){
    let internoHTML = ""
    arrayCategorias.forEach(elemento => {
        let numeroIncome = 0
        let numeroPorcentageAssistance = 0
        let numeroPorcentageCapacity = 0
        let prueba1 = arrayObj.filter(element => element.category == elemento);
        let prueba2 = prueba1.forEach(elemento=>{
            numeroIncome += elemento.price * elemento.assistance
            numeroPorcentageAssistance += elemento.assistance
            numeroPorcentageCapacity += elemento.capacity
        })
        internoHTML +=`<tr><td class="col-lg-3">`+elemento+`</td><td class="col-lg-3">$ `+numeroIncome+`</td><td class="col-lg-3">`+((numeroPorcentageAssistance / numeroPorcentageCapacity * 100).toFixed(2))+` %</td></tr>`
    })
    tabla3.innerHTML = internoHTML
}