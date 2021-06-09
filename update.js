document.addEventListener("DOMContentLoaded", function(){

    let formElm = document.querySelector(".updateformHolder");
    let animalFooter = document.querySelector(".animal-footer");

    if (formElm){
        let url = new URLSearchParams(window.location.search);
        let animalID = url.get("animalId");
        let backpage = url.get("backpage");
        //console.log(animalID);

        fetch(`http://annes-api.herokuapp.com/api/v1/animals/${animalID}`, {
          "method": "GET"
          })
          .then(response => response.json())
          .then(data => {
        
          let updateForm = document.createElement("form");
          updateForm.setAttribute("class", "updateForm");

          updateForm.innerHTML =
          `
          <div class="updateForm__item">
              <label class="updateForm__label" for="name">Name</label>
              <input class="updateForm__input" type="text" id="name" name="name" value="${data.name}"> 
          </div>
          <div class="updateForm__item">
              <label class="updateForm__label" for="type">Type</label>
              <input class="updateForm__input" type="text" name="type" id="type" value="${data.type}"> 
          </div>
          <div class="updateForm__item">
              <label class="updateForm__label" for="breed">Breed</label>
              <input class="updateForm__input" type="text" name="breed" id="breed" value="${data.breed}">   
          </div>
        <div class="updateForm__item">
              <label class="updateForm__label" for="age">Age</label>
              <input class="updateForm__input" type="number" name="age" id="age" value="${data.age}" max="500">
        </div>
        <div class="updateForm__item">
              <label class="updateForm__label" for="sex">Sex</label>
              <select class="updateForm__input" name="sex" id="sex">
                  <option value="${data.sex}" disabled selected>Choose an option</option>
                  <option value="male">Male</option>
                  <option value="female">female</option>
                  <option value="gynandromorph">Gynandromorph</option>
              </select>
        </div>
        <div class="updateForm__item">
              <label class="updateForm__label" for="colors">Colors</label>
              <input class="updateForm__input" type="text" name="colors" id="colors" placeholder="ex. color1, color2">
        </div>
          <input class="updateForm__submitBtn" type="submit" value="Submit">
          `;
          formElm.appendChild(updateForm);
          

          let back = document.createElement("a");
          back.setAttribute("href", `/?offset=${backpage}`);
          back.setAttribute("class", "single-animal__back-btn");
          let backNode = document.createTextNode("Back");
          back.appendChild(backNode);
          animalFooter.appendChild(back);

          const form = document.querySelector(".updateForm");
          form.addEventListener("submit", function(e) {
            e.preventDefault()
            updateAnimal(form)
          });

          })

        function updateAnimal(form){
          fetch(`http://annes-api.herokuapp.com/api/v1/animals/${animalID}`, {
            "method": "PATCH",
            "headers": {
              "Authorization": "Bearer ejgopehnktnjt9493095nwklefnknrgntju2323423jeeee"
            },
            "body": new FormData(form)
              })
              .then(response => response.json())
              .then(data => {
                  console.log(data);
              })
          }
    }
})