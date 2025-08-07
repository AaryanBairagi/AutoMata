import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/themes-provider";
import { ClerkProvider } from '@clerk/nextjs';
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/sonner"
import { BillingProvider } from "@/providers/billing-provider";


const fonts = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoMata",
  description: "Welcome to AutoMata , AI-powered Automation for your all tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${fonts.variable} antialiased`} >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
            <BillingProvider>
              <ModalProvider>
                {children}
                <Toaster />
              </ModalProvider>
            </BillingProvider>
            
            {/* <ModalProvider>
              {children}
              <Toaster />
            </ModalProvider> */}
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
