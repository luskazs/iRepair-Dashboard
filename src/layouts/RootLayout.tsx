import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <Header />
      <main className="max-w-6xl mx-auto p-4 mt-6">
        <Outlet />
      </main>
    </div>
  );
};