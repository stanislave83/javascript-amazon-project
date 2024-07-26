export function isWeekendDate(date){
  const checkDate=date.format('dddd');
  return checkDate==='Saturday'||checkDate==='Sunday'
}

export default isWeekendDate;