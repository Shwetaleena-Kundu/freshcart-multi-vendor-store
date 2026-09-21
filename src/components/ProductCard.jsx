function ProductCard({ product, quantity, onAdd, onDecrease }) {
  const isDairy = product.category === "Dairy";
  const productEmoji = isDairy ? "🥛" : "🌿";

  const imageBackground = isDairy
    ? "from-sky-50 to-blue-100"
    : "from-lime-50 to-emerald-100";

  const storeBadge =
    product.store_id === "s2"
      ? "bg-sky-50 text-sky-700"
      : "bg-emerald-50 text-emerald-700";

  return (
    <article className="flex min-h-[140px] gap-3 rounded-[22px] border border-[#e8e5dc] bg-white p-3 shadow-[0_8px_24px_rgba(38,63,50,0.07)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(38,63,50,0.11)]">
      <div
        className={`relative flex w-[104px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br ${imageBackground}`}
      >
        <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/45" />

        <span
          role="img"
          aria-label={`${product.name} placeholder`}
          className="relative text-5xl drop-shadow-sm"
        >
          {productEmoji}
        </span>

        <span className="absolute bottom-2 rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-stone-600">
          {product.category}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div>
          <h3 className="truncate text-[17px] font-black tracking-tight text-[#17211b]">
            {product.name}
          </h3>

          <div
            className={`mt-1.5 inline-flex max-w-full items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${storeBadge}`}
          >
            <span aria-hidden="true">▣</span>
            <span className="truncate">{product.store_name}</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[21px] font-black text-[#123c2d]">
              ₹{product.price}
            </span>

            <span className="ml-1 whitespace-nowrap text-[11px] font-medium text-stone-500">
              / {product.unit}
            </span>
          </div>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="shrink-0 rounded-xl bg-[#f07822] px-4 py-2.5 text-xs font-extrabold text-white shadow-[0_6px_15px_rgba(240,120,34,0.26)] transition hover:bg-[#d96514] active:scale-95"
            >
              Add +
            </button>
          ) : (
            <div className="flex shrink-0 items-center rounded-xl bg-emerald-50 p-1">
              <button
                type="button"
                onClick={() => onDecrease(product.id)}
                aria-label={`Decrease ${product.name} quantity`}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-base font-black text-emerald-800 shadow-sm transition active:scale-90"
              >
                −
              </button>

              <span className="flex h-8 min-w-8 items-center justify-center px-1 text-sm font-black text-emerald-900">
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => onAdd(product)}
                aria-label={`Increase ${product.name} quantity`}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-base font-black text-white shadow-sm transition active:scale-90"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;