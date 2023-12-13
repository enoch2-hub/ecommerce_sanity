import React, {createContext, useContext, useState, useEffect, Children} from "react";
import { toast } from "react-hot-toast";``

const Context = createContext();


export const StateContext = ({children}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product,quantity) => {
        //if the product is in the cart then increase quantity and price accordingly
        //  without adding a separate product.
        //if the product isn't in the cart, then obviously add it... :-|
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if (checkProductInCart) {
            
            const updatedCartItems = cartItems.map((item) => {
                if(product._id === item._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity;

            setCartItems([... cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart`)
    }

    
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc') {
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

//     const toggleCartItemQuantity = (id, value) => {
// //first find the product which is needed to be updated
        
// //next find the index of that product

// //check if inc or dec the quantity
//         if() {

//         } else if() {

//         }

//     }



    const incQty = () => {
        setQty((prevQty)=> prevQty + 1 )
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        } )
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                onAdd,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)





