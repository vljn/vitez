import './globals.css';

export const metadata = {
  title: 'Knight Travails',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">{children}</body>
    </html>
  );
}
