import type { DashboardStats, EventItem, EventQuery } from "@/types/event";
import {
  createEventInFirestore,
  deleteEventFromFirestore,
  getDashboardStatsFromFirestore,
  getEventByIdFromFirestore,
  listEventsFromFirestore,
} from "./firebase";

// Static fallback events used during development or when Firestore is empty/unavailable.
export const STATIC_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "Tech Innovators Summit 2026",
    shortDescription: "A one-day conference featuring industry experts, startup founders, and technology enthusiasts.",
    description:
      "Join hundreds of developers, entrepreneurs, and tech leaders for a full day of inspiring talks, networking sessions, startup showcases, and hands-on workshops covering AI, Web Development, Cloud Computing, and Cybersecurity.",
    category: "Conference",
    date: "2026-09-20",
    time: "09:30",
    location: "Dhaka, Bangladesh",
    organizer: "EventHub",
    ticketPrice: 500,
    capacity: 300,
    coverImage: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-1",
    createdAt: "2026-07-15T10:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-2",
    title: "Web Development Workshop",
    shortDescription: "Learn modern web development with React and Next.js",
    description: "Intensive 2-day workshop covering React hooks, state management, Next.js fundamentals, and deployment strategies. Perfect for intermediate developers looking to level up their skills.",
    category: "Workshop",
    date: "2026-08-05",
    time: "10:00",
    location: "Chittagong, Bangladesh",
    organizer: "Code Academy",
    ticketPrice: 300,
    capacity: 50,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-2",
    createdAt: "2026-07-10T08:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-3",
    title: "AI & Machine Learning Expo",
    shortDescription: "Explore the future of artificial intelligence and machine learning applications",
    description: "A comprehensive expo showcasing cutting-edge AI technologies, featuring keynote speeches from industry leaders, live demos, and networking opportunities with researchers and practitioners.",
    category: "Expo",
    date: "2026-09-15",
    time: "09:00",
    location: "Dhaka, Bangladesh",
    organizer: "AI Community",
    ticketPrice: 700,
    capacity: 500,
    coverImage: "https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-3",
    createdAt: "2026-07-12T14:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-4",
    title: "Startup Pitch Night",
    shortDescription: "Watch innovative startups pitch to investors",
    description: "Join us for an exciting evening where 15 promising startups will pitch their innovative ideas to a panel of seasoned investors. Great networking opportunity for entrepreneurs and investors.",
    category: "Networking",
    date: "2026-08-22",
    time: "18:00",
    location: "Dhaka, Bangladesh",
    organizer: "Startup Hub",
    ticketPrice: 250,
    capacity: 150,
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-4",
    createdAt: "2026-07-08T11:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-5",
    title: "Cloud Computing Masterclass",
    shortDescription: "Master AWS, Azure, and Google Cloud platforms",
    description: "3-day intensive masterclass on cloud computing covering AWS services, Azure solutions, Google Cloud platform, and best practices for cloud architecture and security.",
    category: "Seminar",
    date: "2026-08-30",
    time: "08:30",
    location: "Chittagong, Bangladesh",
    organizer: "Cloud Institute",
    ticketPrice: 450,
    capacity: 100,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-5",
    createdAt: "2026-07-11T09:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-6",
    title: "Mobile App Development Bootcamp",
    shortDescription: "Build iOS and Android apps from scratch",
    description: "12-week bootcamp covering Swift, Kotlin, React Native, and Flutter. Build real-world projects, work with mentors, and launch your app development career.",
    category: "Workshop",
    date: "2026-09-01",
    time: "10:00",
    location: "Dhaka, Bangladesh",
    organizer: "Mobile Academy",
    ticketPrice: 800,
    capacity: 40,
    coverImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-6",
    createdAt: "2026-07-09T13:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-7",
    title: "Cybersecurity Summit 2026",
    shortDescription: "Protect your digital assets in an evolving threat landscape",
    description: "One-day summit featuring security experts discussing the latest threats, defense strategies, and compliance requirements. Includes hands-on labs and real-world case studies.",
    category: "Conference",
    date: "2026-09-25",
    time: "09:00",
    location: "Dhaka, Bangladesh",
    organizer: "InfoSec Pro",
    ticketPrice: 600,
    capacity: 250,
    coverImage: "https://images.unsplash.com/photo-1751448555253-f39c06e29d82?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1748654693687-199873cb5c04?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-7",
    createdAt: "2026-07-13T10:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-8",
    title: "DevOps & Infrastructure Meetup",
    shortDescription: "Connect with DevOps professionals and learn industry best practices",
    description: "Monthly meetup for DevOps engineers, SREs, and infrastructure specialists. Share experiences, learn about new tools, and network with peers.",
    category: "Meetup",
    date: "2026-08-15",
    time: "18:30",
    location: "Chittagong, Bangladesh",
    organizer: "DevOps Community",
    ticketPrice: 100,
    capacity: 80,
    coverImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-8",
    createdAt: "2026-07-07T15:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-9",
    title: "Data Science & Analytics Conference",
    shortDescription: "Dive deep into data-driven decision making",
    description: "2-day conference covering data engineering, data science, analytics, and business intelligence. Learn from industry leaders and explore real-world applications.",
    category: "Conference",
    date: "2026-09-10",
    time: "09:30",
    location: "Dhaka, Bangladesh",
    organizer: "Data Insights",
    ticketPrice: 550,
    capacity: 350,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561489401-fc2876ced162?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-9",
    createdAt: "2026-07-14T12:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-10",
    title: "UX/UI Design Workshop",
    shortDescription: "Master modern design principles and tools",
    description: "Comprehensive workshop on user experience and interface design. Learn Figma, design systems, user research, and prototyping from experienced designers.",
    category: "Workshop",
    date: "2026-08-12",
    time: "10:00",
    location: "Dhaka, Bangladesh",
    organizer: "Design Hub",
    ticketPrice: 350,
    capacity: 60,
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-36c11767b26a?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-10",
    createdAt: "2026-07-06T14:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-11",
    title: "Blockchain & Web3 Fundamentals",
    shortDescription: "Understand blockchain technology and Web3 applications",
    description: "Beginner-friendly seminar introducing blockchain fundamentals, cryptocurrencies, NFTs, and Web3 development. Perfect for those new to the space.",
    category: "Seminar",
    date: "2026-08-20",
    time: "14:00",
    location: "Dhaka, Bangladesh",
    organizer: "Web3 Academy",
    ticketPrice: 200,
    capacity: 120,
    coverImage: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1676907820329-d74d048a6969?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1666979663115-4764b4affa0e?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-11",
    createdAt: "2026-07-05T11:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-12",
    title: "Product Management Essentials",
    shortDescription: "Learn product management from industry experts",
    description: "Interactive workshop covering product strategy, roadmapping, user research, and metrics. Perfect for aspiring and current product managers.",
    category: "Workshop",
    date: "2026-09-05",
    time: "09:00",
    location: "Dhaka, Bangladesh",
    organizer: "PM Academy",
    ticketPrice: 400,
    capacity: 75,
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-12",
    createdAt: "2026-07-04T10:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-13",
    title: "JavaScript Advanced Concepts",
    shortDescription: "Master asynchronous programming and advanced patterns",
    description: "Deep dive into JavaScript's most complex concepts including promises, async/await, closures, prototypes, and design patterns for building scalable applications.",
    category: "Seminar",
    date: "2026-08-28",
    time: "16:00",
    location: "Chittagong, Bangladesh",
    organizer: "Code Masters",
    ticketPrice: 280,
    capacity: 65,
    coverImage: "https://images.unsplash.com/photo-1669023414180-4dcf35d943e1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-13",
    createdAt: "2026-07-03T09:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-14",
    title: "Tech Career Panel Discussion",
    shortDescription: "Get career advice from successful tech professionals",
    description: "Panel discussion featuring CTOs, software engineers, and product leaders sharing their career journeys, tips for landing your dream job, and industry insights.",
    category: "Networking",
    date: "2026-08-18",
    time: "17:00",
    location: "Dhaka, Bangladesh",
    organizer: "Tech Careers",
    ticketPrice: 150,
    capacity: 200,
    coverImage: "https://images.unsplash.com/photo-1523582407565-efee5cf4a353?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-14",
    createdAt: "2026-07-02T13:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-15",
    title: "Open Source Contribution Workshop",
    shortDescription: "Start contributing to open source projects",
    description: "Hands-on workshop guiding developers through finding projects, understanding codebases, making contributions, and navigating the open source community.",
    category: "Workshop",
    date: "2026-09-08",
    time: "10:00",
    location: "Dhaka, Bangladesh",
    organizer: "Open Source Initiative",
    ticketPrice: 200,
    capacity: 90,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-15",
    createdAt: "2026-07-01T08:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-16",
    title: "Testing & QA Best Practices",
    shortDescription: "Ensure quality with modern testing strategies",
    description: "Seminar covering unit testing, integration testing, end-to-end testing, test automation, and quality assurance strategies for building reliable software.",
    category: "Seminar",
    date: "2026-09-12",
    time: "10:30",
    location: "Chittagong, Bangladesh",
    organizer: "QA Academy",
    ticketPrice: 320,
    capacity: 85,
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-16",
    createdAt: "2026-06-30T12:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-17",
    title: "Leadership in Tech Bootcamp",
    shortDescription: "Develop leadership skills for tech professionals",
    description: "6-week bootcamp focusing on communication, team building, decision making, and strategic thinking for developers and engineers moving into leadership roles.",
    category: "Workshop",
    date: "2026-08-25",
    time: "09:00",
    location: "Dhaka, Bangladesh",
    organizer: "Leadership Institute",
    ticketPrice: 500,
    capacity: 45,
    coverImage: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071901873-411886a10004?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-17",
    createdAt: "2026-06-29T15:00:00.000Z",
    featured: true,
  },
  {
    id: "evt-18",
    title: "Performance Optimization Webinar",
    shortDescription: "Build faster, more efficient applications",
    description: "Online webinar covering web performance optimization, database tuning, caching strategies, and profiling tools to maximize your application's speed.",
    category: "Webinar",
    date: "2026-08-08",
    time: "15:00",
    location: "Online",
    organizer: "Performance Experts",
    ticketPrice: 150,
    capacity: 500,
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e5a3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551632786-de41ecbe17eb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-18",
    createdAt: "2026-06-28T11:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-19",
    title: "API Design & REST Best Practices",
    shortDescription: "Design scalable and maintainable APIs",
    description: "Comprehensive workshop on API design principles, REST architecture, GraphQL, API security, versioning, and documentation best practices.",
    category: "Workshop",
    date: "2026-09-18",
    time: "14:00",
    location: "Dhaka, Bangladesh",
    organizer: "API Masters",
    ticketPrice: 380,
    capacity: 95,
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-19",
    createdAt: "2026-06-27T09:00:00.000Z",
    featured: false,
  },
  {
    id: "evt-20",
    title: "Docker & Kubernetes for Developers",
    shortDescription: "Master containerization and orchestration",
    description: "Practical workshop on Docker container basics, building images, Docker Compose, Kubernetes fundamentals, and deploying applications to production.",
    category: "Workshop",
    date: "2026-09-22",
    time: "08:30",
    location: "Dhaka, Bangladesh",
    organizer: "Container Academy",
    ticketPrice: 420,
    capacity: 70,
    coverImage: "https://images.unsplash.com/photo-1646627927863-19874c27316b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    ],
    createdBy: "host-20",
    createdAt: "2026-06-26T10:00:00.000Z",
    featured: true,
  },
];

function normalizeEventText(value: string): string {
  return value.trim().toLowerCase();
}

function matchesEventQuery(event: EventItem, query: EventQuery): boolean {
  const search = normalizeEventText(query.search ?? "");
  const category = normalizeEventText(query.category ?? "");
  const location = normalizeEventText(query.location ?? "");

  const searchableText = [
    event.title,
    event.shortDescription,
    event.description,
    event.organizer,
    event.category,
    event.location,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const matchesSearch = !search || searchableText.includes(search);
  const matchesCategory = !category || normalizeEventText(event.category).includes(category);
  const matchesLocation = !location || normalizeEventText(event.location).includes(location);

  return matchesSearch && matchesCategory && matchesLocation;
}

function sortAndPaginateEvents(events: EventItem[], query: EventQuery) {
  const sortBy = query.sortBy ?? "date";
  const sortOrder = query.sortOrder ?? "asc";
  const page = query.page ?? 1;
  const perPage = query.perPage ?? 8;

  const sorted = [...events].sort((left, right) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? left.ticketPrice - right.ticketPrice : right.ticketPrice - left.ticketPrice;
    }

    const leftDate = new Date(left.date).getTime();
    const rightDate = new Date(right.date).getTime();
    return sortOrder === "asc" ? leftDate - rightDate : rightDate - leftDate;
  });

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const paginated = sorted.slice(start, start + perPage);

  return { events: paginated, total, totalPages, page: safePage };
}

export async function listEvents(query: EventQuery = {}) {
  const result = await listEventsFromFirestore(query);

  if (!result || result.total === 0) {
    const filtered = STATIC_EVENTS.filter((event) => matchesEventQuery(event, query));
    return sortAndPaginateEvents(filtered, query);
  }

  return result;
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  const event = await getEventByIdFromFirestore(id);
  if (event) return event;
  // fallback to static events
  const found = STATIC_EVENTS.find((e) => e.id === id);
  return found ?? undefined;
}

export async function createEvent(input: Omit<EventItem, "id" | "createdAt" | "createdBy"> & { createdBy?: string; createdAt?: string; id?: string }): Promise<EventItem> {
  return createEventInFirestore(input);
}

export async function deleteEvent(id: string): Promise<boolean> {
  return deleteEventFromFirestore(id);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const stats = await getDashboardStatsFromFirestore();
    if (stats && stats.totalEvents > 0) return stats;
  } catch (e) {
    // ignore and fallback
  }

  const upcomingEvents = STATIC_EVENTS.filter((event) => new Date(event.date).getTime() >= Date.now()).length;
  const categories = Array.from(new Set(STATIC_EVENTS.map((event) => event.category)));
  const categoryBreakdown = categories.map((category) => ({ name: category, value: STATIC_EVENTS.filter((event) => event.category === category).length }));
  return {
    totalEvents: STATIC_EVENTS.length,
    upcomingEvents,
    categories,
    capacity: STATIC_EVENTS.reduce((sum, event) => sum + event.capacity, 0),
    averagePrice: STATIC_EVENTS.length ? Math.round(STATIC_EVENTS.reduce((sum, event) => sum + event.ticketPrice, 0) / STATIC_EVENTS.length) : 0,
    categoryBreakdown,
  } satisfies DashboardStats;
}

export async function getFeaturedEvents(): Promise<EventItem[]> {
  const result = await listEvents({ page: 1, perPage: 20 });
  return result.events.filter((event) => event.featured);
}

export async function getEventsByCreator(createdBy: string): Promise<EventItem[]> {
  const result = await listEvents({ page: 1, perPage: 50 });
  return result.events.filter((event) => event.createdBy === createdBy);
}
