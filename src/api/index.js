import dataModel from '../dataModel'

    let getRestaurants = () => {
      return new Promise((resolve, reject) => {
            setTimeout(function(){
              resolve(dataModel); 
            }, 1500);
          });
        }

    let postOrder = () => {
      return new Promise((resolve, reject) => {
           setTimeout(function(){
             resolve(); 
           }, 1500);
         });
       }

    
    
  
  export {getRestaurants, postOrder};
  