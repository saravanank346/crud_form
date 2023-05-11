

// console.log("global unique id :", unique);
// let  btn=document.getElementById("form");
// btn.addEventListener("click",()=>{
//     if (btn.textContent == "Submit") {
//         console.log("adde user ");
//         insert();
        
//     } else {
//         console.log('update');
//         update();
        
//     }
   
   
// });
window.onload = getallusers();
let form=document.getElementById("crud_form");

let unique;


function getallusers(){
fetch("http://localhost:3000/get")
.then(res=>res.json())
.then(users=>{

    html=""
    users.forEach(e=>{
        html+=`<tr>
            <td>${e.id}</td>
            <td>${e.user_name}</td>
            <td>${e.email}</td>
            <td>${e.message}</td>
            
            <td ><a onclick="edit(${e.id})"><i class="bi bi-pencil-square" ></i></a>
            <a onclick="deleted(${e.id})"> <i class="bi bi-trash3" ></i></a></td>
            
         
            
        </tr>`
    });
   
    document.getElementsByTagName("tbody")[0].innerHTML=html

})
}

// post method................................................................

function insert(){
    console.log("clicked")
    fetch("http://localhost:3000/insert",{
        method:"post",
        
        body:JSON.stringify({
            user_name:document.getElementById("user_name").value,
            email:document.getElementById("email").value,
            message:document.getElementById("message").value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
       
    })
    .then((response)=>response.json())
    .then((json)=>console.log(json));
    getallusers();

}


//update method........................................................................





function update() {
    
    console.log( unique,'inside update')
    fetch('http://localhost:3000/update',{
        method:"PUT",
        body:JSON.stringify({
            id:unique,
            user_name:document.getElementById("user_name").value,
            email:document.getElementById("email").value,
            message:document.getElementById("message").value,
        }),
        headers:{
            'Content-type':'application/json; charset=UTF-8',

        },
    })
    .then((response)=>response.json())
    .then((json)=>console.log(json));
    update_btn.style.display='none';
    submit_btn.style.display="block";
    form.reset();
    
  getallusers();

    
    
}

// edit method.....................................................................

function edit(id){
    console.log(id)
    unique=id;
    // console.log("unique id :", unique);
    // console.log(id)
    fetch(`http://localhost:3000/getusers/${id}`)
    .then((res)=>res.json())
    .then((e)=>{
        document.getElementById("user_name").value=e[0]["user_name"];
        document.getElementById("email").value=e[0]["email"];
        document.getElementById("message").value=e[0]["message"];
        // btn.textContent="update";

    })
    update_btn.style.display='block';
    submit_btn.style.display="none";
    

}
// delete.................
function deleted(id) {
    console.log(id)
    payload={id:id}
    fetch('http://localhost:3000/delete/',{
        method:'put',
        body:JSON.stringify(payload),
        headers:{
            'Content-type':'application/json;charset=UTF-8',
        },
    })
    .then((response)=>response.json())
    .then((json)=>{
        console.log(json);
        getallusers();
        
    })
    
}
