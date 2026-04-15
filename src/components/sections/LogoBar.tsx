const customerLogos = [
  'Google',
  'Dell',
  'UNESCO',
  'Vimeo',
  'Fujifilm',
  'Qualtrics',
  'NHS',
  'Harvard University',
];

export function LogoBar() {
  return (
    <section className="py-12 border-y border-simba-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-simba-gray-400 mb-8 font-medium uppercase tracking-wider">
          Trusted by leading organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {customerLogos.map((name) => (
            <span
              key={name}
              className="text-lg font-bold text-simba-gray-300 hover:text-simba-gray-500 transition-colors select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
