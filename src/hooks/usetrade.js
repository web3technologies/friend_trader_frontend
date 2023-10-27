import { useState, useEffect } from "react";
import { BrowserProvider, Contract, parseEther } from 'ethers';
import ContractABI from "../static/abi.json";
import Web3Modal from 'web3modal';


export default function useTrade(){
    const contractAddress = "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4";
    const web3Modal = new Web3Modal();

    const buyShares = async (sharesSubject, amount) => {
        console.log(sharesSubject, amount)
        try {
            const connection = await web3Modal.connect();
            const provider = new BrowserProvider(connection);
            const signer = provider.getSigner();
            const contract = new Contract(contractAddress, ContractABI, signer);
            const price = await contract.interface.functions.getBuyPriceAfterFee(sharesSubject, amount);
            await contract.functions.buyShares(sharesSubject, amount, { value: parseEther(price.toString()) });
        } catch (error) {
            console.error("Error buying shares:", error);
        }
    };

    const sellShares = async (sharesSubject, amount) => {
        try {
            const connection = await web3Modal.connect();
            const provider = new BrowserProvider(connection);
            const signer = provider.getSigner();
            const contract = new Contract(contractAddress, ContractABI, signer);

            await contract.sellShares(sharesSubject, amount);
        } catch (error) {
            console.error("Error selling shares:", error);
        }
    };

    return { buyShares, sellShares };
}
