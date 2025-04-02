import "../assets/scss/globals.scss";
import "../assets/scss/theme.scss";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers  from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import "flatpickr/dist/themes/light.css";
import DirectionProvider from "@/provider/direction.provider";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <DirectionProvider lang={lang}>
            <ThemeProvider attribute="class" defaultTheme="light">
              <div className="flex min-h-screen flex-col">
                <MainNav />
                <div className="flex-1">{children}</div>
              </div>
            </ThemeProvider>
          </DirectionProvider>
        </Providers>
      </body>
    </html>
  );
}
