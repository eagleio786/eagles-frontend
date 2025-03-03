import { readContract, writeContract } from "@wagmi/core";
import { useWatchContractEvent } from "wagmi";
import {
  config,
  ContractAdress,
  ABI,
  USDTTestNetABI,
  USDTContractAdress,
} from "./config";

import { waitForTransactionReceipt } from "wagmi/actions";

export const getTxn = async (hash) => {
  try {
    if (!hash) {
      return null;
    }
    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash,
    });

    return transactionReceipt.status === "success" ? true : false;
  } catch (error) {
    console.error("Error getTxn:", error);
    return null;
  }
};
///////////////////////////////////////////////////////////Write MEthods///////////////////////////////////
// 1:
export const activateLevel = async (matrix, level) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "activateLevel",
    args: [matrix, level],
  });
  return result;
};
//2
export const buyNewLevelFor = async (address, matrix, level) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "buyNewLevelFor",
    args: [address, matrix, level],
  });
  return result;
};
//4
export const register = async (address) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "register",
    args: [address],
  });
  return result;
};
//5
export const registrationFor = async (userAddress, refferAddress) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "registrationFor",
    args: [userAddress, refferAddress],
  });
  return result;
};
//6
export const withdrawLostTokens = async (tokenAddress) => {
  const result = await writeContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "withdrawLostTokens",
    args: [tokenAddress],
  });
  return result;
};

export const USDTapprove = async (amount) => {
  const result = await writeContract(config, {
    abi: USDTTestNetABI,
    address: USDTContractAdress,
    functionName: "approve",
    args: [ContractAdress, amount],
  });
  return result;
};

export const getTotalUSDTReceived = async (adress) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "getTotalUSDTReceived",
    args: [adress],
  });
  return result;
};

export const getCurrentX1Level = async (adress) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "getCurrentX1Level",
    args: [adress],
  });
  return result;
};

export const getCurrentX2Level = async (adress) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "getCurrentX2Level",
    args: [adress],
  });
  return result;
};
///////////////////////////////////////////////////READ METHODS///////////////////////////////////
// 1:
export const BASIC_PRICE = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "BASIC_PRICE",
  });
  // console.log('BASIC_PRICE :', result);
  return result;
};
// 2:
export const LAST_LEVEL = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "LAST_LEVEL",
  });
  // console.log('LAST_LEVEL :', result);
  return result;
};
// 3:
export const balances = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "balances",
    args: ["0x722f3A7D715ceB9F3BE92643e4C750310c6B1982"],
  });
  // console.log('balances :', result);
  return result;
};
// 4:
export const contractOwner = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "contractOwner",
  });
  // console.log('contractOwner :', result);
  return result;
};
//5
export const depositToken = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "depositToken",
  });
  // console.log('depositToken :', result);
  return result;
};
//8
export const id1 = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "id1",
  });
  return result;
};
//9
export const getIdToAddress = async (id) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "idToAddress",
    args: [id],
  });
  return result;
};
//10
export const isUserExists = async (address) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "isUserExists",
    args: [address],
  });
  return result;
};
//11
export const lastUserId = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "lastUserId",
  });
  return result;
};
//12
export const levelPrice = async (Level) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "levelPrice",
    args: [Level],
  });
  // console.log('levelPrice :', result);
  return result;
};
//13

export const locked = async () => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "locked",
  });
  // console.log('locked :', result);
  return result;
};

//14

export const userIds = async (ID) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "userIds",
    args: [ID],
  });
  // console.log('userIds :', result);
  return result;
};

//15
export const users = async (address) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "users",
    args: [address],
  });
  return result;
};

//16
export const getSlotFilled = async (address, matrix, level) => {
  const result = await readContract(config, {
    abi: ABI,
    address: ContractAdress,
    functionName: "getSlotsFilled",
    args: [address, matrix, level],
  });
  return result;
};
/////////////////////////////////////// events
export const getEventData =  () => {
  const result =  useWatchContractEvent({
    address: ContractAdress,
    abi:ABI,
    eventName: "FundsDistributed",
    onLogs(logs) {
      console.log("New logs!-----------------------------", logs);
    },
  });

  return result;
};
