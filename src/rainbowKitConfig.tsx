//rainbowkit的config
"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { anvil, zksync } from "wagmi/chains" //使用的chain

export default getDefaultConfig({
    appName: "Tsender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, //rainbowkit官网的ID
    chains: [anvil, zksync],
    ssr: true,
});