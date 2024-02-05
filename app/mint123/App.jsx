import ConnectButton from "@/components/ConnectButton"
import WalletInfo from "@/components/WalletInfo"
import Image from "next/image"
import { useState } from "react"
import { useAccount, useBalance, useConnect, useContractRead, useContractWrite } from "wagmi"

import { InjectedConnector } from 'wagmi/connectors/injected'


import { contract, ABI } from '@/constants/erc721'
import { ethers, parseEther } from "ethers"



function App() {

    const [balance, setBalance] = useState()
    const [tokenSupply, setTokenSupply] = useState()
    const [publicPhase, setPublicPhase] = useState()
    const [allowListPhase, setAllowListPhase] = useState()

    const { connect } = useConnect()
    const { isConnected, address } = useAccount()

    const connector = new InjectedConnector({
        options: {
            shimDisconnect: true,
        },
    })
    const handleConnectModal = () => {
        connect({ connector })
    }

    const getBalance = useBalance({
        address,
        watch: true,
        onSuccess(data) {
            setBalance(data)
        },
    })

    const totalSupply = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'totalSupply',
        watch: true,
        onSuccess(data) {
            setTokenSupply(ethers.formatUnits(data, "wei"))

        },
    })

    const publicPhaseActived = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'publicPhase',
        watch: true,
        onSuccess(data) {
            setPublicPhase(data)
        },
    })

    const allowListPhaseActived = useContractRead({
        address: contract,
        abi: ABI,
        functionName: 'allowListPhase',
        watch: true,
        onSuccess(data) {
            setAllowListPhase(data)
            console.log(data);
        },
    })

    const { write: mintNFT } = useContractWrite({
        address: contract,
        abi: ABI,
        functionName: publicPhase ? 'publicMint' : 'allowListMint',

    })


    return (
        <>
            <aside className='flex justify-end z-20 '>
                {isConnected
                    ? <WalletInfo address={address} balance={balance?.formatted} />
                    : <ConnectButton handleConnectModal={handleConnectModal} />
                }
            </aside>
            <main className={`flex h-screen flex-col lg:flex-row items-center justify-center mx-3`}>
                <section className='flex justify-center items-center gap-12 bg-white  rounded-xl relative max-w-screen-md w-full h-2/5 text-black px-9'>
                    <div>
                        <Image src="/hero.jpeg" width={300} height={300} className="aspect-square" />
                    </div>
                    <div className="flex flex-col flex-1 justify-start gap-6 ">
                        <h1 className="text-5xl font-bold">Colors</h1>
                        {publicPhase && !allowListPhase && <h2 className="text-3xl font-medium">Public Mint is <span className="font-bold bg-green-400 px-2 py-1 rounded-xl text-white">Live</span></h2>}

                        {allowListPhase && !publicPhase && <h2 className="text-3xl font-medium">AllowList Mint is <span className="font-bold bg-green-400 px-2 py-1 rounded-xl text-white">Live</span></h2>}

                        {!allowListPhase && !publicPhase && <h2 className="text-3xl font-medium">Mint is <span className="font-bold bg-red-400 px-2 py-1 rounded-xl text-white">Not Live</span></h2>}


                        <div className="flex gap-12">
                            <div>
                                <h4>Price</h4>
                                <p>{publicPhase ? '0.003 ETH' : '0.001 ETH'}</p>
                            </div>
                            <div>
                                <h4>Remaining</h4>
                                <p>{tokenSupply}/3</p>
                            </div>
                        </div>
                        <div>
                            {isConnected
                                ?
                                <button className="bg-black w-full text-white px-4 py-2 rounded-xl"
                                    onClick={() => mintNFT({ value: parseEther(publicPhase ? '0.003' : '0.001') })}
                                >Mint</button>
                                :
                                <button className="bg-black w-full text-white px-4 py-2 rounded-xl" onClick={handleConnectModal} >Connect Wallet</button>}
                        </div>
                    </div>
                </section >
            </main ></>
    )
}

export default App