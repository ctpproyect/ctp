import { addressFormater } from '@/utils/addressFormater'

function WalletInfo({ address, balance }) {


    return (

		<a id="connect" class="button top-corner-button w-inline-block"><div id="connect-text" class="text-block-3">{address && addressFormater(address)}</div></a>
    )
}

export default WalletInfo