/*
const xhr = new XMLHttpRequest();

xhr.open('GET','https://supersimplebackend.dev/greeting');
xhr.send();

xhr.addEventListener('load',()=>{
  console.log(xhr.response)
});
*/

/*
const request = fetch('https://supersimplebackend.dev/greeting')
  .then((response)=>{
    return response.text();
  }).then((response)=>{
    console.log(response);
  })
*/

/*
async function loadUsingFetch(){
  const request = await(await fetch('https://supersimplebackend.dev/greeting')).text();
  console.log(request);
}

loadUsingFetch();
*/

/*
async function loadUsingFetch(){
  const request = await fetch('https://supersimplebackend.dev/greeting',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name:'Stanislav Kozlov'
    })
  })
  const response = await request.text();
  console.log(response);
}

loadUsingFetch();
*/

/*
async function loadUsingFetch(){
  try{
    const request = await(await fetch('https://amazon.com')).text();
    console.log(request);
  }catch(error){
    console.log('CORS error')
  }
}

loadUsingFetch();
*/


async function loadUsingFetch(){
  try{
    const request = await fetch('https://supersimplebackend.dev/greeting',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(request.status>=400){
      throw request;
    }
  }catch(error){
    if(error.status===400){
      const response = await error.json();
      console.log(response);
    }else{
      console.log('Network error. Please try again later.')
    }
  }
}

loadUsingFetch();