"use client";
import { Inter } from "next/font/google";
import { useThemeStore } from "@/store";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { Toaster as ReactToaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
import { SonnToaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { Provider } from 'react-redux';
import { store } from "@/store";
import AuthProvider from "./auth.provider";
import DirectionProvider from "./direction.provider";
import DashboardLayoutProvider from "./dashboard.layout.provider";
import { ReduxPersistProvider } from './redux-persist.provider';

const inter = Inter({ subsets: ["latin"] });
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { theme, radius } = useThemeStore();
  const location = usePathname();

  if (location === "/") {
    return (
      <body className={cn("dash-tail-app ", inter.className)}>
        <Provider store={store}>
          <ReduxPersistProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <AuthProvider>
                {/* <DirectionProvider> */}
                  {/* <DashboardLayoutProvider> */}
                    <div className={cn("h-full  ")}>
                      {children}
                      <ReactToaster />
                    </div>
                  {/* </DashboardLayoutProvider> */}
                {/* </DirectionProvider> */}
              </AuthProvider>
            </ThemeProvider>
          </ReduxPersistProvider>
        </Provider>
        <Toaster />
        <SonnToaster />
      </body>
    );
  }
  return (
    <body
      className={cn("dash-tail-app ", inter.className, "theme-" + theme)}
      style={{
        "--radius": `${radius}rem`,
      } as React.CSSProperties
      }
    >
      <Provider store={store}>
        <ReduxPersistProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <AuthProvider>
              {/* <DirectionProvider> */}
                {/* <DashboardLayoutProvider> */}
                  <div className={cn("h-full  ")}>
                    {children}
                    <ReactToaster />
                  </div>
                {/* </DashboardLayoutProvider>
              </DirectionProvider> */}
            </AuthProvider>
          </ThemeProvider>
        </ReduxPersistProvider>
      </Provider>
      <Toaster />
      <SonnToaster />
    </body>
  );
};

export default Providers;
