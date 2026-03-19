const links = [
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Anuncie",       href: "/anunciar" },
  { label: "Suporte",       href: "#" },
  { label: "Termos de Uso", href: "#" },
  { label: "Privacidade",   href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="w-full px-4 py-8 sm:px-8"
      style={{ backgroundColor: "#250C30", borderTop: "1px solid #4A1A5C" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* logo */}
        <span className="text-base font-bold" style={{ color: "#C0306A" }}>
          AcompanhantesNaWeb
        </span>

        {/* links */}
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: "#c9a8e0" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* copyright */}
        <p className="text-xs" style={{ color: "#6b4f7a" }}>
          © 2026 AcompanhantesNaWeb. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
