import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone,
  MapPin,
  Star,
  Menu,
  X,
  Stethoscope,
  ClipboardCheck,
  Sparkles,
  Activity,
  Droplet,
  Scissors,
  Wand2,
  Sun,
  Award,
  Layers,
  Smile,
  Anchor,
  PhoneCall,
  CalendarCheck,
  Microscope,
  HeartPulse,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  Clock,
  Quote,
  Navigation,
  MessageCircle,
  Mail,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Global helpers                                                       */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "09999108937";
const PHONE_TEL = "+919999108937";
const ADDRESS =
  "Flat No. 33, First Floor, Near Prakash Brothers, Bhagat Singh Market, Gole Market, New Delhi, Delhi 110001";

function ToothMark({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6C18 6 14 9 10 9C6.5 9 5 12 5 16.5C5 23 7.5 30 9.5 36C10.7 39.8 12 42.5 14.5 42.5C17 42.5 17.5 35.5 19 30.5C19.7 28.2 20.8 27 22 27C23.2 27 24.3 28.2 25 30.5C26.5 35.5 27 42.5 29.5 42.5C32 42.5 33.3 39.8 34.5 36C36.5 30 39 23 39 16.5C39 12 37.5 9 34 9C30 9 26 6 24 6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Smile-arc signature element: an animated curve that "draws" on view */
function SmileArcDivider({ flip = false, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className={`pointer-events-none w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 80"
        className={`w-full h-12 md:h-16 ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="smileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F766E" />
            <stop offset="50%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,10 C 200,75 400,75 600,40 C 800,5 1000,5 1200,40"
          stroke="url(#smileGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* Scroll-reveal wrapper */
function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Button with ripple micro-interaction */
function RippleButton({ as = "button", href, onClick, className = "", children, ...rest }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((r) => [...r, { id, x, y }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    if (onClick) onClick(e);
  };

  const Comp = as === "a" ? "a" : "button";

  return (
    <Comp
      href={as === "a" ? href : undefined}
      onClick={handleClick}
      className={`relative overflow-hidden isolate ${className}`}
      {...rest}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.35, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 16,
            height: 16,
            marginLeft: -8,
            marginTop: -8,
            borderRadius: "9999px",
            background: "currentColor",
            pointerEvents: "none",
          }}
        />
      ))}
    </Comp>
  );
}

/* Animated counter */
function Counter({ target, suffix = "", decimals = 0, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    desc: "Comprehensive oral health exams and preventive care for every member of your family.",
  },
  {
    icon: ClipboardCheck,
    title: "Dental Checkups",
    desc: "Routine examinations and digital diagnostics to catch issues early and keep your smile on track.",
  },
  {
    icon: Sparkles,
    title: "Teeth Cleaning",
    desc: "Professional cleaning that gently removes plaque, tartar and surface stains for a brighter smile.",
  },
  {
    icon: Activity,
    title: "Root Canal Treatment",
    desc: "Gentle, precise endodontic therapy that relieves pain and saves your natural tooth.",
  },
  {
    icon: Droplet,
    title: "Dental Fillings",
    desc: "Durable, tooth-coloured composite fillings that blend seamlessly with your natural teeth.",
  },
  {
    icon: Scissors,
    title: "Tooth Extraction",
    desc: "Safe, comfortable removal of damaged, decayed or impacted teeth with careful aftercare.",
  },
  {
    icon: Wand2,
    title: "Cosmetic Dentistry",
    desc: "Aesthetic treatments designed to refine, brighten and elevate the beauty of your smile.",
  },
  {
    icon: Sun,
    title: "Teeth Whitening",
    desc: "Lift years of staining with advanced, dentist-grade whitening for a noticeably brighter smile.",
  },
  {
    icon: Award,
    title: "Dental Crowns",
    desc: "Custom-crafted crowns that restore strength, shape and a natural appearance to worn teeth.",
  },
  {
    icon: Layers,
    title: "Dental Bridges",
    desc: "Reliable, long-lasting solutions to replace missing teeth and restore everyday function.",
  },
  {
    icon: Smile,
    title: "Smile Makeovers",
    desc: "Complete, personalised smile transformations designed around your goals and facial features.",
  },
  {
    icon: Anchor,
    title: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacements that look, feel and function like the real thing.",
  },
  {
    icon: PhoneCall,
    title: "Emergency Dental Care",
    desc: "Prompt, compassionate care for dental emergencies when you need relief the most.",
  },
];

const PROCESS = [
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    desc: "Reserve your visit online or with a quick call — pick a time that fits your schedule.",
  },
  {
    icon: Microscope,
    title: "Consultation & Diagnosis",
    desc: "A thorough examination and digital imaging help us understand exactly what you need.",
  },
  {
    icon: HeartPulse,
    title: "Personalised Treatment",
    desc: "We design a treatment plan tailored to your comfort, goals and budget.",
  },
  {
    icon: Smile,
    title: "Healthy, Confident Smile",
    desc: "Walk out with lasting results and a smile you're proud to share.",
  },
];

const STATS = [
  { target: 467, suffix: "+", label: "Patient Reviews" },
  { target: 4.9, suffix: "", decimals: 1, label: "Average Rating" },
  { target: 1000, suffix: "+", label: "Happy Patients" },
  { target: 10, suffix: "+", label: "Years of Experience" },
];

const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    role: "Root Canal Treatment",
    rating: 5,
    text:
      "From the moment I walked in, the team made me feel completely at ease. The treatment was painless and the clinic feels like a five-star space, not a dental office.",
  },
  {
    name: "Rohit Verma",
    role: "Smile Makeover",
    rating: 5,
    text:
      "I was hesitant about getting work done on my smile, but the team walked me through every step. The results have honestly changed how confident I feel.",
  },
  {
    name: "Priya Nair",
    role: "Teeth Whitening",
    rating: 5,
    text:
      "Quick, comfortable and the results were visible immediately. The clinic is spotless, modern and the staff are wonderfully warm.",
  },
  {
    name: "Karan Mehta",
    role: "Dental Implants",
    rating: 4,
    text:
      "Professional from start to finish. They explained the entire implant process clearly and the follow-up care has been excellent.",
  },
  {
    name: "Simran Kaur",
    role: "Routine Checkup",
    rating: 5,
    text:
      "My kids actually look forward to their dental visits now. Gentle, friendly and genuinely caring — exactly what a family clinic should be.",
  },
];

const FAQS = [
  {
    q: "How often should I visit a dentist?",
    a: "We recommend a check-up and professional cleaning every six months. Regular visits help us catch potential issues early, before they become bigger and more costly to treat.",
  },
  {
    q: "Is teeth whitening safe?",
    a: "Yes. Our in-clinic whitening treatments use dentist-supervised, clinically tested formulations designed to brighten your smile while protecting enamel and gum health.",
  },
  {
    q: "Do you provide emergency dental treatment?",
    a: "Absolutely. We keep slots reserved for urgent cases such as severe pain, swelling, broken teeth or trauma. Call us directly and we'll prioritise getting you seen quickly.",
  },
  {
    q: "How long does a root canal treatment take?",
    a: "Most root canal treatments are completed in one to two visits of around 45-60 minutes each, depending on the tooth and the extent of the infection.",
  },
  {
    q: "Do you accept dental insurance?",
    a: "We work with most major insurance providers and can help you understand your coverage before treatment begins. Speak to our front desk team for details specific to your plan.",
  },
  {
    q: "What should I expect during my first visit?",
    a: "Your first visit includes a full oral examination, digital X-rays if needed, a discussion of your dental history and a personalised care plan — all at a relaxed, unhurried pace.",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Page sections                                                         */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-br from-teal-600 to-sky-400 text-white shadow-lg shadow-teal-600/30 transition-transform duration-300 group-hover:scale-105">
            <ToothMark className="h-5 w-5" />
          </span>
          <span className="font-display font-semibold text-lg md:text-xl text-slate-900 tracking-tight">
            White Oak <span className="text-teal-600">Dental</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-teal-500 rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <RippleButton
            as="a"
            href="#booking"
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/35 transition-shadow duration-300 hover:-translate-y-0.5"
          >
            Book Appointment
          </RippleButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-slate-100 mt-2"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-700 py-1.5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 text-sm font-semibold text-teal-700 py-1.5"
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <RippleButton
                as="a"
                href="#booking"
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold px-5 py-3 rounded-full text-center shadow-lg shadow-teal-600/25"
              >
                Book Appointment
              </RippleButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-50"
    >
      {/* Floating gradient blobs */}
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-teal-300/40 to-sky-300/30 blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-gradient-to-br from-sky-200/50 to-teal-200/40 blur-3xl animate-float-slower" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-teal-100 px-4 py-1.5 shadow-sm mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-semibold text-teal-700 tracking-wide uppercase">
                New Delhi&apos;s Trusted Dental Care
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-slate-900 tracking-tight"
            >
              Exceptional Dental Care For A{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-sky-400 bg-clip-text text-transparent">
                  Healthier, Brighter
                </span>
              </span>{" "}
              Smile
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-slate-500 max-w-lg leading-relaxed"
            >
              Combining advanced dental technology, personalised treatments and
              compassionate care to help you smile with confidence — right here
              in Gole Market, New Delhi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <RippleButton
                as="a"
                href="#booking"
                className="bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </RippleButton>
              <RippleButton
                as="a"
                href={`tel:${PHONE_TEL}`}
                className="bg-white text-slate-900 font-semibold px-7 py-3.5 rounded-full shadow-md border border-slate-200 hover:border-teal-200 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="h-4 w-4 text-teal-600" /> Call Now
              </RippleButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-slate-800">4.9 Rating</span>
              </div>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <MessageCircle className="h-4 w-4 text-teal-600" /> 467 Reviews
              </div>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-800">
                <ShieldCheck className="h-4 w-4 text-teal-600" /> Trusted Dental Care
              </div>
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-teal-900/10 aspect-[4/5] max-w-md mx-auto bg-gradient-to-br from-teal-600 via-teal-500 to-sky-400 p-1">
              <div className="h-full w-full rounded-[1.85rem] bg-gradient-to-br from-teal-50 to-white flex items-center justify-center overflow-hidden relative">
                <ToothMark className="h-40 w-40 text-teal-600/15 absolute" />
                <div className="relative z-10 text-center px-8">
                  <div className="mx-auto h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-5">
                    <Smile className="h-10 w-10 text-teal-600" />
                  </div>
                  <p className="font-display font-semibold text-xl text-slate-800">
                    Modern Care, <br /> Genuine Smiles
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -left-4 md:-left-10 top-10 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 animate-float"
            >
              <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-900 text-lg leading-none">1000+</p>
                <p className="text-xs text-slate-500 mt-0.5">Happy Patients</p>
              </div>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="absolute -right-4 md:-right-10 bottom-12 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 animate-float-delayed"
            >
              <div className="h-11 w-11 rounded-xl bg-sky-50 flex items-center justify-center">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-900 text-lg leading-none">4.9 / 5</p>
                <p className="text-xs text-slate-500 mt-0.5">From 467 reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    { icon: MessageCircle, title: "467+ Reviews", desc: "Verified patient feedback you can trust." },
    { icon: Star, title: "4.9★ Average Rating", desc: "Consistently rated for quality and care." },
    { icon: Activity, title: "Modern Equipment", desc: "Advanced diagnostics and treatment technology." },
    { icon: HeartPulse, title: "Patient-Centred Care", desc: "Every plan is built around your comfort." },
    { icon: Award, title: "Experienced Professionals", desc: "A skilled team with years of expertise." },
    { icon: Sparkles, title: "Comfortable Environment", desc: "A calm, welcoming space designed to ease anxiety." },
  ];

  return (
    <section className="relative bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Why Patients Trust Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">
            Care You Can Rely On
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-600 to-sky-400 flex items-center justify-center mb-4 shadow-md shadow-teal-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const points = [
    "Advanced dental technology and digital diagnostics",
    "Personalised care plans for every patient",
    "Experienced, highly trained dental team",
    "Modern, minimally invasive treatment methods",
    "Calm, comfortable clinic environment",
    "Consistently high patient satisfaction",
  ];

  return (
    <section id="about" className="relative bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative max-w-lg">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-teal-900/10 aspect-[5/4] bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-100 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: "radial-gradient(circle at 20% 20%, #0F766E 0, transparent 35%), radial-gradient(circle at 80% 80%, #38BDF8 0, transparent 35%)"
                }} />
                <div className="relative z-10 grid grid-cols-2 gap-4 p-8 w-full">
                  <div className="rounded-2xl bg-white shadow-lg p-5 flex flex-col items-start gap-2 col-span-2">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Stethoscope className="h-5 w-5 text-teal-600" />
                    </div>
                    <p className="font-display font-semibold text-slate-900">Advanced Diagnostics</p>
                    <p className="text-xs text-slate-500">Precise digital imaging for accurate treatment plans.</p>
                  </div>
                  <div className="rounded-2xl bg-white shadow-lg p-5 flex flex-col items-start gap-2">
                    <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-sky-500" />
                    </div>
                    <p className="font-display font-semibold text-slate-900 text-sm">Sterile Environment</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-sky-400 shadow-lg p-5 flex flex-col items-start gap-2 text-white">
                    <Smile className="h-6 w-6" />
                    <p className="font-display font-semibold text-sm">Gentle, Friendly Team</p>
                  </div>
                </div>
              </div>
              {/* floating badge */}
              <div className="hidden md:flex absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-5 py-4 items-center gap-3 animate-float">
                <div className="h-11 w-11 rounded-xl bg-teal-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-display font-bold text-slate-900 text-lg leading-none">10+ Years</p>
                  <p className="text-xs text-slate-500 mt-0.5">Of trusted experience</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
              About White Oak Dental
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3 leading-tight">
              Why Choose White Oak Dental?
            </h2>
            <p className="mt-5 text-slate-500 leading-relaxed max-w-xl">
              At White Oak Dental, every visit is designed around you. We pair
              modern clinical excellence with a warm, unhurried approach — so
              you always feel informed, comfortable and cared for, from your
              very first appointment to your last follow-up.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-slate-700 leading-relaxed">{point}</span>
                </motion.div>
              ))}
            </div>
            <RippleButton
              as="a"
              href="#booking"
              className="mt-9 inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3.5 rounded-full shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Schedule Your Visit <ArrowRight className="h-4 w-4" />
            </RippleButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">
            Comprehensive Care, Under One Roof
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            From routine checkups to complete smile transformations, every
            treatment is delivered with precision, comfort and a personal
            touch.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <div className="group relative h-full rounded-2xl border border-slate-100 p-6 hover:shadow-2xl hover:shadow-teal-900/5 hover:-translate-y-1.5 transition-all duration-300 bg-white overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600 to-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-sky-400 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{service.desc}</p>
                  <a
                    href="#booking"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 group-hover:gap-2.5 transition-all duration-300"
                  >
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="relative bg-slate-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            How It Works
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">
            Your Journey To A Better Smile
          </h2>
        </Reveal>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
          {PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.1} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-5 border border-teal-100 z-10">
                    <Icon className="h-6 w-6 text-teal-600" />
                    <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-teal-600 to-sky-400 text-white text-xs font-bold flex items-center justify-center shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-sky-500 py-16 md:py-20 overflow-hidden">
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="font-display font-bold text-3xl md:text-5xl text-white">
                <Counter target={stat.target} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </p>
              <p className="text-teal-50/90 text-sm md:text-base mt-2">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Patient Stories
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">
            Rated 4.9 / 5 Based On 467 Reviews
          </h2>
        </Reveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="rounded-3xl bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-100 p-8 md:p-12 text-center shadow-lg"
            >
              <Quote className="h-9 w-9 text-teal-300 mx-auto mb-5" />
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
                {t.text}
              </p>
              <div className="flex justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <p className="font-display font-semibold text-slate-900 mt-4">{t.name}</p>
              <p className="text-sm text-slate-500">{t.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="h-11 w-11 rounded-full bg-slate-50 hover:bg-teal-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-teal-600" : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="h-11 w-11 rounded-full bg-slate-50 hover:bg-teal-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number.";
    else if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (!form.date) errs.date = "Please select a preferred date.";
    if (!form.service) errs.service = "Please select a service.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", date: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 transition-all ${
      hasError ? "border-red-300" : "border-slate-200 focus:border-teal-400"
    }`;

  return (
    <section id="booking" className="relative bg-slate-50 py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Book An Appointment
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">
            Let&apos;s Get You Smiling
          </h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Fill in your details and our team will confirm your appointment
            shortly. For urgent concerns, call us directly.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-teal-100/60 to-sky-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 text-sm font-medium"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  Thank you! Your appointment request has been received. Our
                  team will contact you shortly to confirm.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5 relative z-10">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  className={inputClass(errors.name)}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="e.g. 9999108937"
                  className={inputClass(errors.phone)}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className={inputClass(errors.email)}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date *</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={update("date")}
                  className={inputClass(errors.date)}
                />
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Required *</label>
                <select
                  value={form.service}
                  onChange={update("service")}
                  className={inputClass(errors.service)}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message (optional)</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us anything we should know before your visit..."
                  className={inputClass(false)}
                />
              </div>

              <div className="sm:col-span-2">
                <RippleButton
                  as="button"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/35 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" /> Confirm Appointment
                </RippleButton>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
      >
        <span className="font-display font-semibold text-slate-900 text-base md:text-lg">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 md:px-6 pb-5 text-sm text-slate-500 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">FAQ</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <FAQItem item={item} isOpen={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
  const whatsappHref = `https://wa.me/919999108937?text=${encodeURIComponent("Hi! I'd like to book an appointment at White Oak Dental.")}`;

  return (
    <section id="contact" className="relative bg-slate-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Visit Us</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-3">Get In Touch</h2>
          <p className="text-slate-500 mt-4 leading-relaxed">
            We&apos;d love to welcome you to our clinic in Gole Market. Reach
            out by phone, WhatsApp, or stop by in person.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-6 md:p-8 h-full flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-display font-semibold text-slate-900">Phone</p>
                  <a href={`tel:${PHONE_TEL}`} className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-sky-500" />
                </div>
                <div>
                  <p className="font-display font-semibold text-slate-900">Address</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-display font-semibold text-slate-900">Hours</p>
                  <p className="text-sm text-slate-500">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-sm text-slate-500">Sunday: By Appointment</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-auto pt-4">
                <RippleButton
                  as="a"
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Phone className="h-4 w-4" /> Call
                </RippleButton>
                <RippleButton
                  as="a"
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-3 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Navigation className="h-4 w-4 text-teal-600" /> Directions
                </RippleButton>
                <RippleButton
                  as="a"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </RippleButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-full min-h-[320px] bg-white">
              <iframe
                title="White Oak Dental location map"
                src={mapSrc}
                className="w-full h-full min-h-[320px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-br from-teal-600 to-sky-400 text-white">
                <ToothMark className="h-5 w-5" />
              </span>
              <span className="font-display font-semibold text-lg text-white">
                White Oak <span className="text-teal-400">Dental</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium dental care in the heart of New Delhi — combining
              advanced technology with genuinely personal attention.
            </p>
            <div className="flex items-center gap-3 mt-5">
  <a
    href="#"
    aria-label="Social link"
    className="h-9 w-9 rounded-full bg-white/5 hover:bg-teal-500 flex items-center justify-center transition-colors duration-300 text-sm"
  >
    X
  </a>
</div>
          </div>

          <div>
            <p className="font-display font-semibold text-white mb-4">Quick Links</p>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-teal-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white mb-4">Services</p>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="hover:text-teal-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-teal-400 shrink-0" />
                <a href={`tel:${PHONE_TEL}`} className="hover:text-teal-400 transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-teal-400 shrink-0" />
                <span>care@whiteoakdental.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-teal-400 shrink-0" />
                <span className="leading-relaxed">{ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} White Oak Dental. All rights reserved.</p>
          <p>Designed with care for healthier smiles.</p>
        </div>
      </div>
    </footer>
  );
}

/* Sticky mobile call-to-action */
function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 flex gap-3 shadow-2xl">
      <RippleButton
        as="a"
        href={`tel:${PHONE_TEL}`}
        className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-800 text-sm font-semibold py-3 rounded-full"
      >
        <Phone className="h-4 w-4 text-teal-600" /> Call Now
      </RippleButton>
      <RippleButton
        as="a"
        href="#booking"
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-semibold py-3 rounded-full shadow-lg shadow-teal-600/25"
      >
        <Calendar className="h-4 w-4" /> Book Now
      </RippleButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Root App                                                              */
/* ------------------------------------------------------------------ */

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="font-body text-slate-700 antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .font-display { font-family: 'Poppins', sans-serif; }
        html { scroll-behavior: smooth; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(14px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.05); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.08); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 14s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 18s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-float-delayed, .animate-float-slow, .animate-float-slower {
            animation: none !important;
          }
        }
      `}</style>

      <Header />
      <main>
        <Hero />
        <TrustSection />
        <SmileArcDivider />
        <AboutSection />
        <ServicesSection />
        <SmileArcDivider flip />
        <ProcessSection />
        <StatsSection />
        <TestimonialsSection />
        <BookingSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileCTA />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
