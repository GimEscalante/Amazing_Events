let queryString=location.search

let params = new URLSearchParams(queryString)//obtiene parametros de la URL

let id = params.get("id")

let card = data.events.find(elemento => elemento.id == id)

const container = document.getElementById("tarjetaDetails");

let html = "";

html +=
    `<div class="card " style="width: 80%; height:50%;">
    <img src="${card.image}" class="card-img-top p-3" alt="...">
    
    <div class="card-body text-center">
    <h5 class="card-title ">${card.name}</h5>
    <p class="card-text ">Date: ${card.date}</p>
    <p class="card-text ">Description: ${card.description}</p>
    <p class="card-text ">Category: ${card.category}</p>
    <p class="card-text ">Place: ${card.place}</p>
    <p class="card-text ">Capacity: ${card.capacity}</p>
    <p class="card-text ">Assistance: ${card.assistance}</p>
    <p class="card-text text-end fw-bolder text-danger m-6">${`Price $` + card.price}</p>
    </div>
</div>`;

container.innerHTML = html