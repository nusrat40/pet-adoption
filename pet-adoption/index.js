//category button 
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error));
  };

  //display category buttons
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
  
    categories.forEach((item) => {
    //   console.log(item);
       const {id,category,category_icon}=item;
      //create a button
       const buttonContainer =document.createElement("div");
       buttonContainer.innerHTML=`
        <button id="btn-${category}" onclick="loadCategoryPets('${category}')" class="btn w-40 h-16 btn-outline hover:bg-transparent border-inherit category-btn">
          <img class="w-10 h-10" src=${category_icon} />
          <p class="text-black">${category}</p>
        </button>
       `

      //add button to category container
      categoryContainer.classList="grid grid-cols-2 md:grid-rows-1 md:grid-cols-4  p-5 lg:mx-20 gap-5"
      categoryContainer.append(buttonContainer);
      
    });
  };


//load pets by Category
  const loadCategoryPets =(categoryName)=>{

    document.getElementById("spinner").style.display="block";


    setTimeout(function(){

      document.getElementById("spinner").style.display="none";

      fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
  
        //remove color to all button
        removeActiveClass();
  
        //add color to button that is active
        const activeBtn =document.getElementById(`btn-${categoryName}`);
        activeBtn.classList.add("active");
        displayAllCards(data.data)
      })
      .catch((error) => console.log(error));
      
     },2000)
    

    
  }



  const removeActiveClass=()=>{
    const buttons=document.getElementsByClassName("category-btn");

    for(let btn of buttons){
      btn.classList.remove("active");
    }
  
  }





  //load All cards
  const loadAllCards = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => displayAllCards(data.pets))
      .catch((error) => console.log(error));


  };

  //display All cards
  const displayAllCards = (cards)=>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML="";

    if(cards.length==0){
      cardContainer.classList.remove("grid");
      cardContainer.innerHTML=`
      <div class ="min-h-[300px] flex flex-col gap-5 justify-center items-center">
      <img src="images/error.webp"/>
      <h2 class="text-center text-xl font-bold">No Information Available</h2>
      </div>
      `;
      return ;
    }
    else{
      cardContainer.classList.add("grid");
    
    }


    cards.forEach((card,index) =>{
      const {petId,image,pet_name,breed,date_of_birth,gender,price}=card;
      const div =document.createElement("div"); 
      div.classList="space-y-2 border p-4 rounded-xl"
      div.innerHTML=`
      <img class="rounded-xl" src =${image} />
      <h2 class="text-xl font-bold">${pet_name}</h2>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=Kqjb5Ws5IkZT&format=png" />
      <p>Breed: ${breed?breed:"N/A"}</p>
      </div>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=84997&format=png" />
      <p>Birth: ${date_of_birth?date_of_birth:"N/A"}</p>
      </div>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=34113&format=png" />
      <p>Gender: ${gender?gender:"N/A"}</p>
      </div>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=CoGBixMJpBuh&format=png" />
      <p>Price: ${price?price:"N/A"}</p>
      </div>

      <div class="flex gap-1">
      <button onclick="showImages('${petId}')" class="btn btn-ghost border-inherit">
         <img src="https://img.icons8.com/?size=25&id=53vm80oFnyfa&format=png" />
      </button>
      <button onclick="adoptPet(this,${index})" class="btn btn-outline btn-success border-inherit">Adopt</button>
      <button onclick="petDetails('${petId}')" class="btn btn-outline btn-success border-inherit">Details</button>
        
      </div>
      
      `
      cardContainer.appendChild(div);
    })

  }

  //show images
  const showImages =(id)=>{
    const imageContainer =document.getElementById("image-container");
    
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data =>{
      const {image}=data.petData;

    const div = document.createElement("div");
    div.innerHTML=`

       <img class="rounded-xl" src="${image}" />
  
    `
    imageContainer.appendChild(div);

    })
    .catch((error) => console.log(error));

  }


  //show pet details
  const petDetails =async(ids) =>{
    const response =await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${ids}`);
    const data =await response.json();
    console.log(data.petData);

    const {breed,category,date_of_birth,price,image,gender,pet_details,vaccinated_status,pet_name}=data.petData;
    

    const modalContainer =document.getElementById("modal-container");
    modalContainer.innerHTML=`
     <dialog id="my_modal_1" class="modal">
        <div class="modal-box">

           <img class="rounded-xl h-full w-full object-cover" src =${image} />

      <div class="flex space-y-4">
      <div class="space-y-2">
      <h2 class="text-xl font-bold">${pet_name}</h2>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=Kqjb5Ws5IkZT&format=png" />
      <p>Breed: ${breed?breed:"N/A"}</p>
      </div>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=34113&format=png" />
      <p>Gender: ${gender?gender:"N/A"}</p>
      </div>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=32&id=16649&format=png" />
      <p>Vaccinated status: ${vaccinated_status?vaccinated_status:"N/A"}</p>
      </div>
      </div>
      

      <div class="space-y-2">
        <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=84997&format=png" />
      <p>Birth: ${date_of_birth?date_of_birth:"N/A"}</p>
      </div>
      <div class="flex gap-2"> 
      <img src ="https://img.icons8.com/?size=24&id=CoGBixMJpBuh&format=png" />
      <p>Price: ${price?price:"N/A"}</p>
       </div>
      </div>
          </div>

       <div class="border-t-2 p-2 mt-2">
        <h3 class="text-xl font-bold">Details Information</h3>
        <p class="text-[#131313B3]">${pet_details}</p>
       </div>



          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
            
              <button class="btn w-[340px] lg:w-[450px] h-[40px] rounded-lg text-[#0E7A81] bg-[#0E7A811A] ">Cancel</button>
              
            </form>
          </div>
        </div>
      </dialog>
    `
    
    my_modal_1.showModal();
    

}


//view more button 
document.getElementById("view-more").addEventListener("click",function(){
  const adoptSection =document.getElementById("adopt-section");
  adoptSection.scrollIntoView({behavior:"smooth"});

});


 //sort pets by price
 const sortPetsByPrice =()=>{
  // console.log('sort button is clicked');

  fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) =>displayAllCards(data.pets.sort((a,b)=> b.price -a.price)))
      .catch((error) => console.log(error));
  
}


function adoptPet(button,index) {
  // console.log(button);
  
  const modal = document.getElementById('myModal');
  modal.classList.add('modal-open');

    let count = 3 ;
   const countDown = document.getElementById("countdown");
   countDown.innerText = count;
   const clockId = setInterval(()=>{
    count--;
    countDown.innerText=count;

    if(count === 0){
      clearInterval(clockId);
      button.innerText="Adopted";
      button.disabled=true;

     
    }

   },1000)
   setTimeout(closeModal,3000);
   

}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.classList.remove('modal-open');
}




  loadCategories();
  loadAllCards();