import { Cutive_Mono } from "next/font/google"

const cutiveMono = Cutive_Mono({
  subsets: ["latin"],
  weight: "400"
})


export default function Backend() {
    const text =
`####        ####
####        ####
####        ####
####        ####


####               ####
####               ####
    ###############    
    ###############    `
    return (
        <>
            <pre className={`text-lg text-center whitespace-pre py-12 text-text-title ${cutiveMono.className}`}>{text}</pre>
        </>
    )
}

// `####      ##  
// ####        ##
//             ##
//             ##
// ####        ##
// ####      ##  `