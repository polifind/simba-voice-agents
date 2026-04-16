import Link from 'next/link';
import Image from 'next/image';

export function SimbaCallout({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="my-10 rounded-2xl border border-simba-gray-200 bg-simba-gray-50 p-6 flex items-start gap-4">
      <Image src="/simba-mark.png" alt="SIMBA" width={36} height={36} className="h-9 w-9 shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed text-simba-gray-700">
        <strong className="text-simba-black">How SIMBA approaches this. </strong>
        {children ?? (
          <>SIMBA is a voice-first agent platform built to make best practices like the ones above easy to implement — from low-latency voice loops to safe escalation paths and analytics out of the box.</>
        )}{' '}
        <Link href="/contact" className="text-simba-blue hover:underline font-medium">
          Talk to our team
        </Link>
        .
      </div>
    </aside>
  );
}
