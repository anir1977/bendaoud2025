// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/bijoux'); // غيّر المسار إذا كانت صفحتك الأساسية مختلفة
  return null;
}
