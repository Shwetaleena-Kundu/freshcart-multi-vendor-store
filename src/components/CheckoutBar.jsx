function CheckoutBar({ itemCount, totalPrice, onViewCart }) {
  const cartIsEmpty = itemCount === 0;

  return (
    <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-3 pb-3">
      <div className="flex items-center justify-between gap-3 rounded-[20px] border border-white/10 bg-[#103d2d] px-4 py-3 text-white shadow-[0_15px_40px_rgba(16,61,45,0.35)]">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
            🛒

            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f07822] px-1 text-[10px] font-black">
                {itemCount}
              </span>
            )}
          </div>

          <div>
            <p className="text-[11px] font-medium text-emerald-100">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>

            <p className="text-xl font-black leading-none">
              ₹{totalPrice}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewCart}
          disabled={cartIsEmpty}
          className="rounded-xl bg-[#f07822] px-5 py-3 text-xs font-extrabold text-white shadow-[0_6px_16px_rgba(240,120,34,0.28)] transition hover:bg-[#d96514] active:scale-95 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/45 disabled:shadow-none"
        >
          {cartIsEmpty ? "Cart is empty" : "View Cart →"}
        </button>
      </div>
    </div>
  );
}

export default CheckoutBar;