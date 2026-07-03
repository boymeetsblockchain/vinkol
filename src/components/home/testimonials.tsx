import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Small Business Owner",
    avatar: "AO",
    rating: 5,
    text: "Vinkol has completely changed how I manage deliveries for my store. Riders arrive in minutes and my customers are always satisfied. I can't imagine running my business without it.",
    color: "bg-blue-500",
  },
  {
    name: "Tunde Adeleke",
    role: "Frequent Shopper",
    avatar: "TA",
    rating: 5,
    text: "I placed an order and had it at my door in under an hour. The real-time tracking gave me peace of mind the whole time. Genuinely the best delivery app I've used in Lagos.",
    color: "bg-violet-500",
  },
  {
    name: "Ngozi Eze",
    role: "E-commerce Seller",
    avatar: "NE",
    rating: 5,
    text: "My customers love that I offer same-day delivery now. Vinkol's riders are professional and the app is super easy to use. My sales have gone up since I started using it.",
    color: "bg-emerald-500",
  },
  {
    name: "Chidi Nwosu",
    role: "Regular User",
    avatar: "CN",
    rating: 5,
    text: "The personal shopper feature is a game changer. I sent someone to pick up groceries and some items from two different stores — all in one trip. Absolutely seamless.",
    color: "bg-orange-500",
  },
  {
    name: "Fatima Aliyu",
    role: "Fashion Retailer",
    avatar: "FA",
    rating: 5,
    text: "Fast, reliable, and insured. I've sent fragile items multiple times and everything arrived perfectly. The customer support team is also very responsive whenever I need help.",
    color: "bg-pink-500",
  },
  {
    name: "Emeka Obi",
    role: "Tech Entrepreneur",
    avatar: "EO",
    rating: 5,
    text: "I use Vinkol every week. The tracking is accurate, the riders are always on time, and the pricing is fair. It's rare to find a service this consistent in Nigeria.",
    color: "bg-cyan-500",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(count)].map((_, i) => (
      <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-[#F7F8FA] w-full py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-20">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue-primary)] mb-3">
            Reviews
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Loved by thousands<br className="hidden md:block" /> across Nigeria.
            </h2>
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-3 w-fit shadow-sm flex-shrink-0">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900 ml-1">4.8</span>
              <span className="text-sm text-gray-400">· 2,000+ ratings</span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              {/* Stars */}
              <Stars count={t.rating} />

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
