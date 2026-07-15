# Firebase Google & Facebook Authentication Setup Guide

This guide will help you set up Google and Facebook authentication for your EventHub application.

## Prerequisites
- Firebase project created (https://console.firebase.google.com)
- Google Developer Console access (for Google OAuth)
- Facebook Developer account (for Facebook OAuth)

---

## Step 1: Enable Google Sign-In in Firebase Console

### 1.1 Navigate to Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click on **Authentication** in the left sidebar
4. Click on the **Sign-in method** tab

### 1.2 Enable Google Provider
1. Click on **Google** from the list of providers
2. Toggle the **Enable** switch to ON
3. Select a **Project support email** from the dropdown
4. Click **Save**

### 1.3 Get Your Firebase Config Values
1. Go to **Project Settings** (gear icon at the top)
2. Click on the **General** tab
3. Scroll down to find your Firebase SDK snippet
4. Copy the following values and add to your `.env.local` file:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   ```

---

## Step 2: Enable Facebook Sign-In in Firebase Console

### 2.1 Enable Facebook Provider in Firebase
1. Go to **Authentication > Sign-in method** tab
2. Click on **Facebook**
3. Toggle the **Enable** switch to ON
4. You'll see **App ID** and **App Secret** fields (leave empty for now)
5. Note the **OAuth Redirect URI** shown at the bottom
6. Click **Save** (temporarily, you'll come back to fill in App ID and Secret)

### 2.2 Create a Facebook App (if you don't have one)
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Click **My Apps** → **Create App**
3. Choose **Consumer** as the app type
4. Fill in the app details:
   - **App Name**: EventHub
   - **App Contact Email**: your-email@gmail.com
   - **App Purpose**: Choose an appropriate category
5. Click **Create App**

### 2.3 Set Up Facebook Login
1. In your Facebook App dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web** as the platform
4. In the **App Roles** section:
   - Go to **Settings > Basic**
   - Copy your **App ID** and **App Secret**

### 2.4 Configure Facebook OAuth Redirect
1. In your Facebook App, go to **Settings > Basic**
2. Add your app domain to **App Domains**:
   - For development: `localhost:3000`
   - For production: `your-domain.com`
3. Go to **Products > Facebook Login > Settings**
4. Add the OAuth Redirect URI (from Firebase step 2.1) to **Valid OAuth Redirect URIs**
   - Typically: `https://your-project.firebaseapp.com/__/auth/handler`

### 2.5 Add Facebook App ID and Secret to Firebase
1. Go back to [Firebase Console > Authentication > Sign-in method]
2. Click on **Facebook**
3. Paste your **App ID** and **App Secret** from Facebook Developers
4. Click **Save**

---

## Step 3: Environment Variables

Create a `.env.local` file in your project root (copy from `.env.local.example`):

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

⚠️ **Important**: These are public keys (NEXT_PUBLIC_*), so it's safe to expose them. Never add secret keys here.

---

## Step 4: Test the Implementation

### 4.1 Start Your App
```bash
npm run dev
```

### 4.2 Navigate to Login Page
- Go to `http://localhost:3000/login`
- You should see three sign-in options:
  1. Sign in with Google
  2. Sign in with Facebook
  3. Email/Password login

### 4.3 Test Google Sign-In
1. Click **Sign in with Google**
2. A popup will open with Google's login page
3. Sign in with your Google account
4. You should be redirected to the dashboard

### 4.4 Test Facebook Sign-In
1. Click **Sign in with Facebook**
2. A popup will open with Facebook's login page
3. Sign in with your Facebook account
4. You should be redirected to the dashboard

---

## Troubleshooting

### Issue: "Popup was blocked by the browser"
**Solution**: Make sure your browser allows popups for `localhost:3000` or your domain.

### Issue: "auth/popup-closed-by-user"
**Solution**: This happens when the user closes the popup. It's handled gracefully with an error message.

### Issue: "This email is already registered with a different sign-in method"
**Solution**: The email already exists with a different provider. User needs to use the original sign-in method or contact support.

### Issue: Google/Facebook buttons not responding
**Solution**: 
1. Check that your environment variables are set correctly
2. Check browser console for error messages
3. Make sure Firebase is initialized properly
4. Clear browser cache and try again

### Issue: "Your app domain is not authorized"
**Solution**: Add your domain to the Firebase Console:
1. Go to **Settings > Authorized domains**
2. Add `localhost:3000` for development
3. Add your production domain

---

## Production Deployment

### Before deploying to production:

1. **Update Your Domain**
   - Firebase Console > Settings > Authorized domains > Add your production domain
   - Facebook App > Settings > App Domains > Add your production domain
   - Google Cloud Console > OAuth consent screen > Authorized domains > Add your production domain

2. **Update Environment Variables**
   - Keep the same Firebase config (it's public)
   - Update redirects if they differ from development

3. **Test Social Logins**
   - Test Google sign-in on production domain
   - Test Facebook sign-in on production domain

4. **Enable Firestore**
   - Go to Firebase > Firestore Database > Create Database
   - Start in test mode for development, set proper security rules for production

---

## Security Best Practices

1. ✅ **Never commit `.env.local`** - Use `.env.local.example` as template
2. ✅ **Use HTTPS only** - Required for social logins
3. ✅ **Set up Firestore Security Rules** - Protect user data
4. ✅ **Keep dependencies updated** - Run `npm update firebase`
5. ✅ **Monitor authentication logs** - Check Firebase Console > Logs

---

## Files Modified

- `src/lib/firebase.ts` - Added Google and Facebook auth functions
- `src/contexts/AuthContext.tsx` - Added social login methods
- `src/app/login/page.tsx` - Added social login UI with loading states and error handling
- `.env.local.example` - Firebase configuration template

---

## Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Docs](https://developers.facebook.com/docs/facebook-login)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/start)

---

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Check Firebase Console > Logs for authentication events
4. Verify all environment variables are set correctly
