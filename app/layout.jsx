import "./globals.css";

// import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/assets/css/bootstrap.min.css";
import "@/public/assets/css/common.css";

import "@/public/assets/css/main.css";
import "@/public/assets/css/responsive.css";

export const metadata = {
  title: "Buddy Script",
  description: "Login and registration page for a modern web app.",
};


export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
