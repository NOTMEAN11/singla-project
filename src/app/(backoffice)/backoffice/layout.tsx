import SideBar from "@/components/backoffice/layouts/sidebar/sidebar";
import "../../(main)/globals.css";
import BackofficeLayout from "@/components/backoffice/layouts/layout";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/backoffice/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthSessionProvider from "@/components/backoffice/provider/session-provider";

const inter = Inter({ subsets: ["latin"] });

export default function BackofficeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="h-full bg-accent">
        <AuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BackofficeLayout>{children}</BackofficeLayout>
            <Toaster richColors position="bottom-center" theme="system" />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
