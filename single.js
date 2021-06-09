document.addEventListener("DOMContentLoaded", function(){
    
    let singleElm = document.querySelector(".single");
    let animalFooter = document.querySelector(".animal-footer");

    if (singleElm){
        let url = new URLSearchParams(window.location.search);
        let animalID = url.get("animalId");
        let backpage = url.get("backpage");
        //console.log(animalID);

        fetch(`http://annes-api.herokuapp.com/api/v1/animals/${animalID}`, {
            "method": "GET"
            })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                
                let div = document.createElement("div");
                div.innerHTML = `
                <h1 class="single-animal__h1">${data.name}</h1>
                <table class="single-animal__table" cellspacing="0">
                <tr class="single-animal__tr">
                    <th class="single-animal__th">Type</th>
                    <td class="single-animal__td">${data.type}</td>
                </tr>
                <tr class="single-animal__tr">
                    <th class="single-animal__th">Breed</th>
                    <td class="single-animal__td"><a>${data.breed}</a></td>
                </tr>
                <tr class="single-animal__tr">
                    <th class="single-animal__th">Age</th>
                    <td class="single-animal__td">${data.age}</td>
                </tr>
                <tr class="single-animal__tr">
                    <th class="single-animal__th">Sex</th>
                    <td class="single-animal__td">${data.sex}</td>
                </tr>
            </table>`;
                //let ul = document.createElement("ul");

                // data.colors.forEach(data => { //vi skal huske at skrive += her, så vi ikke overskriver det vi lige har lavet
                //     let li = document.createElement("li");
                //     let textnode = document.createTextNode(data.colors);
                //     li.appendChild(textnode)
                //     ul.appendChild(li)
                // })
                //div.appendChild(ul)
                singleElm.appendChild(div);

                let back = document.createElement("a");
                back.setAttribute("href", `/?offset=${backpage}`);
                back.setAttribute("class", "single-animal__back-btn");
                let backNode = document.createTextNode("Back");
                back.appendChild(backNode);
                animalFooter.appendChild(back);
            })
    }
})