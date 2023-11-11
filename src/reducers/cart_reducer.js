import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    const {id,color,amount, product} = action.payload;
    const cart = state.cart;
    const id_color = id + color;

    let total_added = 0;
    let flag = 0

    cart.forEach((i)=>{
      if (i.id === id){
        total_added+= i.amount;
        flag = 1;
      }
    })

    const exst = cart.find((i)=>{
      let matched = i.id + i.color;
      return matched === id_color
    });

    if(exst){
      
      const tempCart = cart.map((item)=>{
        if(exst.id + exst.color === item.id + item.color){
          let new_amount = amount + total_added;
          if(new_amount > item.max){
            new_amount = item.amount + (item.max - total_added);

          }
          else{
            new_amount = amount + item.amount;
          }
          return {...item, amount:new_amount}
        }
        else{
          return item;
        }
      });

      return {...state, cart : tempCart}


    }
    
    else if(flag === 1){
      let new_amount = total_added + amount;
      if(new_amount > product.stock){
        new_amount = product.stock - total_added;
        
        if(new_amount < 1){
          return state;
        }
        
      }
      else{
        new_amount = amount;
      }

      
      
      const newItem = {
        id : id,
        name : product.name,
        color,
        amount : new_amount,
        image : product.images[0].url,
        price: product.price,
        max : product.stock,

      };

      
      
      return {...state,cart : [...state.cart,newItem]};

    }

    else{
      
      const newItem = {
        id : id,
        name : product.name,
        color,
        amount,
        image : product.images[0].url,
        price: product.price,
        max : product.stock,

      };
      
      return{...state,cart : [...state.cart,newItem]};
    
    }

  }

  

  






  // if(action.type === ADD_TO_CART){
  //   const {id,color,amount,product} = action.payload;
    
  //   const tempItem = state.cart.find(
  //     (i) => i.id === (id + color)
  //   )
  //   if(tempItem){
  //     const tempCart = state.cart.map((cartItem)=>{
  //       if(cartItem.id === id + color){
  //         let newAmount = cartItem.amount + amount;
  //         if(newAmount > cartItem.max){
  //           newAmount = cartItem.max;
  //         }
  //         return{...cartItem, amount : newAmount}
  //       }
        
  //       else{
  //         return cartItem;
  //       }
  //     });

  //     return {...state, cart : tempCart}
  //   }
    
  //   else{
  //     const newItem = {
  //       id : id + color,
  //       name : product.name,
  //       color,
  //       amount,
  //       image : product.images[0].url,
  //       price: product.price,
  //       max : product.stock,

  //     };
      
  //     return{...state,cart : [...state.cart,newItem]};
  //   }



  // }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer;
