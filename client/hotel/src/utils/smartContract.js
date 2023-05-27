import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "../artifacts/contracts/hotelManagement.sol/hotelManagement.json";
import constants from '../utils/constants.json'
const contractAddress = constants.key
export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}
export async function createPayment(userId, payment, rooms) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
  try {
    await requestAccount();

    const currentNonce = await signer.getTransactionCount();
    const transaction = await contract.createPayment(userId, payment, rooms, {
      nonce:2,
    });
    const transactionReceipt = await transaction.wait();
    if (transactionReceipt.status === 1) {
      console.log(transactionReceipt);
      const filter = contract.filters.PaymentCreated(null);
      const events = await contract.queryFilter(filter, transactionReceipt.blockHash);
      const result = events[0].args[0];
      console.log(result);
      return result;
    } else {
      console.log("Transaction failed.");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function getPermissions() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
  try {
    await requestAccount();
    console.log("Hello");

    const transaction = await contract.getPermissions();
    console.log(transaction.length);
    return transaction
  } catch (error) {
    console.log("Error: ", error);
  }
}
  export async function checkoutRooms(paymentID,rooms) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
    try {
      await requestAccount();
      console.log("Hello");
      console.log(rooms)
      const transaction = await contract.checkoutRooms(paymentID,rooms);
      await transaction.wait();
      console.log(transaction.length);
      const filter = contract.filters.RoomsCheckedOut(null);
      const events = await contract.queryFilter(filter,  transaction.blockHash);
      const result = events[0].args[0];
      return result;
    } catch (error) {
      console.log("Error: ", error);
    }
    
}
export async function approve(userId) {
  try {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(contractAddress, Greeter.abi, signer);

    const sender = await signer.getAddress();
    console.log(sender);
    console.log(userId);
    let transaction2=""
    await contract.approvePayment(sender, userId).then(async(result)=>{
      await result.wait().then(async(result)=>{
        console.log(result)
        if(result.status===1){
          contract = new ethers.Contract(contractAddress, Greeter.abi,provider);
          transaction2=await contract.getPayment(sender, userId);
          console.log(transaction2)
        }
      }).catch(()=>{
        return false
      })
    }).catch(()=>{
      return false
    });
    return transaction2;
  } catch (error) {
    console.log("Error: ", error);
  }
}







export async function Checkcout(roomId) {
  try {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);
    console.log(roomId)
    const transaction = await contract.userCheckout(roomId);
    await transaction.wait();

    const filter = contract.filters.userCheckedOut(null);
    const events = await contract.queryFilter(filter, transaction.blockHash);
    const result = events[0].args[0];
    console.log(result)
    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
}