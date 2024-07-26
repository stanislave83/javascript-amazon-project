import dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export const deliveryOptions=[{
  id:'1',
  deliveryDays:7,
  priceCents:0
},{
  id:'2',
  deliveryDays:3,
  priceCents:499
},{
  id:'3',
  deliveryDays:1,
  priceCents:999
}]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  })
  return deliveryOption||deliveryOption[0];
}

function isWeekend(date){
  const checkDate=date.format('dddd');
  return checkDate==='Saturday'||checkDate==='Sunday'
}

export function calculateDeliveryDate(deliveryOption){
  let count=deliveryOption.deliveryDays;
  // let add=0;
  // //console.log(count)
  let deliveryDate=dayjs();

  while(count>0){
    deliveryDate=deliveryDate.add(1,'days');
    if(!isWeekend(deliveryDate))
      count--;
  }
  const dateString=deliveryDate.format('dddd, MMMM D')
  return dateString;
}