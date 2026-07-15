const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');

function parseEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return {};
  const raw = fs.readFileSync(envPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const res = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    res[key] = val;
  }
  return res;
}

function loadConfig() {
  const repoRoot = path.resolve(__dirname, '..');
  const envPath = path.join(repoRoot, '.env.local');
  const env = parseEnvFile(envPath);
  const cfg = {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY || env.FIREBASE_API_KEY || '',
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || env.FIREBASE_AUTH_DOMAIN || '',
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID || '',
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID || env.FIREBASE_APP_ID || '',
  };
  return cfg;
}

async function confirm(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  const cfg = loadConfig();
  if (!cfg.projectId) {
    console.error('Firebase config not found in .env.local. Aborting.');
    process.exit(1);
  }

  console.log('Firebase projectId:', cfg.projectId);
  console.log("This script will DELETE ALL documents in the top-level 'events' collection in Firestore for the configured project.");
  console.log("Type DELETE (in ALL CAPS) to proceed:");

  const answer = await confirm('> ');
  if (answer !== 'DELETE') {
    console.log('Aborted by user. No changes made.');
    process.exit(0);
  }

  try {
    const app = initializeApp({
      apiKey: cfg.apiKey,
      authDomain: cfg.authDomain,
      projectId: cfg.projectId,
      storageBucket: cfg.storageBucket,
      messagingSenderId: cfg.messagingSenderId,
      appId: cfg.appId,
    });

    const db = getFirestore(app);
    const eventsRef = collection(db, 'events');
    const snapshot = await getDocs(eventsRef);
    if (!snapshot || snapshot.empty) {
      console.log('No documents found in events collection. Nothing to delete.');
      process.exit(0);
    }

    console.log(`Found ${snapshot.size} documents. Deleting...`);
    let deleted = 0;
    for (const docSnap of snapshot.docs) {
      const docRef = doc(db, 'events', docSnap.id);
      await deleteDoc(docRef);
      console.log('Deleted', docSnap.id);
      deleted++;
    }

    console.log(`Deleted ${deleted} document(s).`);
    process.exit(0);
  } catch (err) {
    console.error('Error while deleting documents:', err);
    process.exit(1);
  }
}

main();
