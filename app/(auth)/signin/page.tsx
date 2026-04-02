import { redirect } from 'next/navigation';

// /signin is an alias for /login — redirect immediately
export default function SigninPage() {
  redirect('/login');
}
