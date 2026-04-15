import Link from 'next/link';

export function SimbaLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-1 ${className}`}>
      <span className="text-xl font-black tracking-tight text-simba-black">
        SIMBA
      </span>
      <span className="text-xl font-medium tracking-tight text-simba-gray-500">
        Voice Agents
      </span>
    </Link>
  );
}

export function SimbaLogoWhite({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-1 ${className}`}>
      <span className="text-xl font-black tracking-tight text-white">
        SIMBA
      </span>
      <span className="text-xl font-medium tracking-tight text-white/60">
        Voice Agents
      </span>
    </Link>
  );
}
