let cardmain =  document.getElementById ("tarjeta-dinamica")
console.log(cardmain)

let stringHtml =""

for(events of data.events){
    console.table(events)
    stringHtml +=`<div class="card" style="width: 25rem; height:32rem;">
    <img src="${events.image}" class="card-img-top p-3" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title text-center">${events.name}</h5>
        <p class="card-text text-center">${events.description}</p>
        <p class="text-start">${`Price $` + events.price}</p>
        <a href="#" class="btn btn-primary">Ver más</a>
    </div>
    </div>`
}

cardmain.innerHTML=stringHtml 
