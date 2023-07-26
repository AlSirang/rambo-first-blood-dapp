import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <header className="max-w-7xl m-auto px-3 pt-5">
      <div className="flex justify-between flex-wrap sm:flex-nowrap">
        <div>
          <h2 className="text-2xl">Rambo First Blood</h2>
          <h3 className="text-xl">NFT Minting and Bridging</h3>
        </div>

        <div className="sm:mt-0 mt-5 w-full sm:w-auto ">
          <ConnectButton className="w-full rounded-md bg-green-600 hover:bg-green-500 transition-all py-2 px-3" />
        </div>
      </div>
    </header>
  );
};
