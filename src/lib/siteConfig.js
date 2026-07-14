// Central, editable configuration for Mirrors Only.
// Admins can adjust all product specs, pricing, copy, and policy text here.

export const IMAGES = {
  hero: "https://media.base44.com/images/public/6a55868be391a8aabe957637/95bcea3b2_generated_51052c1a.png",
  studio: "https://media.base44.com/images/public/6a55868be391a8aabe957637/0d85d4946_generated_91ad5467.png",
  edge: "https://media.base44.com/images/public/6a55868be391a8aabe957637/0230812c4_generated_6cb229fd.png",
  commercial: "https://media.base44.com/images/public/6a55868be391a8aabe957637/5286241a5_generated_1d72ce2e.png"
};

export const CONTACT = {
  phone: "(602) 555-0142",
  phoneHref: "tel:+16025550142",
  textHref: "sms:+16025550142",
  email: "hello@mirrors-only.com",
  emailHref: "mailto:hello@mirrors-only.com",
  serviceRegion: "Phoenix Metropolitan Area"
};

export const TRUST = [
  "Mirrors supplied directly by Mirrors Only",
  "Mirrors Only employee installers",
  "Licensed and bonded",
  "One-year warranty",
  "Residential and commercial service"
];

export const PRODUCTS = {
  "4x5": {
    id: "4x5",
    name: "4' × 5' Frameless Mirror",
    widthFt: 4,
    heightFt: 5,
    widthIn: 48,
    heightIn: 60,
    price: 289,
    thickness: '3/16"',
    weight: "Approx. 38 lbs",
    edge: "Polished flat edge",
    safetyBacking: "Optional CAT I safety backing",
    mounting: "Compatible with standard J-mold, L-bracket, and adhesive mount methods",
    sku: "MO-45-FL",
    orientationNotice: "The mirror may be positioned vertically or horizontally when installation conditions allow.",
    inventory: "In stock",
    pickupAvailability: "Usually available within 2–3 business days",
    deliveryAvailability: "Usually scheduled within 3–5 business days",
    warranty: "One-year limited warranty"
  },
  "4x6": {
    id: "4x6",
    name: "4' × 6' Frameless Mirror",
    widthFt: 4,
    heightFt: 6,
    widthIn: 48,
    heightIn: 72,
    price: 379,
    thickness: '1/4"',
    weight: "Approx. 55 lbs",
    edge: "Polished flat edge",
    safetyBacking: "Optional CAT I safety backing",
    mounting: "Compatible with standard J-mold, L-bracket, and adhesive mount methods",
    sku: "MO-46-FL",
    orientationNotice: "The mirror may be positioned vertically or horizontally when installation conditions allow.",
    inventory: "In stock",
    pickupAvailability: "Usually available within 2–3 business days",
    deliveryAvailability: "Usually scheduled within 3–5 business days",
    warranty: "One-year limited warranty"
  }
};

export const SERVICE_PRICING = {
  pickup: { label: "Customer Pickup", base: 0, blurb: "Pick up from our Phoenix location during your scheduled appointment." },
  delivery: { label: "Local Delivery", base: 79, blurb: "Curbside / garage delivery to eligible Phoenix metro addresses." },
  installation: { label: "Delivery + Installation", base: 199, blurb: "We deliver and professionally install your mirror." }
};

export const FULFILLMENT = {
  pickup: {
    title: "Customer Pickup",
    description: "Purchase your mirror online and pick it up from the designated Mirrors Only pickup location during your scheduled appointment.",
    fields: [
      { label: "Pickup Address", value: "Phoenix, AZ — exact address shared after appointment is scheduled" },
      { label: "Available Days", value: "Tuesday–Saturday" },
      { label: "Available Times", value: "9:00 AM – 4:00 PM" },
      { label: "Vehicle Requirements", value: "Pickup truck, van, or SUV with seats folded flat. Mirror must lie flat — never on edge." },
      { label: "Required Pickup Equipment", value: "Furniture blankets or moving pads and ratchet straps / tie-downs" },
      { label: "People Recommended", value: "Two able-bodied adults" },
      { label: "Loading Assistance", value: "Staff will assist with loading; customers accept the mirror before departure" },
      { label: "Pickup Waiver", value: "Customer signs a pickup and transport responsibility waiver" },
      { label: "Storage Period", value: "14 days from scheduled appointment" },
      { label: "Rescheduling Policy", value: "One free reschedule; $25 fee thereafter" }
    ],
    warning: "Large mirrors require appropriate transportation, secure padding, safe tie-down methods, and careful handling. Customers are responsible for transportation after accepting the mirror."
  },
  delivery: {
    title: "Local Delivery",
    description: "Mirrors Only delivers your mirror to an eligible Phoenix metropolitan area address.",
    points: [
      "Service level: curbside / garage / doorway delivery (room-of-choice not guaranteed)",
      "Ground-floor delivery included; stairs may incur an additional fee",
      "Elevator buildings served when the elevator accommodates the mirror dimensions",
      "An adult must be present to accept delivery",
      "Delivery team carries the mirror to the agreed drop point",
      "If access is unsafe, delivery may be rescheduled (rescheduling fee may apply)",
      "Failed-delivery fees apply when access cannot be completed as scheduled",
      "Delivery is limited to the eligible Phoenix metro radius"
    ],
    note: "We do not use the term \"white-glove delivery.\" Delivery is curbside/garage/doorway unless explicitly upgraded."
  },
  installation: {
    title: "Delivery & Installation",
    description: "Mirrors Only delivers the mirror and installs it at the customer's eligible Phoenix metropolitan area property.",
    points: [
      "The customer chooses the mirror size",
      "Mirrors Only does not perform an on-site measurement before purchase",
      "Customers must confirm that the selected mirror fits the intended wall",
      "Installation is subject to safe access and suitable wall conditions",
      "Existing mirrors must be removed before the appointment",
      "Mirrors Only does not remove or dispose of existing mirrors",
      "Installation pricing may depend on access, wall material, stairs, elevators, mounting height, and obstructions",
      "Additional charges must be disclosed before work beyond the original order is performed"
    ]
  }
};

export const WARRANTY = {
  heading: "One-Year Warranty",
  summary: "Mirrors Only provides a one-year limited warranty. Coverage, exclusions, and claim procedures are governed by the written warranty provided with the order.",
  product: "Mirror product coverage — finalized before launch.",
  workmanship: "Installation workmanship coverage — finalized before launch.",
  exclusions: [
    "Damage occurring before customer acceptance",
    "Customer transportation damage",
    "Accidental impact",
    "Improper handling",
    "Improper cleaning products",
    "Moisture exposure",
    "Edge damage",
    "Wall movement",
    "Structural failure",
    "Customer-installed products",
    "Third-party modifications"
  ],
  productText: "[Editable] Mirrors Only warrants that the mirror product will be free from manufacturing defects in materials and workmanship for a period of one (1) year from the date of delivery or installation. Final coverage terms to be entered before launch.",
  workmanshipText: "[Editable] Mirrors Only warrants the installation workmanship for a period of one (1) year from the date of installation. Final coverage terms to be entered before launch."
};

export const POLICIES = {
  terms: "Editable Terms and Conditions — to be reviewed and finalized before launch.",
  privacy: "Editable Privacy Policy — to be reviewed and finalized before launch.",
  pickup: "Editable Pickup Policy — to be reviewed and finalized before launch.",
  delivery: "Editable Delivery Policy — to be reviewed and finalized before launch.",
  installation: "Editable Installation Policy — to be reviewed and finalized before launch.",
  cancellation: "Editable Cancellation Policy — to be reviewed and finalized before launch.",
  rescheduling: "Editable Rescheduling Policy — to be reviewed and finalized before launch.",
  returns: "Editable Return and Refund Policy — to be reviewed and finalized before launch.",
  warranty: "Editable Warranty Policy — to be reviewed and finalized before launch.",
  damage: "Editable Damage Claim Policy — to be reviewed and finalized before launch.",
  measurement: "Editable Customer Measurement Responsibility — to be reviewed and finalized before launch.",
  accessibility: "Editable Accessibility Statement — to be reviewed and finalized before launch."
};

export const SERVICE_CITIES = [
  "Phoenix", "Scottsdale", "Tempe", "Mesa", "Gilbert", "Chandler", "Queen Creek",
  "Glendale", "Peoria", "Goodyear", "Avondale", "Surprise", "Paradise Valley",
  "Fountain Hills", "Ahwatukee", "Litchfield Park", "Buckeye", "San Tan Valley"
];

export const USE_CASES = [
  { label: "Home Gyms", icon: "Dumbbell" },
  { label: "Garage Gyms", icon: "Warehouse" },
  { label: "Fitness Studios", icon: "Activity" },
  { label: "Dance Studios", icon: "Music" },
  { label: "Yoga & Pilates", icon: "Flower" },
  { label: "Martial Arts", icon: "Swords" },
  { label: "Bedrooms", icon: "BedDouble" },
  { label: "Dressing Areas", icon: "Shirt" },
  { label: "Salons", icon: "Scissors" },
  { label: "Barbershops", icon: "Scissors" },
  { label: "Apartment Gyms", icon: "Building2" },
  { label: "Commercial Fitness", icon: "Building" }
];

export const GALLERY_FILTERS = [
  "Home Gym", "Garage Gym", "Commercial Gym", "Dance Studio", "Yoga Studio",
  "Salon", "Residential", "Commercial", "4' × 5'", "4' × 6'", "Vertical", "Horizontal"
];

export const ORDER_STATUSES = [
  "Order Received", "Payment Pending", "Paid", "Customer Information Needed",
  "Photos Under Review", "Pickup Scheduled", "Delivery Scheduled",
  "Installation Scheduled", "Ready for Pickup", "Out for Delivery",
  "Installer En Route", "Delivered", "Installation Complete",
  "Customer Acceptance Pending", "Completed", "Warranty Claim",
  "Rescheduled", "Canceled", "Refunded"
];