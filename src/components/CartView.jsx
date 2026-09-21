function CartView({
  cart,
  totalPrice,
  onClose,
  onAdd,
  onDecrease,
  onRemove,
}) {
  const groupedCart = cart.reduce((stores, item) => {
    if (!stores[item.store_name]) {
      stores[item.store_name] = [];
    }

    stores[item.store_name].push(item);
    return stores;
  }, {});

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#071b14]/65 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full max-w-[430px] flex-col overflow-hidden rounded-t-[30px] bg-[#fffaf2] shadow-2xl"
      >
        <div className="mx-auto mt-2.5 h-1.5 w-12 rounded-full bg-stone-300" />

        <header className="flex items-center justify-between px-5 pb-4 pt-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#16845a]">
              Your order
            </p>

            <h2
              id="cart-heading"
              className="mt-1 text-2xl font-black tracking-tight text-[#17211b]"
            >
              Shopping cart
            </h2>

            <p className="mt-0.5 text-xs font-medium text-stone-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} from{" "}
              {Object.keys(groupedCart).length}{" "}
              {Object.keys(groupedCart).length === 1
                ? "store"
                : "stores"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-xl font-bold text-stone-700 shadow-sm transition hover:bg-stone-100 active:scale-90"
          >
            ×
          </button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
          {cart.length === 0 ? (
            <div className="rounded-3xl bg-white px-5 py-12 text-center">
              <p className="text-5xl">🛒</p>
              <h3 className="mt-3 text-lg font-black text-[#17211b]">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                Add something fresh from the catalogue.
              </p>
            </div>
          ) : (
            Object.entries(groupedCart).map(
              ([storeName, items]) => {
                const storeTotal = items.reduce(
                  (total, item) =>
                    total + item.price * item.quantity,
                  0
                );

                return (
                  <section
                    key={storeName}
                    className="overflow-hidden rounded-[22px] border border-[#e8e5dc] bg-white shadow-[0_8px_24px_rgba(38,63,50,0.07)]"
                  >
                    <header className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50/80 px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-white">
                          ▣
                        </div>

                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            Fulfilled by
                          </p>

                          <h3 className="text-sm font-black text-[#173d2f]">
                            {storeName}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm font-black text-emerald-800">
                        ₹{storeTotal}
                      </p>
                    </header>

                    <div className="divide-y divide-stone-100">
                      {items.map((item) => (
                        <article key={item.id} className="p-4">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="truncate text-sm font-black text-[#17211b]">
                                {item.name}
                              </h4>

                              <p className="mt-1 text-xs font-medium text-stone-500">
                                ₹{item.price} × {item.quantity}
                              </p>

                              <button
                                type="button"
                                onClick={() => onRemove(item.id)}
                                className="mt-2 text-[11px] font-bold text-red-500 transition hover:text-red-700"
                              >
                                Remove item
                              </button>
                            </div>

                            <div className="shrink-0 text-right">
                              <p className="text-sm font-black text-[#123c2d]">
                                ₹{item.price * item.quantity}
                              </p>

                              <div className="mt-2 flex items-center rounded-xl bg-emerald-50 p-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onDecrease(item.id)
                                  }
                                  aria-label={`Decrease ${item.name}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-black text-emerald-800 shadow-sm"
                                >
                                  −
                                </button>

                                <span className="flex h-8 min-w-8 items-center justify-center px-1 text-xs font-black text-emerald-900">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => onAdd(item)}
                                  aria-label={`Increase ${item.name}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 font-black text-white shadow-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              }
            )
          )}
        </div>

        <footer className="border-t border-stone-200 bg-white px-4 pb-5 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-stone-500">
                Grand total
              </p>

              <p className="text-2xl font-black text-[#123c2d]">
                ₹{totalPrice}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-[#f07822] px-5 py-3 text-xs font-extrabold text-white shadow-[0_6px_16px_rgba(240,120,34,0.25)] transition hover:bg-[#d96514] active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default CartView;