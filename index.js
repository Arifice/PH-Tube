const load=async()=>{
    const response=await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data=await response.json();
    const category=data.data;
    // console.log(category);  
    
    const tabContainer=document.getElementById('tab-container');
    tabContainer.classList='flex justify-center my-12';
    category.forEach(category=>{
        // console.log(category);        
       
       const tab=document.createElement("div");
       tab.innerHTML=
        `  <a onclick="callCategory(${category.category_id})" class=" tabs tabs-boxed px-1  py-1 lg:px-3 m-1 lg:m-3 text-2xl lg:text-4xl rounded-md font-semibold">${category.category}</a>
        `  
        tabContainer.appendChild(tab);      
    })  
}
const callCategory=async(categoryId)=>{
    // console.log(categoryId);
    const response=await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data=await response.json();
    // console.log(data);
   dispaly(data.data);
   
}

const dispaly=(data)=>{
    const itemField=document.getElementById('item-container'); 
    const showDrawingField=document.getElementById('show-drawing');
    const showBlogField=document.getElementById('show-blog');
    showBlogField.textContent='';
    let length=data.length;
        // console.log(data.data.length);
    console.log(data);

    itemField.textContent='';
    showDrawingField.textContent='';
    if(length===0){
        
        const div=document.createElement('div');
        
        div.innerHTML=
        `   
            <div class="flex flex-col gap-2 items-center py-16">
                <div>
                    <img src="./Icon.png" alt="">
                </div>
                <div>
                    <p class="py-4 text-4xl font-semibold">Oops!! Sorry, There is no <br> content here</p>
                </div>
            </div>    
        `
        showDrawingField.appendChild(div);  
        
    
     }  
     else{
        data.forEach(element=>{
            // console.log(element); 
            const time=element?.others?.posted_date;                 
            // console.log(parseFloat(element.others.views));         
            const div=document.createElement('div');
            // console.log('date:',element?.others?.posted_date);
            
            div.innerHTML=
            `   
                <div class="card h-full w-full  shadow-xl">
                    <figure><img class="w-[312px] h-[200px]" src="${element?.thumbnail}" alt="" /></figure>
                    <div class="card-body">
                        <div  class="flex gap-4  items-center">
                            <div> 
                                <img class="w-10 h-10 rounded-full" src="${element?.authors[0]?.profile_picture}"/> 
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold">${element?.title} </h1>
                            </div>
                            <div id="time-div" class="absolute  right-10 top-40">                        
                                
                            <p><span>${time?displayTime(parseFloat(time)):""}</span></p>
                            </div>
                        </div>
                        <div class="flex">
                            <div>
                                <p class="ml-14">${element?.authors[0]?.profile_name} </p>
                            </div>
                            <div>
                                ${element?.authors[0]?.verified ? verified():""} 
                            </div>
                        </div>                        
                        <p class="ml-14">${element?.others?.views} views</p>                        
                        
                    </div>
                </div>
           `
            itemField.appendChild(div);
        })
    }
} 

    

const displayTime=(time)=>{
    const h=Math.floor(time/3600);
    const m=Math.floor((time%3600)/60);
    // const s=Math.floor((time%3600)%60);
    return `<span class="bg-[#171717] text-white text-xl rounded-md p-2">${h} hrs ${m} min ago</span>`
}

const verified=()=>{
    return `<img class="h-8 w-8" src="./bluetic.png" >`    
}
const nav=()=>{
    const navField=document.getElementById('nav-container');
    navField.innerHTML=
   `
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <img class="lg:h-16 md:h-12" src="./Logo.png" alt="">                  
            </div>
            <div class="navbar-center hidden md:flex lg:flex">
                <button onclick="sortByView()" class="lg:py-4 md:px-4 md:py-2 md:text-3xl lg:px-8 lg:text-5xl font-semibold rounded-lg bg-[#25252533]">Sort by view</button>
            </div>
            <div class="navbar-end">
                <div class="hidden md:flex lg:flex">
                    <button onclick="blog()" class=" lg:py-4 lg:px-8 lg:text-5xl md:px-4 md:py-2 md:text-3xl rounded-lg font-semibold text-white  bg-[#FF1F3D]">Blog</button>
                </div>
                <div class="dropdown dropdown-end md:hidden lg:hidden">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-sm dropdown-content z-[1] shadow  bg-secondary text-white rounded-lg w-40">
                        <button onclick="sortByView()" class="text-2xl font-bold">Sort by view</button>
                        <button onclick="blog()" class="text-2xl font-bold">Blog</button>
                    </ul>
                </div>
            </div>
        </div>
   `
}
const sortByView=async()=>{    

    const response=await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data=await response.json();
    // console.log(data);
    sort(data.data);   
}
const sort=(data)=>{
     //   console.log(data);
     data.sort(
        (p1,p2)=>(parseFloat(p1.others.views) < parseFloat(p2.others.views))? 1 : (parseFloat(p1.others.views) > parseFloat(p2.others.views)) ? -1 : 0
    );
    console.log(data);
    dispaly(data);    
}
const  blog=()=>{
    const showBlogField=document.getElementById('show-blog');
    const itemContainer=document.getElementById('item-container');
    const showDrawing=document.getElementById('show-drawing');
    itemContainer.textContent='';
    showDrawing.textContent='';
    console.log('blog is clocked')
    const div=document.createElement('div');
    showBlogField.textContent='';
    div.classList='bg-gray-100  lg:p-24 p-4'
    div.innerHTML=
    `
        <h1 class="text-3xl lg:text-6xl py-8 text-red-600 text-center font-bold">Blog Question and Answer</h1>
        <h1 class=" text-2xl lg:text-4xl my-2 font-semibold">1. Discuss the scope of var, let, and const.</h1>
        <ul class="lg:text-2xl my-1 font-semibold list-disc ml-8 lg:ml-16">
            <li>var and let create variables that can be reassigned another value.</li>
            <li>const creates "constant" variables that cannot be reassigned another value.</li>
            <li>The scope of var is function & global, whereas the scope of let and const is only block </li>
            <li>Developers shouldn't use var anymore. They should use let or const instead.</li>
            
        </ul>
        
        <h1 class="text-2xl lg:text-4xl my-2 font-semibold">2. Tell us the use cases of null and undefined.</h1>
        <ul class="lg:text-2xl my-1 font-semibold list-disc ml-8 lg:ml-16">
            <li>Null is basically an assignment value. The variable which has been assigned as null contains no value and is empty. </li>
            <li>Undefined is when we declare a variable but do not assign a value to it, the variable becomes undefined.</li>
            
            
        </ul>
        <h1 class="text-2xl lg:text-4xl my-2 font-semibold">3. What do you mean by REST API?</h1>
        <ul class="lg:text-2xl my-1 font-semibold list-disc ml-8 lg:ml-16">
            <li>API stands for Apllication Programming Interface </li>
            <li>An API acts like a link that allows two application to talk each other </li>
            <li>API is the part of the server that recieves requests and sends response </li>
            <li>Rest API has four methodes
                <ul class=" ml-8 lg:ml-16 list-disc">
                    <li>GET</li>
                    <li>POST</li>
                    <li>PUT/PATCH</li>
                    <li>DELETE</li>
                </ul>
            </li>
            
        </ul>
    
    `
    showBlogField.appendChild(div);
}
callCategory('1000')
nav();
load();
