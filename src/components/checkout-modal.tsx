import { useEffect, useState } from "react";
import { X, Check, ShoppingBag, MapPin, Phone, User, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export type ProductItem = {
  name: string;
  price: string;
  priceNum: number;
  img: string;
  tag?: string;
  category?: string;
};

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  allProducts?: ProductItem[];
  onSelectProduct?: (product: ProductItem) => void;
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export function CheckoutModal({
  isOpen,
  onClose,
  product,
  allProducts = [],
  onSelectProduct,
}: CheckoutModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(product);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "airtel" | "cash">("momo");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Sync with prop changes
  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
      setIsSubmitted(false);
    }
  }, [product]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !selectedProduct) return null;

  const unitPrice = selectedProduct.priceNum || 23000;
  const subtotal = unitPrice * quantity;
  const deliveryFee = deliveryMethod === "delivery" ? 2000 : 0;
  const totalAmount = subtotal + deliveryFee;

  const formatRWF = (amount: number) => {
    return `${amount.toLocaleString()} FRW`;
  };

  const handleProductChange = (prod: ProductItem) => {
    setSelectedProduct(prod);
    if (onSelectProduct) onSelectProduct(prod);
  };

  const generateWhatsAppMessage = (orderNum: string) => {
    const lines = [
      `👋 *VISION RUN CLUB APPAREL ORDER* [Order #${orderNum}]`,
      ``,
      `🎽 *Item:* ${selectedProduct.name}`,
      `📏 *Size:* ${selectedSize}`,
      `🔢 *Quantity:* ${quantity}`,
      `💵 *Price:* ${formatRWF(unitPrice)} each`,
      `📦 *Subtotal:* ${formatRWF(subtotal)}`,
      `🚚 *Delivery Method:* ${
        deliveryMethod === "pickup"
          ? "Sunday Morning Run Pickup (Free - Kigali Car Free Zone / Convention Centre)"
          : `Kigali Courier Delivery (+${formatRWF(deliveryFee)})`
      }`,
      ...(deliveryMethod === "delivery" && address ? [`📍 *Delivery Address:* ${address}`] : []),
      `💰 *Total Amount:* ${formatRWF(totalAmount)}`,
      `💳 *Payment Choice:* ${
        paymentMethod === "momo"
          ? "MTN Mobile Money"
          : paymentMethod === "airtel"
          ? "Airtel Money"
          : "Cash on Collection"
      }`,
      ``,
      `👤 *Customer Name:* ${fullName || "Runner"}`,
      `📱 *Phone / WhatsApp:* ${phoneNumber || "Provided on chat"}`,
      ...(notes ? [`📝 *Notes:* ${notes}`] : []),
      ``,
      `Please confirm my order. Clarity comes with motion! 🏃`,
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert("Please provide your name and phone number to complete the order.");
      return;
    }
    const orderRef = `VRC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderRef);
    setIsSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const currentOrderNum = orderNumber || `VRC-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = generateWhatsAppMessage(currentOrderNum);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0f0f0f] text-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff0000]/15 text-[#ff0000]">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div>
              <h2 className="display text-base sm:text-lg tracking-wide text-white">
                {isSubmitted ? "Order Confirmation" : "Checkout — Vision Gear"}
              </h2>
              <p className="tech text-[0.65rem] sm:text-xs text-white/50">
                {isSubmitted ? `Reference: #${orderNumber}` : "Official Vision Run Club Performance Wear"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {isSubmitted ? (
            /* Order Success State */
            <div className="space-y-6 text-center py-4 sm:py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0000]/20 text-[#ff0000]">
                <Check className="h-8 w-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="tech text-xs uppercase tracking-widest text-[#ff0000]">
                  Order Placed Successfully
                </span>
                <h3 className="display mt-2 text-2xl sm:text-4xl text-white">
                  Thank you, {fullName}!
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-white/70">
                  Your order for <strong className="text-white">{selectedProduct.name}</strong> ({quantity}x, Size {selectedSize}) has been registered with Order #{orderNumber}.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="mx-auto max-w-lg rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 text-left space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedProduct.img}
                      alt={selectedProduct.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{selectedProduct.name}</p>
                      <p className="tech text-xs text-white/50">Size: {selectedSize} · Qty: {quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-white">{formatRWF(totalAmount)}</p>
                </div>

                <div className="space-y-1.5 text-white/70 text-xs">
                  <div className="flex justify-between">
                    <span>Fulfillment</span>
                    <span className="text-white font-medium">
                      {deliveryMethod === "pickup"
                        ? "Sunday Run Pickup (Kigali Car Free Zone / Convention Centre 06:30)"
                        : `Courier Delivery to: ${address || "Kigali"}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contact Number</span>
                    <span className="text-white font-medium">{phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="text-white font-medium">
                      {paymentMethod === "momo"
                        ? "MTN Mobile Money (MoMo)"
                        : paymentMethod === "airtel"
                        ? "Airtel Money"
                        : "Cash on Collection"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="mx-auto max-w-lg rounded-xl border border-[#ff0000]/30 bg-[#ff0000]/10 p-4 text-left">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-[#ff0000] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-white">Next Step: Confirm &amp; Complete via WhatsApp</p>
                    <p className="text-white/80">
                      Send your pre-formatted order directly to our team on WhatsApp to confirm sizing, pickup location, or prompt MoMo payment directly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="snap-btn w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 text-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Order via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="snap-ghost w-full sm:w-auto text-sm py-3 px-6"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Product Summary Row */}
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg object-cover border border-white/10 shrink-0"
                  />
                  <div className="space-y-1">
                    {selectedProduct.tag && (
                      <span className="tech inline-block rounded-full bg-[#ff0000]/20 px-2 py-0.5 text-[0.65rem] text-[#ff0000]">
                        {selectedProduct.tag}
                      </span>
                    )}
                    <h3 className="display text-lg sm:text-xl text-white">{selectedProduct.name}</h3>
                    <p className="tech text-sm font-semibold text-[#ff0000]">
                      {formatRWF(unitPrice)} <span className="text-xs text-white/50 font-normal">/ unit</span>
                    </p>
                  </div>
                </div>

                {/* Product Switcher if multiple available */}
                {allProducts.length > 1 && (
                  <div className="border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0">
                    <label className="tech text-[0.65rem] text-white/50 block mb-1.5">Change Item:</label>
                    <select
                      value={selectedProduct.name}
                      onChange={(e) => {
                        const found = allProducts.find((p) => p.name === e.target.value);
                        if (found) handleProductChange(found);
                      }}
                      className="rounded-lg border border-white/15 bg-[#1a1a1a] px-2.5 py-1.5 text-xs text-white focus:border-[#ff0000] focus:outline-none"
                    >
                      {allProducts.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name} ({p.price})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Sizing & Quantity */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Size Selector */}
                <div>
                  <label className="tech text-xs text-white/80 block mb-2 font-medium">
                    Select Size <span className="text-[#ff0000]">*</span>
                  </label>
                  <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-10 items-center justify-center rounded-lg border text-xs font-semibold transition-all ${
                          selectedSize === size
                            ? "border-[#ff0000] bg-[#ff0000] text-white shadow-lg shadow-[#ff0000]/20"
                            : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="tech text-xs text-white/80 block mb-2 font-medium">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 items-center rounded-lg border border-white/15 bg-white/5 px-2">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-7 w-7 items-center justify-center rounded text-base text-white/70 hover:bg-white/10 hover:text-white"
                      >
                        -
                      </button>
                      <span className="tech w-10 text-center text-sm font-semibold text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="flex h-7 w-7 items-center justify-center rounded text-base text-white/70 hover:bg-white/10 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="tech text-xs text-white/50">
                      Subtotal: <strong className="text-white">{formatRWF(subtotal)}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery / Collection Option */}
              <div>
                <label className="tech text-xs text-white/80 block mb-2 font-medium">
                  Delivery / Collection Option <span className="text-[#ff0000]">*</span>
                </label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      deliveryMethod === "pickup"
                        ? "border-[#ff0000] bg-[#ff0000]/10 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current">
                      {deliveryMethod === "pickup" && <div className="h-2.5 w-2.5 rounded-full bg-[#ff0000]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">Sunday Run Pickup</span>
                        <span className="tech text-[0.65rem] text-[#ff0000] bg-[#ff0000]/15 px-1.5 py-0.5 rounded">
                          Free
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Collect directly before/after Sunday run (Kigali Car Free Zone or Convention Centre).
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                      deliveryMethod === "delivery"
                        ? "border-[#ff0000] bg-[#ff0000]/10 text-white"
                        : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                    }`}
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current">
                      {deliveryMethod === "delivery" && <div className="h-2.5 w-2.5 rounded-full bg-[#ff0000]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">Kigali Courier Delivery</span>
                        <span className="tech text-[0.65rem] text-white/70 bg-white/10 px-1.5 py-0.5 rounded">
                          +2,000 FRW
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
                        Doorstep dispatch anywhere in Kigali (Nyarutarama, Kimihurura, Kiyovu, Kicukiro, Remera).
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="tech text-xs text-white/80 block mb-1.5">
                      Your Full Name <span className="text-[#ff0000]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Marie Uwase"
                        className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#ff0000] focus:bg-white/10 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="tech text-xs text-white/80 block mb-1.5">
                      Phone / WhatsApp Number <span className="text-[#ff0000]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+250 788 123 456"
                        className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#ff0000] focus:bg-white/10 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {deliveryMethod === "delivery" && (
                  <div>
                    <label className="tech text-xs text-white/80 block mb-1.5">
                      Delivery Address / Neighborhood in Kigali <span className="text-[#ff0000]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. KG 9 Ave, House 14, Nyarutarama"
                        className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#ff0000] focus:bg-white/10 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="tech text-xs text-white/80 block mb-1.5">
                    Order Notes / Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Fitting preference, Sunday pickup time"
                    className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#ff0000] focus:bg-white/10 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="tech text-xs text-white/80 block mb-2 font-medium">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "momo", label: "MTN MoMo", badge: "Preferred" },
                    { id: "airtel", label: "Airtel Money", badge: "" },
                    { id: "cash", label: "Cash / Pickup", badge: "" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                        paymentMethod === p.id
                          ? "border-[#ff0000] bg-[#ff0000]/15 text-white font-semibold"
                          : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <span className="text-xs">{p.label}</span>
                      {p.badge && (
                        <span className="tech text-[0.6rem] text-[#ff0000] mt-0.5">{p.badge}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Total Breakdown */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Item Subtotal ({quantity}x {selectedProduct.name})</span>
                  <span>{formatRWF(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery ({deliveryMethod === "pickup" ? "Free Pickup" : "Kigali Courier"})</span>
                  <span>{deliveryFee > 0 ? formatRWF(deliveryFee) : "0 FRW"}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-[#ff0000] text-base">{formatRWF(totalAmount)}</span>
                </div>
              </div>

              {/* Submission Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="snap-btn flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold"
                >
                  <span>Confirm Order</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="snap-ghost flex items-center justify-center gap-2 py-3.5 px-5 text-sm text-white/90 hover:text-white"
                >
                  <MessageSquare className="h-4 w-4 text-[#25D366]" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
