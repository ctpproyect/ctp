import { Inter } from 'next/font/google'
import './style.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CryptoTitPussys',
  description: 'The female take on the most iconic meme in internet history',
}

export default function RootLayout({ children }) {
  return (
    <html class="w-mod-js wf-inter-n4-active wf-inter-n6-active wf-inter-n3-active wf-inter-n8-active wf-inter-n5-active wf-montserrat-i6-active wf-montserrat-i3-active wf-montserrat-i5-active wf-montserrat-i8-active wf-montserrat-i2-active wf-montserrat-i9-active wf-montserrat-i7-active wf-montserrat-i1-active wf-montserrat-i4-active wf-montserrat-n3-active wf-montserrat-n8-active wf-montserrat-n9-active wf-montserrat-n2-active wf-montserrat-n4-active wf-montserrat-n6-active wf-montserrat-n5-active wf-montserrat-n7-active wf-montserrat-n1-active wf-active">
<head><meta charset="utf-8"/><title>CryptoTitPussys: The female version of the most iconic meme in internet history.</title>
<meta content="Help in the reconquest of Gooch Island and its subsequent repopulation minting one of 5200 TitPussys."/>
<meta content="The female version of the most iconic meme in internet history."/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous"/>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript" async/>

</head>
<body class="body">{children}</body>
    </html>
  )
}
