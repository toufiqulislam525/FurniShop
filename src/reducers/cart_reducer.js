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
        iid : id_color,
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
        iid : id_color,
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

  

  if(action.type === REMOVE_CART_ITEM){
    const tempCart = state.cart.filter((item) => item.iid !== action.payload);
    return{...state, cart : tempCart};
  }

  if(action.type === CLEAR_CART){
    return {...state, cart : []}
  }

  
  if(action.type === TOGGLE_CART_ITEM_AMOUNT){

    const {id,iid,value} = action.payload;
    let total_added = 0;
    
    state.cart.forEach((i)=>
    {
      if(i.id === id){
        total_added += i.amount;
      }
    })
    
    const tempCart = state.cart.map((item)=>
    {
      if(item.iid === iid){
        if(value === 'inc'){
          let new_amount = total_added + 1;
          if(new_amount > item.max){
            new_amount = item.amount;
          }
          else{
            new_amount = item.amount + 1;
          }
          return {...item, amount : new_amount};

        }

        if(value === 'dec'){
          let new_amount = item.amount - 1;
          if(new_amount < 1){
            new_amount = 1
          }
          return {...item, amount : new_amount};

        }


      }
      else{
        return item;
      }
    });

    return {...state, cart : tempCart}

  }

  if(action.type === COUNT_CART_TOTALS){
      const {total_items, total_amount} = state.cart.reduce(
        (total,cartItem) => {
        const {amount,price} = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
      
        return total

    },{
      total_items :0,
      total_amount : 0
    })
    
    return {...state, total_items,total_amount};
  }

  


  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer;
