import type { Metadata } from "next";
import "./styles.css";
export const metadata: Metadata = { title:"GapFinder AI", description:"Find your learning gaps and revise smarter." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }