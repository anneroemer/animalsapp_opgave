document.addEventListener("DOMContentLoaded", function(){
    

    const animalContainer = document.querySelector(".animalContainer");
    const animalFooter = document.querySelector(".animal-footer");

    let url = new URLSearchParams(window.location.search);
    let offset = url.get("offset") ? url.get("offset") : 0;
    //console.log(offset);
    let nextOffset;
    let prevOffset;

    if (animalContainer){
        fetch(`http://annes-api.herokuapp.com/api/v1/animals?offset=${offset}`, {
        "method": "GET",

        })
        .then(response => response.json())
            .then (data => {
                //console.log(data);

                let maxOffset = data.count - data.count % 5;
                //console.log(data.count);
                nextOffset = offset >= maxOffset ? maxOffset : parseInt(offset) + 5; //offset er hentet ud af url parametret som en string, derfor bruger vi parseInt til at konvertere det til et tal eller en "integer"
                prevOffset = offset <= 0 ? 0 : parseInt(offset) - 5;

                data.result.forEach(element => {
                    //console.log(element);
                    let li = document.createElement("li");
                    li.setAttribute("class", "animal__item");
                    li.innerHTML = 
                    `<div class="animal-name">
                    <h2 class="animal__h2">${element.name}</h2>
                    <p class="animal__type">${element.breed}</p>
                    <div>
                    <div class="animal-buttons">
                    <a href="single.html?animalId=${element._id}&backpage=${offset}" class="details">Details</a>
                    <a href="update.html?animalId=${element._id}&backpage=${offset}" class="update">Update</a>
                    <a href="?animalId=${element._id}" class="deleteBtn"><i class="fas fa-trash-alt"></i>
                    </a>
                    </div>`;
                    animalContainer.appendChild(li);
                });

                let prev = document.createElement("a");
                prev.classList.add("btn");
                if(offset == 0) prev.classList.add("btn_disabled"); 
                prev.setAttribute("href", `?offset=${prevOffset}`);
                let prevNode = document.createTextNode("Previous");
                prev.appendChild(prevNode);
                animalFooter.appendChild(prev);

                let next = document.createElement("a");
                next.classList.add("btn");
                if(offset >= maxOffset) next.classList.add("btn_disabled");
                next.setAttribute("href", `?offset=${nextOffset}`);
                let nextNode = document.createTextNode("Next");
                next.appendChild(nextNode);
                animalFooter.appendChild(next);


                const deleteBtns = document.querySelectorAll(".deleteBtn");
                //const form = new FormData();
                let url = new URLSearchParams(window.location.search);
                let animalID = url.get("animalId");
            
                deleteBtns.forEach(deleteBtn =>{
                    deleteBtn.addEventListener("click", function(){
                        fetch(`http://annes-api.herokuapp.com/api/v1/animals/${animalID}`, {
                        "method": "DELETE"
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Hello: " + data)
                        })
                    })
                })


                
            })
    }

})
