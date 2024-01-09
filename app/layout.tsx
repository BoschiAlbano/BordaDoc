import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/ui/fonts";
import Menu from "@/components/menu/menu-Providers";
import { fetchGetCategorias } from "@/lib/data";

export const metadata: Metadata = {
    description: "Ecoomerce para descargar deseños para paquinas de bordar",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_HOST}`),
    icons: "/assets/wilcom/IconoBordaDoc.ico",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const categorias = await fetchGetCategorias();

    return (
        <html lang="en">
            <body className={roboto.className}>
                <Menu categorias={categorias}>{children}</Menu>
            </body>
        </html>
    );
}
