/*providers的作用主要是写出需要的组件，这样在layout里用<Provider就可以包裹起来这内的所有内容了，
这个组件 Providers 接受一个叫 children 的属性，它的类型是 React 可以渲染的东西。
这样你就可以在 <Providers> ... </Providers> 里面随便放组件、文本、DOM 结构。
function中间的{props.children}就是一个占位符，用来插入 Providers 外层调用时传入的 JSX。*/


"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { type ReactNode, useState } from "react";
import config from "@/rainbowKitConfig"
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css"

//组件必须被wagmi包裹在内 因为里面所有组件都依靠wagmi的构造
//props: { children: ReactNode 用保证这个页面里的所有东西都可以使用wagmi
export function Providers(props: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {props.children}

                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}