import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()


async function main(){
    
    const senderKey = initializeKeypair(); //pubkey = FbeqyKUvsKuyG1G2kfCqVuQEJrP3dCEeVrXWq8sMtMLX
    const receiverKey = initializeKeypair2(); //pubkey = C11t1hJJVDx9cb28bmvviL46LmMEFCwGMnEZ5W2k5inv

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

    // use this to airdrop sol to accounts
    // await connection.requestAirdrop(senderKey.publicKey, web3.LAMPORTS_PER_SOL * 2);
    let senderKeyBalance = (await connection.getBalance(senderKey.publicKey) / web3.LAMPORTS_PER_SOL)
    let receiverKeyBalance = (await connection.getBalance(receiverKey.publicKey) / web3.LAMPORTS_PER_SOL)

    //Displays initial balance to the console
    console.log("---Initial Balance---")
    console.log("balance: ", senderKeyBalance, "Sol" )
    console.log("balance: ", receiverKeyBalance, "Sol \n")

    // //perform transfer
    await sendSol(connection, senderKey, receiverKey, 2)

    //Improvements - store in lamports instead of sol
     senderKeyBalance = (await connection.getBalance(senderKey.publicKey) / web3.LAMPORTS_PER_SOL)
     receiverKeyBalance = (await connection.getBalance(receiverKey.publicKey) / web3.LAMPORTS_PER_SOL)

     //Displays initial balance to the console
     console.log("---New Balance---")
     console.log("balance: ", senderKeyBalance, "Sol" )
     console.log("balance: ", receiverKeyBalance, "Sol \n")
}

//create async function to transfer sol from one account to another

async function sendSol(connection: web3.Connection, sender: web3.Keypair, receiver: web3.Keypair, sol: number){
    const transaction = new web3.Transaction()
    // Improvement - send lamports instead of sol. 
    transaction.add(
        web3.SystemProgram.transfer({
            fromPubkey: sender.publicKey,
            toPubkey: receiver.publicKey,
            lamports: sol * web3.LAMPORTS_PER_SOL
        })
    );

    const sig = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [sender]
    );

    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`)

}


// Initialize first keypair
function initializeKeypair(): web3.Keypair{
    const secret = JSON.parse(process.env.PRIVATE_KEY1 ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

//Initialize second keypair
function initializeKeypair2(): web3.Keypair{
    const secret = JSON.parse(process.env.PRIVATE_KEY2 ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}




main().then(() => {
    console.log("Finished Successfully")
}).catch((error) => {
    console.log(error)
})