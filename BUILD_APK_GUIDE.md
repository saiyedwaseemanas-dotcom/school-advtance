# Building Android APK with GitHub Actions for EduTrack

This repository is fully configured with **Capacitor** and a **GitHub Actions CI/CD workflow** (`.github/workflows/build-apk.yml`) to automatically compile and build an installable Android APK (`.apk`).

---

## 🚀 How to Build Your APK on GitHub (Step-by-Step)

### Step 1: Push or Export this Project to GitHub
1. In Google AI Studio Build, click on the **Settings** or **Project Menu** (top-right).
2. Select **Export to GitHub** (or connect your GitHub repository).
3. Push the codebase including the `.github/` folder and `capacitor.config.json`.

---

### Step 2: Trigger the Build Workflow
You have two ways to generate the APK:

#### Option A: Automatic Build on Push
- Every time you push a commit to `main` or `master`, GitHub Actions automatically begins building the APK.

#### Option B: Manual Click-to-Build (Recommended)
1. Go to your repository on **GitHub.com**.
2. Click on the **Actions** tab at the top.
3. In the left sidebar, click **"Build Android APK"**.
4. Click the **"Run workflow"** button on the right, select the `main` branch, and click **"Run workflow"**.

---

### Step 3: Download Your APK File
1. While the workflow runs, you will see a checkmark next to the run when it completes (takes ~2-3 minutes).
2. Click on the completed workflow run (e.g. *"Build Android APK"*).
3. Scroll down to the **Artifacts** section at the bottom of the page.
4. Click on **`EduTrack-Debug-APK`** to download the ZIP file containing `app-debug.apk`.

---

### Step 4: Install on Your Android Device
1. Unzip the downloaded file to get `app-debug.apk`.
2. Transfer `app-debug.apk` to your Android phone (via WhatsApp, Google Drive, USB, or direct download).
3. Tap on the APK file to install.
4. If prompted, toggle **"Allow installation from this source"** (standard for debug APKs).
5. Open **EduTrack** on your phone!

---

## 🛠 Project Configuration Details

- **Package Name / App ID:** `com.edutrack.app`
- **Application Name:** `EduTrack`
- **Build Output:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Configuration File:** `capacitor.config.json`
- **Workflow File:** `.github/workflows/build-apk.yml`

### Local Build (Optional)
If you have Android Studio installed locally:
```bash
npm run build
npx cap add android
npx cap open android
```
Then click **Run** or **Build > Build Bundle(s) / APK(s) > Build APK(s)** in Android Studio.
