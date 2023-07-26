import { getContract } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";

import ABI from "../assets/ABI.json";
import { configChain } from "../config/rainbowkit";

const CONTRACT_ADDRESS = "0x1687c4140b72f6fd2692bbc4192a2d34644ae724";

export const MintBridgeButton = ({ bridgedChains = [] }) => {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const onClick = async () => {
    if (!isConnected) return;
    try {
      const contractWrite = getContract({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        walletClient,
      });

      for (const { chainId: dstChainId } of bridgedChains) {
        const mintHash = await contractWrite.write.mint({
          from: address,
          chain: configChain[0],
        });

        await publicClient.waitForTransactionReceipt({
          hash: mintHash,
        });

        // let tokenId = 123
        // const crossChainHash = await contractWrite.write.crossChain(
        //   dstChainId
        // );

        // await publicClient.waitForTransactionReceipt({
        //   hash: crossChainHash,
        // });
      }
    } catch (err) {
      console.log("click inner: ", err);
    }
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="rounded-md bg-green-600 hover:bg-green-500 transition-all py-2 px-5"
      >
        Mint and Bridge
      </button>
    </div>
  );
};
