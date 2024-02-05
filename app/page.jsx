"use client"

import { config } from "@/utils/WagmiConfig";

import { WagmiConfig, useConnect } from "wagmi";
import App from "./App";




export default function Home() {


    return (
        <>
            <WagmiConfig config={config}>

                <App />
            </WagmiConfig>
        </>
    )
}
