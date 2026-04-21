import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-2xl text-center shadow-xl">
        <h1 className="text-3xl font-black text-white mb-4">Registrations Closed</h1>
        <p className="text-zinc-400 mb-8">
          We have reached maximum capacity. All agents have been successfully deployed and missions are active. Thank you for your interest!
        </p>
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-colors">
          <ArrowLeft size={16} /> RETURN TO BASE
        </Link>
      </div>
    </div>
  );
}
