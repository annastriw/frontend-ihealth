# 1. Install & Setup
```bash
git clone https://github.com/username/frontend-ihealth.git
cd frontend-ihealth
npm install
```
# 2. Konfigurasi Environment (edit file .env.local)
Pastikan isi file .env.local seperti berikut:
```bash
# Local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_CDN_HOSTNAME=http://127.0.0.1:8000
NEXT_PUBLIC_APP_URL=http://127.0.0.1:8000

# Authentication
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=La5JApG9/MSS8sIfwPWgbpxClPNWVk9DsDxpvXO9POo=
AUTH_TRUST_HOST=http://localhost:3000
```
Jika perlu generate secret key untuk AUTH_SECRET, jalankan:
```bash
openssl rand -base64 32
```
# 3. Jalankan Development Server
```bash
npm run dev
```
