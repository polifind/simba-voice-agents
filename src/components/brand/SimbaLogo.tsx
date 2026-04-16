import Link from 'next/link';
import Image from 'next/image';

export function SimbaLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/simba-mark.png"
        alt="SIMBA"
        width={28}
        height={28}
        className="h-7 w-7"
        priority
      />
      <span className="text-xl tracking-tight">
        <span className="font-black text-simba-black">SIMBA</span>{' '}
        <span className="font-medium text-simba-gray-500">Voice Agents</span>
      </span>
    </Link>
  );
}

export function SimbaLogoWhite({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/simba-mark.png"
        alt="SIMBA"
        width={28}
        height={28}
        className="h-7 w-7 invert"
        priority
      />
      <span className="text-xl tracking-tight">
        <span className="font-black text-white">SIMBA</span>{' '}
        <span className="font-medium text-white/60">Voice Agents</span>
      </span>
    </Link>
  );
}
