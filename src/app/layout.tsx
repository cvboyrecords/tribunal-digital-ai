import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal Soberano de Justiça Digital | Triagem e Verificação IA",
  description: "Sistema Internacional de Submissão de Petições e Validação Jurisdicional Instantânea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
