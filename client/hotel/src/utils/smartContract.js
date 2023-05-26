import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "../artifacts/contracts/hotelManagement.sol/hotelManagement.json";

// The contract address
const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

// Create a contract instance outside the function
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, Greeter.abi, signer);

export async function createPayment(userId, payment, rooms) {
  try {
    await requestAccount();

    const currentNonce = await signer.getTransactionCount();
    const newNonce = currentNonce + 1; // Increment the nonce value

    const transaction = await contract.createPayment(userId, payment, rooms, {
      nonce:2,
    });
    const transactionReceipt = await transaction.wait();

    // Check if the transaction was successful
    if (transactionReceipt.status === 1) {
      console.log(transactionReceipt);
      // Retrieve the emitted event
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
  try {
    await requestAccount();
    console.log("Hello");

    const transaction = await contract.getPermissions();
    console.log(transaction.length);
    return transaction

    // Check if the transaction was successful
  } catch (error) {
    console.log("Error: ", error);
  }
}
  export async function checkoutRooms(paymentID,rooms) {
    try {
      await requestAccount();
      console.log("Hello");
  
      const transaction = await contract.checkoutRooms(paymentID,rooms);
      console.log(transaction.length);
      const filter = contract.filters.RoomsCheckedOut(null);
      const events = await contract.queryFilter(filter,  transaction.blockHash);
      const result = events[0].args[0];
      await setTimeout(3000)
      return result;
    } catch (error) {
      console.log("Error: ", error);
    }
    
}
export async function approvePayment(Id) {
  try {
    await requestAccount();
    console.log("Hello");

    const transaction = await contract.approvePayment(Id);
    console.log(transaction.length);
    const filter = contract.filters.PaymentApproved(null,null);
    const events = await contract.queryFilter(filter,  transaction.blockHash);
    const result = events[0].args[0];
    console.log(result)
    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
  
}
