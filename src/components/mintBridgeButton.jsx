import { getContract, parseAbiItem } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import { polygon } from "wagmi/chains";

import ABI from "../assets/ABI.json";

const CONTRACT_ADDRESS = "0x1687c4140b72f6fd2692bbc4192a2d34644ae724";

export const MintBridgeButton = () => {
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

      const hash = await contractWrite.write.mint({
        from: address,
        chain: polygon,
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      console.log(receipt);

      const filter = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: parseAbiItem(
          "event Transfer(address indexed from, address indexed to, uint256 value)"
        ),
        fromBlock: "latest",
      });

      console.log(filter);
    } catch (err) {}
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
