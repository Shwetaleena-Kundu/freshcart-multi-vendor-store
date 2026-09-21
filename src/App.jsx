import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import CheckoutBar from "./components/CheckoutBar";
import CartView from "./components/CartView";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("freshCart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Could not load the saved cart:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("freshCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsCartOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function getProductQuantity(productId) {
    const cartItem = cart.find(
      (item) => item.id === productId
    );

    return cartItem ? cartItem.quantity : 0;
  }

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function openCart() {
    if (cart.length > 0) {
      setIsCartOpen(true);
    }
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#e9eee9] sm:py-6">
      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#fffdf8] pb-32 shadow-[0_0_45px_rgba(30,64,48,0.14)] sm:min-h-[calc(100vh-48px)] sm:rounded-[32px]">
        <header className="px-4 pb-4 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
                🌿
              </div>

              <div>
                <h1 className="text-xl font-black tracking-tight text-[#123c2d]">
                  FreshCart
                </h1>

                <p className="text-[11px] font-medium text-stone-500">
                  Local stores, one cart
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCart}
              disabled={itemCount === 0}
              aria-label={`Open cart with ${itemCount} items`}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-xl shadow-sm disabled:cursor-default"
            >
              🛒

              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#f07822] px-1 text-[11px] font-black text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          <section className="relative mt-5 overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0d5038] to-[#08704a] px-5 py-6 text-white shadow-[0_15px_30px_rgba(13,80,56,0.22)]">
            <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-lime-300/15" />
            <div className="absolute -bottom-12 right-12 h-28 w-28 rounded-full bg-emerald-300/10" />

            <div className="absolute bottom-3 right-4 rotate-[-5deg] text-6xl opacity-90">
              🛍️
            </div>

            <div className="relative max-w-[245px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                Neighbourhood favourites
              </p>

              <h2 className="mt-2 text-[27px] font-black leading-[1.12] tracking-tight">
                Fresh groceries,
                <span className="block text-[#ffc66d]">
                  local stores.
                </span>
              </h2>

              <p className="mt-3 text-xs leading-5 text-emerald-50/85">
                Shop across stores and manage everything in one simple cart.
              </p>
            </div>
          </section>
        </header>

        <main className="px-4">
          <section className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#16845a]">
                Store catalogue
              </p>

              <h2 className="mt-1 text-[23px] font-black tracking-tight text-[#17211b]">
                Shop essentials
              </h2>

              <p className="mt-0.5 text-xs font-medium text-stone-500">
                {products.length} products · 2 local stores
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
              Fresh stock
            </span>
          </section>

          <section className="space-y-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={getProductQuantity(product.id)}
                onAdd={addToCart}
                onDecrease={decreaseQuantity}
              />
            ))}
          </section>
        </main>
      </div>

      <CheckoutBar
        itemCount={itemCount}
        totalPrice={totalPrice}
        onViewCart={openCart}
      />

      {isCartOpen && (
        <CartView
          cart={cart}
          totalPrice={totalPrice}
          onClose={closeCart}
          onAdd={addToCart}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;