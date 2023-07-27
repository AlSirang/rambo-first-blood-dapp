import { getContract, parseEther } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";

import ABI from "../assets/ABI.json";
import { configChain } from "../config/rainbowkit";
import { useRef } from "react";

// hash for Transfer Event
const TRANSFER_TOPIC =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

const contractPayload = {
  abi: ABI,
  address: "0x1687c4140b72f6fd2692bbc4192a2d34644ae724",
};

export const MintBridgeButton = ({
  bridgedChains = [],
  setProgress = () => null,
}) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const txCountRef = useRef(0);

  const onClick = async () => {
    if (!isConnected) return;
    try {
      const contractWrite = getContract({
        ...contractPayload,
        walletClient,
        publicClient,
      });

      const cost = await contractWrite.read.cost();
      setProgress(true);

      for (const { chainId: dstChainId } of bridgedChains) {
        txCountRef.current += 1;

        let estimateGas = await publicClient.estimateContractGas({
          ...contractPayload,
          account: address,
          functionName: "mint",
          value: cost,
        });

        const mintHash = await contractWrite.write.mint({
          value: cost.toString(),
          from: address,
          chain: configChain[0],
          gas: estimateGas,
        });

        const receipt = await publicClient.waitForTransactionReceipt({
          hash: mintHash,
          confirmations: 1,
        });

        let tokenId = null;

        // extract minted tokenId from transaction receipt logs
        receipt.logs.forEach((log) => {
          const topics = log.topics;
          if (
            topics[0].toLocaleLowerCase() === TRANSFER_TOPIC.toLocaleLowerCase()
          )
            tokenId = parseInt(topics[3]);
        });

        const crossChainValue = parseEther("0.09");

        estimateGas = await publicClient.estimateContractGas({
          ...contractPayload,
          account: address,
          functionName: "crossChain",
          args: [dstChainId, tokenId],
          value: crossChainValue,
        });

        const crossChainHash = await contractWrite.write.crossChain(
          [dstChainId, tokenId],
          {
            from: address,
            chain: configChain[0],
            gas: estimateGas,
            value: crossChainValue, // value returned by estimate gas was only working for Tenet network. this value should work for all networks. it will return remaining value(eth) back to wallet
          }
        );

        await publicClient.waitForTransactionReceipt({
          hash: crossChainHash,
          confirmations: 1,
        });
      }
    } catch (err) {
      console.log("click inner: ", err);
    }

    txCountRef.current = 0;

    setProgress(false);
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="rounded-md bg-green-600 hover:bg-green-500 transition-all py-2 px-5 disabled:bg-gray-400"
      >
        Mint and Bridge
      </button>
    </div>
  );
};
