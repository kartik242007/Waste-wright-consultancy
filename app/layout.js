import './globals.css'

export const metadata = {
  title: 'Waste Wright Consultancy — Circular Economy & Waste Intelligence',
  description: 'Strategy and engineering consultancy advising governments, municipalities and Fortune 500 manufacturers on waste diagnostics, ESG reporting, and circular-economy transformation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-pine text-bone antialiased">
        {children}
      </body>
    </html>
  )
}
