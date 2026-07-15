import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type Auth,
  type AuthError,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import type { AuthUser, DashboardStats, EventItem, EventQuery } from "@/types/event";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let firestoreInstance: Firestore | null = null;

export function getFirebaseApp() {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuthInstance() {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return null;
  }

  const firebaseApp = getFirebaseApp();

  if (!authInstance) {
    authInstance = getAuth(firebaseApp);
  }

  return authInstance;
}

export function getFirebaseFirestoreInstance() {
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    return null;
  }

  const firebaseApp = getFirebaseApp();

  if (!firestoreInstance) {
    firestoreInstance = getFirestore(firebaseApp);
  }

  return firestoreInstance;
}

export async function signInWithFirebase(email: string, password: string) {
  const auth = getFirebaseAuthInstance();
  if (!auth) {
    return { success: false, error: "Firebase authentication is not configured yet." };
  }

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: credential.user.uid,
        name: credential.user.displayName ?? email.split("@")[0],
        email: credential.user.email ?? email,
        photoURL: credential.user.photoURL ?? undefined,
      } as AuthUser,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Authentication failed.";
    return { success: false, error: message };
  }
}

export async function createAccountWithFirebase(name: string, email: string, password: string) {
  const auth = getFirebaseAuthInstance();
  if (!auth) {
    return { success: false, error: "Firebase authentication is not configured yet." };
  }

  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: credential.user.uid,
        name,
        email: credential.user.email ?? email,
        photoURL: credential.user.photoURL ?? undefined,
      } as AuthUser,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Account creation failed.";
    return { success: false, error: message };
  }
}

export async function signOutFromFirebase() {
  const auth = getFirebaseAuthInstance();
  if (!auth) {
    return;
  }

  await signOut(auth);
}

/**
 * Sign in with Google using Firebase popup authentication
 * Handles errors gracefully including popup closed by user
 */
export async function signInWithGoogle() {
  const auth = getFirebaseAuthInstance();
  if (!auth) {
    return { success: false, error: "Firebase authentication is not configured yet." };
  }

  try {
    const provider = new GoogleAuthProvider();
    // Request additional scopes for profile information
    provider.addScope("profile");
    provider.addScope("email");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        name: user.displayName ?? "Google User",
        email: user.email ?? "",
        photoURL: user.photoURL ?? undefined,
      } as AuthUser,
    };
  } catch (error) {
    const authError = error as AuthError;
    
    // Handle specific error cases
    if (authError.code === "auth/popup-closed-by-user") {
      return { success: false, error: "Sign-in popup was closed. Please try again." };
    }
    if (authError.code === "auth/popup-blocked") {
      return { success: false, error: "Popup was blocked by the browser. Please allow popups and try again." };
    }
    if (authError.code === "auth/cancelled-popup-request") {
      return { success: false, error: "Sign-in was cancelled." };
    }

    const message = authError.message || "Google sign-in failed. Please try again.";
    return { success: false, error: message };
  }
}

/**
 * Sign in with Facebook using Firebase popup authentication
 * Handles errors gracefully including popup closed by user
 */
export async function signInWithFacebook() {
  const auth = getFirebaseAuthInstance();
  if (!auth) {
    return { success: false, error: "Firebase authentication is not configured yet." };
  }

  try {
    const provider = new FacebookAuthProvider();
    // Request additional permissions
    provider.addScope("public_profile");
    provider.addScope("email");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        name: user.displayName ?? "Facebook User",
        email: user.email ?? "",
        photoURL: user.photoURL ?? undefined,
      } as AuthUser,
    };
  } catch (error) {
    const authError = error as AuthError;

    // Handle specific error cases
    if (authError.code === "auth/popup-closed-by-user") {
      return { success: false, error: "Sign-in popup was closed. Please try again." };
    }
    if (authError.code === "auth/popup-blocked") {
      return { success: false, error: "Popup was blocked by the browser. Please allow popups and try again." };
    }
    if (authError.code === "auth/cancelled-popup-request") {
      return { success: false, error: "Sign-in was cancelled." };
    }
    if (authError.code === "auth/account-exists-with-different-credential") {
      return { success: false, error: "This email is already registered with a different sign-in method." };
    }

    const message = authError.message || "Facebook sign-in failed. Please try again.";
    return { success: false, error: message };
  }
}

export async function listEventsFromFirestore(query: EventQuery = {}) {
  const firestore = getFirebaseFirestoreInstance();
  if (!firestore) {
    return null;
  }

  try {
    const eventsRef = collection(firestore, "events");
    const search = query.search?.trim().toLowerCase() ?? "";
    const category = query.category?.trim();
    const location = query.location?.trim();
    const sortBy = query.sortBy ?? "date";
    const sortOrder = query.sortOrder ?? "asc";
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 8;

    const snapshot = await getDocs(eventsRef);
    console.log('[debug] listEventsFromFirestore - snapshot.size =', snapshot.size);
    const docs = snapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data() as EventItem;
      console.log('[debug] doc id=', docSnapshot.id);
      return { ...data, id: docSnapshot.id };
    });

    let filtered = [...docs];
    if (search) {
      filtered = filtered.filter((event) => {
        const searchableText = [event.title, event.shortDescription, event.description, event.organizer, event.category, event.location]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchableText.includes(search);
      });
    }
    if (category) {
      filtered = filtered.filter((event) => event.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (location) {
      filtered = filtered.filter((event) => event.location.toLowerCase().includes(location.toLowerCase()));
    }

    filtered.sort((left, right) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? left.ticketPrice - right.ticketPrice : right.ticketPrice - left.ticketPrice;
      }

      const leftDate = new Date(left.date).getTime();
      const rightDate = new Date(right.date).getTime();
      return sortOrder === "asc" ? leftDate - rightDate : rightDate - leftDate;
    });

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * perPage;
    const paginatedEvents = filtered.slice(start, start + perPage);

    return { events: paginatedEvents, total, totalPages, page: safePage };
  } catch (error) {
    console.error("Failed to load events from Firestore:", error);
    return null;
  }
}

export async function getEventByIdFromFirestore(id: string) {
  const firestore = getFirebaseFirestoreInstance();
  if (!firestore) {
    return null;
  }

  try {
    const docRef = doc(firestore, "events", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as EventItem;
    return { ...data, id: snapshot.id };
  } catch (error) {
    console.error("Failed to load event from Firestore:", error);
    return null;
  }
}

export async function createEventInFirestore(input: Omit<EventItem, "id" | "createdAt" | "createdBy"> & { createdBy?: string; createdAt?: string; id?: string }) {
  const firestore = getFirebaseFirestoreInstance();
  if (!firestore) {
    throw new Error("Firebase Firestore is not configured yet.");
  }

  const event: EventItem = {
    id: input.id ?? `evt-${Date.now()}`,
    title: input.title,
    shortDescription: input.shortDescription,
    description: input.description,
    category: input.category,
    date: input.date,
    time: input.time,
    location: input.location,
    organizer: input.organizer,
    ticketPrice: input.ticketPrice,
    capacity: input.capacity,
    coverImage: input.coverImage,
    gallery: input.gallery,
    createdBy: input.createdBy ?? "demo-user",
    createdAt: input.createdAt ?? new Date().toISOString(),
    featured: false,
  };

  try {
    const docRef = doc(firestore, "events", event.id);
    await setDoc(docRef, event);
    return event;
  } catch (error) {
    console.error("Failed to write event to Firestore:", error);
    throw error;
  }
}

export async function addContactMessage(input: { name: string; email: string; message: string }) {
  const firestore = getFirebaseFirestoreInstance();
  if (!firestore) {
    return { success: true, message: "Contact message received." };
  }

  try {
    await addDoc(collection(firestore, "contactMessages"), {
      ...input,
      createdAt: new Date().toISOString(),
    });
    return { success: true, message: "Contact message received." };
  } catch (error) {
    console.error("Failed to save contact message:", error);
    throw error;
  }
}

export async function deleteEventFromFirestore(id: string) {
  const firestore = getFirebaseFirestoreInstance();
  if (!firestore) {
    return false;
  }

  try {
    const docRef = doc(firestore, "events", id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return false;
    }

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Failed to delete event from Firestore:", error);
    return false;
  }
}

export async function getDashboardStatsFromFirestore() {
  const firestore = getFirebaseFirestoreInstance();
  if (!firestore) {
    return {
      totalEvents: 0,
      upcomingEvents: 0,
      categories: [],
      capacity: 0,
      averagePrice: 0,
      categoryBreakdown: [],
    } satisfies DashboardStats;
  }

  try {
    const eventsRef = collection(firestore, "events");
    const snapshot = await getDocs(eventsRef);
    const events = snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data() as EventItem;
    return { ...data, id: docSnapshot.id };
  });

  const upcomingEvents = events.filter((event) => new Date(event.date).getTime() >= Date.now()).length;
  const categories = Array.from(new Set(events.map((event) => event.category)));
  const categoryBreakdown = categories.map((category) => ({
    name: category,
    value: events.filter((event) => event.category === category).length,
  }));

    return {
      totalEvents: events.length,
      upcomingEvents,
      categories,
      capacity: events.reduce((sum, event) => sum + event.capacity, 0),
      averagePrice: events.length ? Math.round(events.reduce((sum, event) => sum + event.ticketPrice, 0) / events.length) : 0,
      categoryBreakdown,
    } satisfies DashboardStats;
  } catch (error) {
    console.error("Failed to load dashboard stats from Firestore:", error);
    return {
      totalEvents: 0,
      upcomingEvents: 0,
      categories: [],
      capacity: 0,
      averagePrice: 0,
      categoryBreakdown: [],
    } satisfies DashboardStats;
  }
}
