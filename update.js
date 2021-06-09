document.addEventListener("DOMContentLoaded", function(){

    let formElm = document.querySelector(".updateformHolder");
    let animalFooter = document.querySelector(".animal-footer");

    if (formElm){
        let url = new URLSearchParams(window.location.search);
        let animalID = url.get("animalId");
        let backpage = url.get("backpage");
        //console.log(animalID);

    //     let form = document.createElement("form");
    //     form.setAttribute("class", "updateForm");
    //     form.innerHTML =
    //     `
    //     <div class="updateForm__item">
    //         <label class="updateForm__label" for="name">Name</label>
    //         <input class="updateForm__input" type="text" id="name" name="name" placeholder="Something..."> 
    //     </div>
    //     <div class="updateForm__item">
    //         <label class="updateForm__label" for="type">Type</label>
    //         <input class="updateForm__input" type="text" name="type" id="type" placeholder="Something..."> 
    //     </div>
    //     <div class="updateForm__item">
    //         <label class="updateForm__label" for="breed">Breed</label>
    //         <input class="updateForm__input" type="text" name="breed" id="breed" placeholder="Something...">   
    //     </div>
    //    <div class="updateForm__item">
    //         <label class="updateForm__label" for="age">Age</label>
    //         <input class="updateForm__input" type="number" name="age" id="age" placeholder="Something..." max="500">
    //    </div>
    //    <div class="updateForm__item">
    //         <label class="updateForm__label" for="sex">Sex</label>
    //         <select class="updateForm__input" name="sex" id="sex">
    //             <option value="" disabled selected>Something...</option>
    //             <option value="male">Male</option>
    //             <option value="female">female</option>
    //             <option value="gynandromorph">Gynandromorph</option>
    //         </select>
    //    </div>
    //    <div class="updateForm__item">
    //         <label class="updateForm__label" for="colors">Colors</label>
    //         <input class="updateForm__input" type="text" name="colors" id="colors" placeholder="Something...">
    //    </div>
    //     <input class="updateForm__submitBtn" type="submit" value="Submit">
    //     `;
    
    let updateAnimal = e => {       
            const form = new FormData();
            form.append("name", e.target.name.value)
            form.append("type", e.target.name.value)
            form.append("breed", e.target.name.value)
            form.append("age", e.target.name.value)
            form.append("sex", e.target.name.value)
            form.append("colors", e.target.name.value)
        }

        form.addEventListener("submit", updateAnimal);
        

        fetch(`http://annes-api.herokuapp.com/api/v1/animals/${animalID}`, {
          "method": "PATCH",
          "headers": {
            "Content-Type": "multipart/form-data"
          },
          "body": form
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);

                formElm.appendChild(form);

                let back = document.createElement("a");
                back.setAttribute("href", `/?offset=${backpage}`);
                back.setAttribute("class", "single-animal__back-btn");
                let backNode = document.createTextNode("Back");
                back.appendChild(backNode);
                animalFooter.appendChild(back);
            })

    }
})