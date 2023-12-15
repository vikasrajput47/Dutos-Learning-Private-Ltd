import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const SideCart = ({ cart, removeFromCart, closeCart, total,purchase }) => {
  const oneByone = () => {
   try {
     for(const item of cart){
       purchase(item);
       removeFromCart(item.id);
    }
    if (cart.length === 0) {
     return <Navigate to={'/userTrack'}/>
   } 
   } catch (error) {
    console.log('some error')
    }
  }
  return (
    <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          onClick={closeCart}
          className="text-gray-600 hover:text-gray-800"
        >
          &#10005; Close
        </button>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add items from the shop.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 mr-2 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-gray-500">${item.price}</p>
                </div>
                <button
                  className="ml-auto text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Total:</p>
            <p className="text-gray-700">${total.toFixed(2)}</p>
          </div>
            <button onClick={oneByone } className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

const Items = () => {
  const [items, setItems] = useState();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setItems(json));
  }, []);

  const pushDown = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    toast.success('Item added')
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const purchase = async (item) => {
    console.log(item);
    const data = await fetch("http://localhost:5000/item/setItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        rating: item.rating,
      }),
    });
    const res = await data.json();
    if (res.success) {
      console.log(res);
      toast.success(res.message);
    } else {
      toast.error(res.message)
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="flex flex-wrap justify-around flex-row text-black mx-10 px-5 py-5 my-20 ">
      {items ? (
        items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-around items-center w-80 h-96 my-4 shadow"
          >
            <img className="h-36" src={item.image} alt="itemImage" />

            <div className="flex w-72 flex-col text-center justify-center mt-4">
              <p className="text-base font-medium">{item.title}</p>
              <div className="flex justify-around my-2">
                <p className="text-yellow-500">{item.rating.rate}&#11088;</p>
                <p className="text-gray-700">${item.price}</p>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <button
                onClick={() => pushDown(item)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white w-72 text-center h-8 text-base"
              >
                Add to Cart
              </button>
              <button
                onClick={() => purchase(item)}
                className="bg-red-500 text-white mt-1 w-72 text-center h-8 text-base hover:bg-red-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {isCartOpen && cart.length > 0 && (
        <SideCart purchase={purchase}
          cart={cart}
          removeFromCart={removeFromCart}
          closeCart={toggleCart}
          total={calculateTotal()}
        />
      )}

      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        <p className="text-red-500 text-2xl">{cart.length}</p>
        🛒Cart
      </button>
    </div>
  );
};

export default Items;
