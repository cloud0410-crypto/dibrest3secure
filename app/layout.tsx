import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dibrugarh Table & Stay | Food and hospitality guide",
  description: "Discover highly reviewed restaurants, hotels and tea garden stays in Dibrugarh, Assam. Match places to your food and travel preferences."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}