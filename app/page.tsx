// app/page.tsx
import { redirect } from 'next/navigation';

export default function Accueil() {
  // تحويل تلقائي نحو صفحة "bijoux" أو أي صفحة رئيسية تريدها
  redirect('/bijoux'); 
  return null;
}
