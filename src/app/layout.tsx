//页面的组件排放
import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";
import Header from "@/componments/Header"

export const metadata: Metadata = {
  title: "T-SENDER",
};
//RootLayout 是 Next.js 的 布局组件 children 就是你在 RootLayout 外层包裹的 页面内容。
export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
