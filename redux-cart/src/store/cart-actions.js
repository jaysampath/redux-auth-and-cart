import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () =>{
    return async dispatch=>{
        const fetchData = async () => {
          const response = await fetch('https://food-order-app-demo-default-rtdb.firebaseio.com/cart.json');  
          
          if(!response.ok){
              throw new Error("Could not fetch cart data")
          }

          const data = response.json();
          //console.log('in cart-actions'+data);
          return data;
        };

        try{
          const cartData = await fetchData();
        
           dispatch(cartActions.replaceCart({
               items:cartData.items || [],
               totalQuantity: cartData.totalQuantity
           }))

        }catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error',
                message:'Fetching cart data failed!'
              }))
        }
    }
}


export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending",
          message: "sending cart data!",
        })
      );
  
      const sendRequest = async () => {
        const response = await fetch(
          "https://food-order-app-demo-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
  
        if (!response.ok) {
          throw new Error("sending cart data failed.");
        }
      };
      try {
        await sendRequest();
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "success",
            message: "cart data sent succesfully!",
          })
        );
      } catch (error) {
          dispatch(uiActions.showNotification({
              status:'error',
              title:'Error',
              message:'sending cart data failed!'
            }))
      }
  
      
    };
  };