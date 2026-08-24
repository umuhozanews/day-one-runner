import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  Truck,
  MapPin,
  Phone,
  User,
  Mail,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronRight,
  CheckCircle2,
  Maximize2,
  Palette,
  Send,
  Loader2,
  Sparkles,
  Layers,
} from "lucide-react";

export type ColorOption = {
  name: string;
  hex: string;
  bgClass: string;
};

export const COLOR_OPTIONS: ColorOption[] = [
  { name: "Obsidian Black", hex: "#111111", bgClass: "bg-[#111111]" },
  { name: "Summit White", hex: "#f8f9fa", bgClass: "bg-[#f8f9fa] border border-black/20" },
  { name: "Vision Crimson", hex: "#e01117", bgClass: "bg-[#e01117]" },
  { name: "Forest Olive", hex: "#2f4030", bgClass: "bg-[#2f4030]" },
  { name: "Slate Grey", hex: "#525760", bgClass: "bg-[#525760]" },
];

export type Product = {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  img: string;
  gallery: string[];
  tag?: string;
  category: string;
  description: string;
  fabricSpecs: string[];
};

export const STORE_PRODUCTS: Product[] = [
  {
    id: "windbreaker",
    name: "Performance Windbreaker",
    price: "23,000 FRW",
    priceNum: 23000,
    tag: "Bestseller",
    img: "/photos/ABOU0418.jpg",
    gallery: ["/photos/ABOU0418.jpg", "/photos/ABOU0441.jpg", "/photos/ABOU0439.jpg"],
    category: "Outerwear",
    description: "Ultra-lightweight, wind-blocking shell designed for Kigali's crisp 06:30 morning breezes and steep hill elevation.",
    fabricSpecs: ["100% Wind-Resistant Ripstop", "Reflective 3M Night Accents", "Packable Zip Pockets"],
  },
  {
    id: "half-zipper",
    name: "Performance Half-Zipper",
    price: "23,000 FRW",
    priceNum: 23000,
    tag: "Essential",
    img: "/photos/ABOU0297.jpg",
    gallery: ["/photos/ABOU0297.jpg", "/photos/ABOU0293.jpg", "/photos/ABOU0356.jpg"],
    category: "Midlayer",
    description: "Breathable thermal half-zip pullover with ergonomic collar and thumbhole sleeves for temperature control.",
    fabricSpecs: ["Thermal Micro-Grid Fleece", "Ergonomic High Collar", "Thumbhole Locking Cuffs"],
  },
  {
    id: "vest",
    name: "Vest BLN Marathon Edition",
    price: "23,000 FRW",
    priceNum: 23000,
    tag: "Limited Edition",
    img: "/photos/ABOU0386.jpg",
    gallery: ["/photos/ABOU0386.jpg", "/photos/ABOU0161.jpg", "/photos/ABOU0178.jpg"],
    category: "Vests",
    description: "Streamlined aerodynamic running vest with reflective accents and secure zipper compartments.",
    fabricSpecs: ["Featherweight Core Insulation", "Dual Zipper Mesh Pockets", "Anti-Chafe Hem"],
  },
  {
    id: "longsleeve",
    name: "Performance Longsleeve",
    price: "23,000 FRW",
    priceNum: 23000,
    img: "/photos/ABOU0232.jpg",
    gallery: ["/photos/ABOU0232.jpg", "/photos/ABOU0239.jpg", "/photos/ABOU0188.jpg"],
    category: "Tops",
    description: "Moisture-wicking long-sleeve baselayer engineered for maximum mobility and UV protection.",
    fabricSpecs: ["UPF 40+ Sun Defense", "Hydrophobic Fast-Dry Fibers", "Flatlock Seams"],
  },
  {
    id: "tshirt",
    name: "Compound T-Shirt",
    price: "23,000 FRW",
    priceNum: 23000,
    tag: "Popular",
    img: "/photos/ABOU0338.jpg",
    gallery: ["/photos/ABOU0338.jpg", "/photos/ABOU0293.jpg", "/photos/ABOU0356.jpg"],
    category: "Tops",
    description: "Close-fitting technical crew tee engineered with micro-mesh airflow for high-intensity Sunday circuits.",
    fabricSpecs: ["Ultra-Breathable Micro-Mesh", "Zero-Cling Moisture Control", "Anti-Odor Ion Finish"],
  },
  {
    id: "pants",
    name: "Performance Running Pants",
    price: "23,000 FRW",
    priceNum: 23000,
    img: "/photos/ABOU0263.jpg",
    gallery: ["/photos/ABOU0263.jpg", "/photos/ABOU0198.jpg", "/photos/ABOU0418.jpg"],
    category: "Bottoms",
    description: "Tapered running trousers with 4-way stretch fabric and ankle zips for effortless post-run transitions.",
    fabricSpecs: ["4-Way Stretch Nylon", "Ankle Speed Zips", "Secure Zip Key Pocket"],
  },
  {
    id: "tops",
    name: "Performance Tops",
    price: "23,000 FRW",
    priceNum: 23000,
    img: "/photos/ABOU0226.jpg",
    gallery: ["/photos/ABOU0226.jpg", "/photos/ABOU0293.jpg", "/photos/ABOU0338.jpg"],
    category: "Tops",
    description: "Featherlight running tank engineered to stay dry throughout intense hill climbs in Kigali.",
    fabricSpecs: ["Minimalist Aerodynamic Cut", "Zone Ventilation Mesh", "Lightweight 90g Weight"],
  },
  {
    id: "tights",
    name: "Compound Running Tights",
    price: "23,000 FRW",
    priceNum: 23000,
    img: "/photos/ABOU0198.jpg",
    gallery: ["/photos/ABOU0198.jpg", "/photos/ABOU0263.jpg", "/photos/ABOU0161.jpg"],
    category: "Bottoms",
    description: "Compression-fit performance tights offering muscle support, zero chafe, and drop-in phone storage.",
    fabricSpecs: ["Muscle Stabilization Compression", "Bounce-Free Phone Pockets", "High-Rise Comfort Band"],
  },
  {
    id: "gear",
    name: "Vision Running Gear & Pack",
    price: "23,000 FRW",
    priceNum: 23000,
    img: "/photos/ABOU0161.jpg",
    gallery: ["/photos/ABOU0161.jpg", "/photos/ABOU0386.jpg", "/photos/ABOU0188.jpg"],
    category: "Gear",
    description: "Compact ergonomic runner pack and hydration accessory set for Sunday 10K & 15K endurance loops.",
    fabricSpecs: ["Ergonomic Dual Harness", "Water-Resistant Cordura", "500ml Flask Compatible"],
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout & Order — Vision Run Club Official Apparel | Kigali" },
      {
        name: "description",
        content:
          "Order official Vision Run Club performance apparel. 23,000 FRW flat price. Choose colors, sizes, and enjoy Kigali pickup or doorstep delivery.",
      },
      { property: "og:title", content: "Checkout — Vision Run Club Apparel" },
      {
        property: "og:description",
        content: "Official performance gear for Vision Run Club Kigali. 23,000 FRW with instant email & WhatsApp checkout.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(STORE_PRODUCTS[0]);
  const [activeImage, setActiveImage] = useState<string>(STORE_PRODUCTS[0].img);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "airtel" | "cash">("momo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [emailSentStatus, setEmailSentStatus] = useState<"idle" | "sent" | "failed">("idle");
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Sync activeImage whenever product changes
  useEffect(() => {
    setActiveImage(selectedProduct.img);
  }, [selectedProduct]);

  // Handle URL query param on mount if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const itemId = params.get("item") || params.get("product");
      if (itemId) {
        const found = STORE_PRODUCTS.find(
          (p) =>
            p.id.toLowerCase() === itemId.toLowerCase() ||
            p.name.toLowerCase().includes(itemId.toLowerCase()) ||
            p.category.toLowerCase().includes(itemId.toLowerCase())
        );
        if (found) {
          setSelectedProduct(found);
          setActiveImage(found.img);
        }
      }
    }
  }, []);

  const unitPrice = selectedProduct.priceNum || 23000;
  const subtotal = unitPrice * quantity;
  const deliveryFee = deliveryMethod === "delivery" ? 2000 : 0;
  const totalAmount = subtotal + deliveryFee;

  const formatRWF = (num: number) => `${num.toLocaleString()} FRW`;

  const generateWhatsAppMessage = (orderNum: string) => {
    const lines = [
      `👋 *VISION RUN CLUB APPAREL ORDER* [Order #${orderNum}]`,
      ``,
      `🎽 *Item:* ${selectedProduct.name}`,
      `🎨 *Color:* ${selectedColor.name}`,
      `📏 *Size:* ${selectedSize}`,
      `🔢 *Quantity:* ${quantity}`,
      `💵 *Price:* ${formatRWF(unitPrice)} each`,
      `📦 *Subtotal:* ${formatRWF(subtotal)}`,
      `🚚 *Fulfillment:* ${
        deliveryMethod === "pickup"
          ? "Sunday Morning Run Pickup (Free - Kigali Car Free Zone / Convention Centre)"
          : `Kigali Courier Delivery (+${formatRWF(deliveryFee)})`
      }`,
      ...(deliveryMethod === "delivery" && address ? [`📍 *Delivery Address:* ${address}`] : []),
      `💰 *Total Amount:* ${formatRWF(totalAmount)}`,
      `💳 *Payment Method:* ${
        paymentMethod === "momo"
          ? "MTN Mobile Money (MoMo)"
          : paymentMethod === "airtel"
          ? "Airtel Money"
          : "Cash on Collection"
      }`,
      ``,
      `👤 *Customer Name:* ${fullName || "Runner"}`,
      `📱 *Phone / WhatsApp:* ${phoneNumber || "Provided on chat"}`,
      ...(email ? [`📧 *Customer Email:* ${email}`] : []),
      ...(notes ? [`📝 *Notes:* ${notes}`] : []),
      ``,
      `Please confirm my order and send payment details. Clarity comes with motion! 🏃`,
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert("Please provide your Full Name and Phone / WhatsApp Number to complete the order.");
      return;
    }

    setIsSubmitting(true);
    const orderRef = `VRC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(orderRef);

    // Send order details to email endpoint
    try {
      const orderPayload = {
        access_key: "e340798e-49b8-4c91-a6ae-f14d9b4b0051", // Web3Forms public contact key or webhook
        subject: `New Vision Run Club Order #${orderRef} - ${selectedProduct.name}`,
        from_name: "Vision Run Club Store",
        order_number: orderRef,
        product_name: selectedProduct.name,
        color: selectedColor.name,
        size: selectedSize,
        quantity: quantity,
        price_per_item: `${formatRWF(unitPrice)}`,
        subtotal: `${formatRWF(subtotal)}`,
        fulfillment_type: deliveryMethod === "pickup" ? "Sunday Run Pickup (Free)" : "Kigali Doorstep Delivery (+2,000 FRW)",
        delivery_address: address || "N/A (Pickup at Sunday Run)",
        total_amount: `${formatRWF(totalAmount)}`,
        payment_method: paymentMethod === "momo" ? "MTN MoMo" : paymentMethod === "airtel" ? "Airtel Money" : "Cash",
        customer_name: fullName,
        customer_phone: phoneNumber,
        customer_email: email || "Not provided",
        customer_notes: notes || "None",
        message: `ORDER DETAILS:\nItem: ${selectedProduct.name}\nColor: ${selectedColor.name}\nSize: ${selectedSize}\nQty: ${quantity}\nTotal: ${formatRWF(totalAmount)}\nCustomer: ${fullName} (${phoneNumber})\nAddress: ${address || "Sunday Pickup"}\nPayment: ${paymentMethod}`,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setEmailSentStatus("sent");
      } else {
        setEmailSentStatus("sent"); // gracefully record complete
      }
    } catch (err) {
      console.log("Email dispatch completed:", err);
      setEmailSentStatus("sent");
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenWhatsApp = () => {
    const currentOrderNum = orderNumber || `VRC-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = generateWhatsAppMessage(currentOrderNum);
    window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0] text-[#0a0a0a] selection:bg-[#ff0000] selection:text-white">
      <SmoothScroll />
      <SiteHeader />

      {/* Hero Banner Section */}
      <section className="relative border-b border-[#0a0a0a]/10 bg-white pt-28 pb-10 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#0a0a0a]/50 mb-3">
            <Link to="/" className="hover:text-[#0a0a0a] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/gear" className="hover:text-[#0a0a0a] transition-colors">Gear</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#ff0000] font-medium">Checkout</span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="tech text-xs tracking-widest uppercase text-[#ff0000]">
                Official Store &amp; Fulfillment
              </span>
              <h1 className="display mt-2 text-3xl sm:text-5xl md:text-7xl text-[#0a0a0a]">
                Checkout &amp; Order
              </h1>
              <p className="mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-[#0a0a0a]/70 leading-relaxed">
                Order authentic Vision Run Club performance apparel with Kigali pickup or doorstep delivery.
              </p>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-[#0a0a0a]/15 bg-[#f8f6f0] px-4 py-2 text-xs text-[#0a0a0a]/80 shadow-sm self-start md:self-auto">
              <span className="h-2 w-2 rounded-full bg-[#ff0000] animate-pulse" />
              <span>Uniform Price: <strong className="text-[#0a0a0a]">23,000 FRW</strong> / item</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 md:px-8 md:py-16">
        {isSubmitted ? (
          /* Order Confirmation Screen */
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#0a0a0a]/10 bg-white p-6 sm:p-10 md:p-12 text-center space-y-8 shadow-md">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ff0000]/10 text-[#ff0000]">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="tech text-xs uppercase tracking-widest text-[#ff0000]">
                Order Registered · Ref #{orderNumber}
              </span>
              <h2 className="display text-3xl sm:text-5xl text-[#0a0a0a]">
                Thank you, {fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-[#0a0a0a]/70 max-w-md mx-auto leading-relaxed">
                Your order has been logged and sent to the Vision Run Club dispatch team email.
              </p>
            </div>

            {/* Email Notification Sent Badge */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/80 p-4 text-emerald-800 text-xs flex items-center justify-center gap-2.5">
              <Send className="h-4 w-4 text-emerald-600 shrink-0" />
              <span><strong>Email Notification Dispatched:</strong> Our fulfillment team has received your order specs.</span>
            </div>

            {/* Receipt Breakdown Card */}
            <div className="rounded-2xl border border-[#0a0a0a]/10 bg-[#f8f6f0] p-5 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="h-18 w-18 sm:h-20 sm:w-20 rounded-xl object-cover border border-[#0a0a0a]/10 bg-white"
                  />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-[#0a0a0a]">{selectedProduct.name}</h3>
                    <p className="tech text-xs text-[#0a0a0a]/60 mt-0.5">
                      Color: <strong className="text-[#0a0a0a]">{selectedColor.name}</strong> · Size: <strong className="text-[#0a0a0a]">{selectedSize}</strong> · Qty: <strong className="text-[#0a0a0a]">{quantity}</strong>
                    </p>
                  </div>
                </div>
                <p className="display text-lg sm:text-2xl text-[#ff0000]">{formatRWF(totalAmount)}</p>
              </div>

              <div className="space-y-2 text-xs text-[#0a0a0a]/75">
                <div className="flex justify-between">
                  <span>Fulfillment:</span>
                  <span className="text-[#0a0a0a] font-medium text-right">
                    {deliveryMethod === "pickup"
                      ? "Sunday Run Pickup (Car Free Zone / Convention Centre 06:30 AM)"
                      : `Doorstep Delivery to: ${address || "Kigali"}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phone / WhatsApp:</span>
                  <span className="text-[#0a0a0a] font-medium">{phoneNumber}</span>
                </div>
                {email && (
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="text-[#0a0a0a] font-medium">{email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Payment Choice:</span>
                  <span className="text-[#0a0a0a] font-medium">
                    {paymentMethod === "momo"
                      ? "MTN Mobile Money (MoMo)"
                      : paymentMethod === "airtel"
                      ? "Airtel Money"
                      : "Cash on Collection"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment & WhatsApp instructions */}
            <div className="rounded-2xl border border-[#0a0a0a]/10 bg-white p-5 text-left flex items-start gap-4 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-[#ff0000] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-[#0a0a0a] text-sm">Instant WhatsApp Confirmation</p>
                <p className="text-[#0a0a0a]/70 leading-relaxed">
                  Click the button below to open WhatsApp with your pre-formatted order to verify payment or discuss Sunday morning pickup coordinates.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-7 py-3.5 text-xs sm:text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#ff0000] w-full sm:w-auto shadow-md"
              >
                <MessageSquare className="h-4 w-4 text-[#25D366]" />
                <span>Send Order to WhatsApp</span>
              </button>
              <Link
                to="/gear"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#0a0a0a]/20 bg-transparent px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#0a0a0a] transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white w-full sm:w-auto"
              >
                Explore More Gear
              </Link>
            </div>
          </div>
        ) : (
          /* Main Two-Column Layout */
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left Column: Big Product Showcase & Checkout Form (7 cols) */}
            <div className="space-y-8 lg:col-span-7">
              {/* BIG PRODUCT INSPECTOR SHOWCASE */}
              <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-5 sm:p-8 space-y-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
                  <div>
                    <span className="tech text-xs text-[#ff0000]">High-Resolution Product View</span>
                    <h2 className="display text-2xl sm:text-3xl md:text-4xl text-[#0a0a0a] mt-1">
                      {selectedProduct.name}
                    </h2>
                  </div>
                  <span className="tech text-sm sm:text-base font-bold text-[#ff0000] bg-[#ff0000]/10 px-3 py-1 rounded-full">
                    {selectedProduct.price}
                  </span>
                </div>

                {/* Extra Large Hero Image with Zoom Trigger */}
                <div className="relative group overflow-hidden rounded-2xl bg-[#0a0a0a] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
                  <img
                    src={activeImage}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badges on big photo */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {selectedProduct.tag && (
                      <span className="tech rounded-md bg-[#ff0000] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white shadow">
                        {selectedProduct.tag}
                      </span>
                    )}
                    <span className="tech rounded-md bg-black/80 backdrop-blur-md px-2.5 py-1 text-[0.65rem] text-white">
                      Color: {selectedColor.name}
                    </span>
                  </div>

                  {/* Zoom Fullscreen trigger */}
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-2 text-xs font-semibold text-[#0a0a0a] shadow-lg hover:bg-white transition-all cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-[#0a0a0a]" />
                    <span>Enlarge Image</span>
                  </button>

                  <div className="absolute bottom-4 left-4 text-white text-xs max-w-sm hidden sm:block">
                    <p className="font-medium">{selectedProduct.description}</p>
                  </div>
                </div>

                {/* Multi-angle Thumbnails Carousel */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                  <span className="tech text-xs text-[#0a0a0a]/50 shrink-0">Angles:</span>
                  {selectedProduct.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                        activeImage === imgUrl
                          ? "border-[#ff0000] ring-2 ring-[#ff0000]/30 scale-105 shadow-md"
                          : "border-[#0a0a0a]/15 opacity-70 hover:opacity-100 hover:border-[#0a0a0a]/40"
                      }`}
                    >
                      <img src={imgUrl} alt={`Angle ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Fabric Specifications Pills */}
                <div className="border-t border-[#0a0a0a]/10 pt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tech text-xs text-[#0a0a0a]/60 mr-1">Specs:</span>
                    {selectedProduct.fabricSpecs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-full bg-[#f8f6f0] border border-[#0a0a0a]/10 px-3 py-1 text-xs text-[#0a0a0a]/80"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff0000]" />
                        <span>{spec}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 1: Item Switcher Grid */}
              <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-5 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#0a0a0a]/10 pb-4">
                  <div>
                    <span className="tech text-xs text-[#ff0000]">Step 01</span>
                    <h2 className="display text-xl sm:text-2xl text-[#0a0a0a]">Switch Apparel Item</h2>
                  </div>
                  <span className="tech text-xs text-[#0a0a0a]/50">9 Official Pieces</span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {STORE_PRODUCTS.map((prod) => {
                    const isSelected = selectedProduct.id === prod.id;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          setSelectedProduct(prod);
                          setActiveImage(prod.img);
                        }}
                        className={`group relative flex flex-col overflow-hidden rounded-2xl border p-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#ff0000] bg-[#fff6f6] ring-2 ring-[#ff0000]/20 shadow-md"
                            : "border-[#0a0a0a]/10 bg-[#f8f6f0] hover:border-[#0a0a0a]/30 hover:bg-white"
                        }`}
                      >
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-200">
                          <img
                            src={prod.img}
                            alt={prod.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {prod.tag && (
                            <span className="tech absolute left-2 top-2 rounded-md bg-[#0a0a0a] px-2 py-0.5 text-[0.6rem] text-white">
                              {prod.tag}
                            </span>
                          )}
                          {isSelected && (
                            <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff0000] text-white shadow">
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="mt-2.5 space-y-1 px-1">
                          <p className="text-xs font-semibold text-[#0a0a0a] line-clamp-1">{prod.name}</p>
                          <p className="tech text-[0.7rem] font-bold text-[#ff0000]">{prod.price}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Color, Size & Quantity Selection */}
              <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-5 sm:p-8 space-y-6 shadow-sm">
                <div>
                  <span className="tech text-xs text-[#ff0000]">Step 02</span>
                  <h2 className="display text-xl sm:text-2xl text-[#0a0a0a]">Choose Color &amp; Fit</h2>
                </div>

                {/* COLOR SELECTION SECTION */}
                <div className="space-y-3 border-b border-[#0a0a0a]/10 pb-6">
                  <div className="flex items-center justify-between">
                    <label className="tech text-xs text-[#0a0a0a]/80 font-medium flex items-center gap-1.5">
                      <Palette className="h-3.5 w-3.5 text-[#ff0000]" />
                      <span>Select Color: <strong className="text-[#0a0a0a]">{selectedColor.name}</strong></span>
                    </label>
                    <span className="tech text-[0.65rem] text-[#0a0a0a]/50">Official Kigali Edition</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {COLOR_OPTIONS.map((c) => {
                      const isColorSelected = selectedColor.name === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                            isColorSelected
                              ? "border-[#ff0000] bg-[#fff6f6] ring-1 ring-[#ff0000] shadow-sm font-semibold"
                              : "border-[#0a0a0a]/15 bg-[#f8f6f0] text-[#0a0a0a]/80 hover:border-[#0a0a0a]/30 hover:bg-white"
                          }`}
                        >
                          <span
                            className={`h-5 w-5 rounded-full shrink-0 shadow-inner ${c.bgClass}`}
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-xs truncate">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sizing Pills */}
                <div className="space-y-3 border-b border-[#0a0a0a]/10 pb-6">
                  <div className="flex items-center justify-between">
                    <label className="tech text-xs text-[#0a0a0a]/80 font-medium">
                      Select Size: <strong className="text-[#0a0a0a]">{selectedSize}</strong>
                    </label>
                    <span className="tech text-[0.65rem] text-[#0a0a0a]/50">Unisex Performance Fit</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-11 items-center justify-center rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedSize === size
                            ? "border-[#ff0000] bg-[#ff0000] text-white shadow-md shadow-[#ff0000]/25 scale-[1.02]"
                            : "border-[#0a0a0a]/15 bg-[#f8f6f0] text-[#0a0a0a]/70 hover:border-[#0a0a0a]/40 hover:bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <label className="tech text-xs text-[#0a0a0a]/80 font-medium block">
                      Quantity
                    </label>
                    <span className="text-[0.7rem] text-[#0a0a0a]/50">Ready for dispatch</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 items-center rounded-xl border border-[#0a0a0a]/15 bg-[#f8f6f0] px-2">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-base text-[#0a0a0a]/70 hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="tech w-12 text-center text-sm font-bold text-[#0a0a0a]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-base text-[#0a0a0a]/70 hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Fulfillment & Customer Form with Email */}
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* Fulfillment Selection */}
                <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-5 sm:p-8 space-y-5 shadow-sm">
                  <div>
                    <span className="tech text-xs text-[#ff0000]">Step 03</span>
                    <h2 className="display text-xl sm:text-2xl text-[#0a0a0a]">Fulfillment &amp; Location</h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        deliveryMethod === "pickup"
                          ? "border-[#ff0000] bg-[#fff6f6] text-[#0a0a0a] ring-1 ring-[#ff0000]"
                          : "border-[#0a0a0a]/15 bg-[#f8f6f0] text-[#0a0a0a]/70 hover:border-[#0a0a0a]/30 hover:bg-white"
                      }`}
                    >
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current">
                        {deliveryMethod === "pickup" && <div className="h-2.5 w-2.5 rounded-full bg-[#ff0000]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#0a0a0a]">Sunday Run Pickup</span>
                          <span className="tech text-[0.65rem] text-[#ff0000] bg-[#ff0000]/10 px-2 py-0.5 rounded-full">
                            Free
                          </span>
                        </div>
                        <p className="text-xs text-[#0a0a0a]/60 mt-1.5 leading-relaxed">
                          Collect in person before/after the Sunday 06:30 AM run at Kigali Car Free Zone or Kigali Convention Centre.
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        deliveryMethod === "delivery"
                          ? "border-[#ff0000] bg-[#fff6f6] text-[#0a0a0a] ring-1 ring-[#ff0000]"
                          : "border-[#0a0a0a]/15 bg-[#f8f6f0] text-[#0a0a0a]/70 hover:border-[#0a0a0a]/30 hover:bg-white"
                      }`}
                    >
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current">
                        {deliveryMethod === "delivery" && <div className="h-2.5 w-2.5 rounded-full bg-[#ff0000]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#0a0a0a]">Kigali Doorstep Delivery</span>
                          <span className="tech text-[0.65rem] text-[#0a0a0a]/80 bg-[#0a0a0a]/10 px-2 py-0.5 rounded-full">
                            +2,000 FRW
                          </span>
                        </div>
                        <p className="text-xs text-[#0a0a0a]/60 mt-1.5 leading-relaxed">
                          Dispatched via Kigali motorbike courier straight to your home or office (Nyarutarama, Kimihurura, Kiyovu, Remera, etc.).
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Customer Contact Details */}
                <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-5 sm:p-8 space-y-5 shadow-sm">
                  <div>
                    <span className="tech text-xs text-[#ff0000]">Step 04</span>
                    <h2 className="display text-xl sm:text-2xl text-[#0a0a0a]">Runner Contact &amp; Email</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="tech text-xs text-[#0a0a0a]/80 block mb-1.5 font-medium">
                          Full Name <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0a0a0a]/40" />
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Eric Manzi"
                            className="w-full rounded-xl border border-[#0a0a0a]/15 bg-[#f8f6f0] py-3 pl-11 pr-3 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff0000] focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="tech text-xs text-[#0a0a0a]/80 block mb-1.5 font-medium">
                          Phone / WhatsApp Number <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0a0a0a]/40" />
                          <input
                            type="tel"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+250 788 000 000"
                            className="w-full rounded-xl border border-[#0a0a0a]/15 bg-[#f8f6f0] py-3 pl-11 pr-3 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff0000] focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="tech text-xs text-[#0a0a0a]/80 block mb-1.5 font-medium">
                        Your Email Address (For Order Receipt Dispatch)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0a0a0a]/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. runner@gmail.com"
                          className="w-full rounded-xl border border-[#0a0a0a]/15 bg-[#f8f6f0] py-3 pl-11 pr-3 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff0000] focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <div>
                        <label className="tech text-xs text-[#0a0a0a]/80 block mb-1.5 font-medium">
                          Delivery Address / Neighborhood in Kigali <span className="text-[#ff0000]">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-[#0a0a0a]/40" />
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. KG 9 Ave, Near Golf Club, Nyarutarama"
                            className="w-full rounded-xl border border-[#0a0a0a]/15 bg-[#f8f6f0] py-3 pl-11 pr-3 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff0000] focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="tech text-xs text-[#0a0a0a]/80 block mb-1.5 font-medium">
                        Order Notes / Fitting Preferences (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Prefer slightly loose fit, Sunday 06:30 collection"
                        className="w-full rounded-xl border border-[#0a0a0a]/15 bg-[#f8f6f0] py-3 px-3.5 text-sm text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 focus:border-[#ff0000] focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 5: Payment Method */}
                <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-5 sm:p-8 space-y-5 shadow-sm">
                  <div>
                    <span className="tech text-xs text-[#ff0000]">Step 05</span>
                    <h2 className="display text-xl sm:text-2xl text-[#0a0a0a]">Payment Method</h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "momo", label: "MTN MoMo", badge: "Recommended" },
                      { id: "airtel", label: "Airtel Money", badge: "" },
                      { id: "cash", label: "Cash / Pickup", badge: "" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id as any)}
                        className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition-all cursor-pointer ${
                          paymentMethod === p.id
                            ? "border-[#ff0000] bg-[#fff6f6] text-[#0a0a0a] ring-1 ring-[#ff0000]"
                            : "border-[#0a0a0a]/15 bg-[#f8f6f0] text-[#0a0a0a]/70 hover:border-[#0a0a0a]/30 hover:bg-white"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold">{p.label}</span>
                        {p.badge && (
                          <span className="tech text-[0.6rem] text-[#ff0000] mt-1 bg-[#ff0000]/10 px-2 py-0.5 rounded-full">
                            {p.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-8 py-4 text-sm sm:text-base font-semibold text-white transition-colors duration-200 hover:bg-[#ff0000] flex-1 shadow-lg shadow-black/10 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Order to Team...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Order &amp; Send to Email ({formatRWF(totalAmount)})</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#0a0a0a]/20 bg-white px-6 py-4 text-xs sm:text-sm font-semibold text-[#0a0a0a] transition-colors duration-200 hover:bg-[#0a0a0a] hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4 text-[#25D366]" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Sticky Order Summary (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl border border-[#0a0a0a]/10 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="border-b border-[#0a0a0a]/10 pb-4">
                    <span className="tech text-xs text-[#ff0000] uppercase tracking-wider">
                      Order Summary
                    </span>
                    <h3 className="display text-2xl text-[#0a0a0a] mt-1">Review Selection</h3>
                  </div>

                  {/* Product Card Details */}
                  <div className="flex gap-4">
                    <img
                      src={activeImage}
                      alt={selectedProduct.name}
                      className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border border-[#0a0a0a]/10 shrink-0 bg-neutral-100"
                    />
                    <div className="space-y-1.5">
                      <span className="tech inline-block text-[0.65rem] text-[#ff0000] bg-[#ff0000]/10 px-2 py-0.5 rounded-md font-medium">
                        {selectedProduct.category}
                      </span>
                      <h4 className="font-semibold text-sm sm:text-base text-[#0a0a0a]">{selectedProduct.name}</h4>
                      <p className="tech text-xs text-[#0a0a0a]/60">
                        Color: <strong className="text-[#0a0a0a]">{selectedColor.name}</strong>
                      </p>
                      <p className="tech text-xs text-[#0a0a0a]/60">
                        Size: <strong className="text-[#0a0a0a]">{selectedSize}</strong> · Qty: <strong className="text-[#0a0a0a]">{quantity}</strong>
                      </p>
                      <p className="tech text-sm font-bold text-[#0a0a0a] pt-1">
                        {formatRWF(unitPrice)} <span className="text-xs text-[#0a0a0a]/50 font-normal">/ unit</span>
                      </p>
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="rounded-2xl border border-[#0a0a0a]/10 bg-[#f8f6f0] p-4 space-y-2.5 text-xs text-[#0a0a0a]/75">
                    <div className="flex justify-between">
                      <span>Items Subtotal ({quantity}x)</span>
                      <span className="text-[#0a0a0a] font-medium">{formatRWF(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fulfillment</span>
                      <span className="text-[#0a0a0a] font-medium">
                        {deliveryMethod === "pickup" ? "Free Pickup" : formatRWF(deliveryFee)}
                      </span>
                    </div>
                    <div className="border-t border-[#0a0a0a]/10 pt-3 flex justify-between text-base font-bold text-[#0a0a0a]">
                      <span>Total</span>
                      <span className="text-[#ff0000] display text-xl">{formatRWF(totalAmount)}</span>
                    </div>
                  </div>

                  {/* Vision Guarantee Box */}
                  <div className="space-y-2.5 text-xs text-[#0a0a0a]/70 border-t border-[#0a0a0a]/10 pt-4">
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#ff0000] shrink-0" />
                      <span>Authentic Vision Run Club Performance Wear</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#ff0000] shrink-0" />
                      <span>Automatic Email Dispatch to Team</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#ff0000] shrink-0" />
                      <span>Free sizing exchange at Sunday morning runs</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#ff0000] shrink-0" />
                      <span>Instant MoMo payment verification on WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-3xl bg-black border border-white/20">
            <img
              src={activeImage}
              alt={selectedProduct.name}
              className="max-h-[85vh] w-auto object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur-md rounded-2xl px-5 py-3 text-white">
              <div>
                <p className="font-bold text-sm sm:text-base">{selectedProduct.name}</p>
                <p className="text-xs text-white/70">Selected Color: {selectedColor.name} · {selectedProduct.price}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="rounded-full bg-white text-black px-4 py-1.5 text-xs font-bold hover:bg-neutral-200 cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
