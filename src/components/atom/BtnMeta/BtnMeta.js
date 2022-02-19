import React, { useState } from 'react'

const BtnMeta = () => {

    const [isConnected, setIsConnected] = useState(false)
    const [walletAddress, setWalleAddress] = useState('')

    const pressedConnectWallet = async () => {
        if (isConnected) return console.log('Esta conectada' + walletAddress)
        const walletRes = await connectWallet()
        setIsConnected(walletRes.connectedStatus)
        setWalleAddress(walletRes.adrress)

        transactionWillet()
    }
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const adrress = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                })
                const object = {
                    connectedStatus: true,
                    status: "Connected",
                    adrress
                }

                return object;

            } catch (error) {
                return {
                    connectedStatus: false,
                    status: "Erro ao conectar na carteira"
                }
            }
        } else {
            return {
                connectedStatus: false,
                status: "Metamask não esta instalada"
            }
        }
    }



    const transactionWillet = async () => {

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                nonce: '0x00', // ignored by MetaMask
                gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
                gas: '0x2710', // customizable by user during MetaMask confirmation.
                to: walletAddress, // Required except during contract publications.
                from: '0x9fa74010A7f1067E21CA05A77867C753a0e52F87', // must match user's active address.
                value: '0x00', // Only required to send ether to the recipient from the initiating external account.
                data:
                    '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
                chainId: '0x3', // Used to prevent t

            }],
        });
        console.log(txHash);
    }

    return (
        <button
            className='from-indigo-600 to-fuchsia-600 bg-gradient-to-l py-10 px-22 rounded-lg text-white font-semibold'
            onClick={pressedConnectWallet}>
            Conectar
        </button>
    )
}

export default BtnMeta