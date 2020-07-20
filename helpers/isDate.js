

const moment = require('moment');
const isDate=(value)=>{


   if(!value){
       return false;

   }
   const fecha = moment(value);

   if(fecha.isValid()){
       return true;
   }else{
       return false;
   }
};

module.exports={
    isDate
};

/*
const isDate=(value,{res})=>{
    console.log(value);
    console.log(res);
    


*/