import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4A0008',
};

export const metadata = {
  metadataBase: new URL('https://the-mizan.net'),
  title: 'Mizan Law Firm | Premier Cybercrime Defense, Digital Forensics & Litigation',
  description: 'Mizan Law Firm combines courtroom litigation strategy with elite digital forensics. Defending individuals, executives, and enterprises in cybercrime, digital evidence, IP rights, and general law in Erbil, Baghdad, and cross-border.',
  keywords: 'Mizan Law Firm, cybercrime defense, digital forensics, legal consultancy Erbil, Iraq law firm, online rights, litigation, IP law, شركة ميزان للمحاماة',
  authors: [{ name: 'Mizan Law Firm' }],
  icons: {
    icon: [
      { url: '/favicon.ico?v=2' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Mizan Law Firm | Legal Defense & Digital Forensics',
    description: 'Defending your rights. Shielding your digital frontier. Elite legal defense & forensic investigations.',
    url: 'https://the-mizan.net',
    siteName: 'Mizan Law Firm',
    images: [
      {
        url: '/images/mizan-logo.jpeg',
        width: 747,
        height: 611,
        alt: 'Mizan Law Firm Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
