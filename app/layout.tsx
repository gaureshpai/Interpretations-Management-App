import type { Metadata} from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Interpretations",
  description: "Generated by create next app",
  icons: {
    icon:
      [
        'favicon.ico?v=4',
      ],
    apple: [
      'apple-touch-icon.png?v=4',
    ],
    shortcut: [
      'apple-touch-icon.png?v'
    ]
  },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
      <body className="font-sans bg-gray-100">
        <div className="mx-auto max-w-8xl">
          <header className="bg-gradient-to-r from-blue-500 to-blue-700 py-4 rounded-b-lg">
            <div className="flex justify-between items-center px-4">
              <Link href={"/"} passHref>
                <div className="text-3xl font-bold text-white hover:text-gray-200 transition-colors cursor-pointer">
                  Tech Interpretations
                </div>
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href={"/create"} passHref>
                      <div className="text-white bg-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors cursor-pointer">
                        Add New
                      </div>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="p-4 text-lg">{children}</main>
        </div>
      </body>
    </html>
  );
}
