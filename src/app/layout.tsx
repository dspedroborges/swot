import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BiBrain } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SWOT Análise",
  description: "Ferramenta auxiliar para analisar a qualidade de algo e tomar decisões.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gradient-to-r from-green-950 to-red-950`}>
        {children}
      </body>
    </html>
  );
}
