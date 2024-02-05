import { IconBrandDiscordFilled, IconBrandTwitterFilled } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import ConnectButton from "@/components/ConnectButton"
import WalletInfo from "@/components/WalletInfo"
import { useState } from "react"
import { useAccount, useBalance, useConnect, useContractRead, useContractWrite } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { contract, ABI } from '@/constants/erc721'
import { ethers, parseEther } from "ethers"	

var numNfts=1;



function inc() {
  let number = document.querySelector('[name="numberNFTs"]')
  numNfts = numNfts + 1;
  number.value = parseInt(numNfts);

}

function dec() {
    let number = document.querySelector('[name="numberNFTs"]');
	if (numNfts > 1) {
	  numNfts = numNfts - 1;
	  number.value = parseInt(numNfts);
  }
}


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

	<div class="navigation w-nav">

			<div class="navigation-wrap">
					<a href="#ctp_info" class="navigation-item w-nav-link ctpicon"><img width={60} height={60}  src="/ctp_icon2.png"/></a>
					<a href="https://opensea.io/collection/text-apes" target="_blank" class="navigation-item w-nav-link"><img width={60} height={60}  src="/opensea.png"/></a>
					<a href="http://discord.gg/MMzNbT9qCv" target="_blank" class="navigation-item w-nav-link"><img width={60} height={60} src="/discord.png"/></a>
				    {isConnected
						? <WalletInfo address={address} balance={balance?.formatted} />
						: <ConnectButton handleConnectModal={handleConnectModal} />
					}

			</div>

	</div>
	<div class="section">
		<div class="intro-header"><div class="intro-content">
				<div class="heading-jumbo">CrytoTitPussys<br/></div>
				<div class="paragraph-bigger cc-bigger-light">The female version of the most iconic meme in internet history.</div>
				<div class="paragraph-bigger cc-bigger-light">After years of living on Cleavage Island, It&apos;s time to go home. Help in the return to Gooch Island and who knows if in its repopulation minting one of 5200 TitPussys.</div>



                    <div class=" heading-jumbo-small bg-mint div-mint">
                        {publicPhase && !allowListPhase && <h3>Public Mint is <span className="font-bold bg-green-400 px-1 py-1 rounded-xl text-white">Live</span></h3>}

                        {allowListPhase && !publicPhase && <h3>AllowList Mint is <span className="font-bold bg-green-400 px-1 py-1 rounded-xl text-white">Live</span></h3>}

                        {!allowListPhase && !publicPhase && <h3>Mint is <span className="font-bold bg-red-400 px-1 py-1 rounded-xl text-white">Not Live</span></h3>}

                        <div class="img-mint div-mint">
                            <div class="img-mint div-mint">
                                <h6>Price</h6>
                                <h4 name="numberNFTsReply">{publicPhase ? '0.036 ETH' : '0.025 ETH'}</h4>
                            </div>
                            <div class="img-mint div-mint">
                                <h6>Remaining</h6>
                                <h4>{tokenSupply}/30</h4>
                            </div>
                        </div>
                        <div >
							
										
                            {isConnected && (publicPhase || allowListPhase)
                                ?
									<div className="img-mint div-mint">
										
									<div className="img-mint div-mint">

									<button className="button3"  onClick={dec}>-</button>
										<input className="button top-corner-button  text-block-4 button2" id="test"   name="numberNFTs" type="string"  value={numNfts}/>
									<button className="button3" onClick={inc}>+</button>  
									</div>
									<button className="button top-corner-button w-inline-block text-block-3"
										onClick={() => mintNFT({ args: [numNfts],value: parseEther(publicPhase ? ((numNfts * 0.036).toFixed(3)) + ""  : ((numNfts * 0.025).toFixed(3))	 + "" ) })}
										>Mint</button>
									</div>							
                                : isConnected
								?
								<button className="button top-corner-button w-inline-block text-block-3" onClick={handleConnectModal} >Mint is not live</button>
								:
                                <button className="button top-corner-button w-inline-block text-block-3" onClick={handleConnectModal} >Connect Wallet</button>}
                        </div>
                    </div>


		</div>

	</div>
	</div>
	<img src="https://uploads-ssl.webflow.com/64bfa239c791453caa139473/64cce746bf092e5b997042e4_collage3.png" loading="lazy" alt="" sizes="100vw" class="image-11"/>
	<div class="container"></div>
	<div class="text-block-5"><br/></div>	
	<div id="ctp_info" class="paragraph-bigger cc-bigger-light3">About CryptoTitPussys</div>
	<div class="paragraph-bigger cc-bigger-light2">CTP are inspired by cryptodickbutts and wonderbra creating the female version of the iconic meme.</div>
	<div class="paragraph-bigger cc-bigger-light2">CTP wanted to create something that was fun and sexy, but that was also a celebration of femininity in a world dominates by masculinity.</div>
	<div class="paragraph-bigger cc-bigger-light2">Every CTP has a story to tell, and it can help to shape the future. </div>
	<div class="empty"> </div>
	<div class="paragraph-bigger cc-bigger-light3">What&apos;s Next</div>
	<div class="paragraph-bigger cc-bigger-light2">Love, repopulation, war, coexistence... The community will have the final say on the future of Gooch Island after the return.</div>
	<div class="paragraph-bigger cc-bigger-light2">New Mathematical algorithms will be define.</div>
	<div class="paragraph-bigger cc-bigger-light2">New Islands will be discovered.</div>
	<div class="paragraph-bigger cc-bigger-light2">New horizons open up for CTP and CDB.</div>
	<div class="empty"> </div>
            </>
		
    )
}

export default App