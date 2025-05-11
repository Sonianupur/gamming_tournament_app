// /app/layout.js
import Layout from "@/components/Layout";

export const metadata = {
  title: "Gaming Tournament App",
  description: "Manage and join tournaments",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
