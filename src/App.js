import { useState } from "react";
import { CheckBox } from "./components/checkBox";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MintBridgeButton } from "./components/mintBridgeButton";

const supportedBridgingChains = [
  { chain: "Moonriver", chainId: 167 },
  { chain: "Celo", chainId: 125 },
  { chain: "OKT Chain", chainId: 155 },
  { chain: "Arbitrum Nova", chainId: 175 },
  { chain: "Harmony ", chainId: 116 },
  { chain: "Moonbeam", chainId: 126 },
  { chain: "Gnosis", chainId: 145 },
  { chain: "CoreDAO", chainId: 153 },
  { chain: "Kava", chainId: 177 },
  { chain: "Tenet", chainId: 173 },
];

function App() {
  const [bridgedChains, setBridgedChains] = useState(supportedBridgingChains);

  const onCheckBoxChange = (payload, event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const chainInList = bridgedChains.filter(
        (chainInfo) => chainInfo.chain === payload.chain
      );

      if (chainInList.length === 0)
        setBridgedChains((prev) => [...prev, payload]);
      return;
    }

    const selectedChains = bridgedChains.filter(
      (chainInfo) => chainInfo.chain !== payload.chain
    );

    setBridgedChains(selectedChains);
  };

  return (
    <>
      <Header />

      <main className="mt-20 max-w-6xl m-auto px-3">
        <div className="text-center">
          <p className="text-lg">
            Please ensure your wallet is set to Polygon mainnet and connect
            wallet
          </p>
          <p className="text-lg mt-2">
            Clicking the "Mint and Bridge" button below will first mint NFT and
            bridge it to the selected chains
          </p>
        </div>

        <div className="bg-slate-950 ring-1 ring-[#153d1d5e] ring-inset max-w-5xl m-auto mt-20 rounded-md px-5">
          <div className="flex flex-col-reverse justify-center gap-3 tablet:grid grid-cols-12 min-h-[50vh] h-full">
            <div className="tablet:col-span-6 col-span-12">
              <div className="h-full flex justify-center items-center">
                <MintBridgeButton bridgedChains={bridgedChains} />
              </div>
            </div>
            <div className="tablet:col-span-6 col-span-12">
              <div className="h-full flex justify-center items-center">
                <div className="tablet:inline-block flex flex-wrap justify-center">
                  {supportedBridgingChains.map((payload) => (
                    <CheckBox
                      chain={payload.chain}
                      chainId={payload.chainId}
                      key={payload.chainId}
                      onCheckBoxChange={onCheckBoxChange.bind(this, payload)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
