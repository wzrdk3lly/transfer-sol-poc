import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()


async function main(){
    // // Create 1 keypair to securely store in .env
    // const newKeypair = web3.Keypair.generate()
    // console.log(`first keypair: ${newKeypair.secretKey.toString()}`)

    // Create 2nd keypair to store in .env file
    // const newKeypair2= web3.Keypair.generate()
    // console.log(`second keypair: ${newKeypair2.secretKey.toString()}`)

    
    const senderKey = initializeKeypair(); //pubkey = FbeqyKUvsKuyG1G2kfCqVuQEJrP3dCEeVrXWq8sMtMLX
    const senderKey2 = initializeKeypair2(); //pubkey = C11t1hJJVDx9cb28bmvviL46LmMEFCwGMnEZ5W2k5inv
    // // I want to know the pub key when viewing transaction details on solana explorer
    // console.log(senderKey.publicKey.toString() + "  :   " + senderKey2.publicKey.toString())

    




}



// Initialize first keypair
function initializeKeypair(): web3.Keypair{
    const secret = JSON.parse(process.env.PRIVATE_KEY1 ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

function initializeKeypair2(): web3.Keypair{
    const secret = JSON.parse(process.env.PRIVATE_KEY2 ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

//initialize second keypair

main().then(() => {
    console.log("Finished Successfully")
}).catch((error) => {
    console.log(error)
})