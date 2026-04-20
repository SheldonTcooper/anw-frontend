import { MessageCircle, Send } from "lucide-react";

const links = [
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Anuncie",       href: "/anunciar" },
  { label: "Suporte",       href: "https://wa.me/5585991879866" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
  { label: "Privacidade",   href: "/privacidade" },
];

const redes = [
  {
    label: "WhatsApp",
    href: "https://wa.me/5585991879866",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.116 1.523 5.847L.057 23.571a.75.75 0 00.912.912l5.724-1.466A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 01-4.951-1.355l-.355-.212-3.686.944.962-3.604-.233-.372A9.694 9.694 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/acompnaweb",
    icon: <Send size={18} />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@acompanhantes_na_web",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full px-4 py-8 sm:px-8"
      style={{ backgroundColor: "#250C30", borderTop: "1px solid #4A1A5C" }}
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* logo */}
          <span className="text-base font-bold" style={{ color: "#C0306A" }}>
            AcompanhantesNaWeb
          </span>

          {/* links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {links.map(({ label, href }) => (
              
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "#c9a8e0" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* redes sociais */}
          <div className="flex items-center gap-3">
            {redes.map(({ label, href, icon }) => (
              
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: "#3a1550", color: "#c9a8e0" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* copyright */}
        <p className="text-center text-xs" style={{ color: "#6b4f7a" }}>
          © 2026 AcompanhantesNaWeb. Todos os direitos reservados. | contato@acompanhantesnaweb.com.br
        </p>
      </div>
    </footer>
  );
}