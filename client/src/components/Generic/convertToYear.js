 export function convertToYear(value){

    if (value % 1 == 0)
    {
        return value+" "+"Year";
    }
    else{

         var decimal = value%1;
         var whole = value - decimal;
         decimal = decimal *12;
         if(decimal==12){
            whole++;
         }
         decimal=Math.round(decimal);

         if(decimal>0 && whole>0){
            return whole+" "+"Year"+" "+decimal+" "+"Months"
         }else if (decimal>0){
            return decimal+" "+"Months"
         }else{
            return whole+" "+"Year"
         }

    }
}