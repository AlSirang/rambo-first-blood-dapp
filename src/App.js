import { useState } from "react";
import { CheckBox } from "./components/checkBox";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MintBridgeButton } from "./components/mintBridgeButton";
import { ProgressButton } from "./components/ProgressButton";

const supportedBridgingChains = [
  { value: "$0.07", chain: "Moonriver", chainId: 167 },
  { value: "$0.06", chain: "Celo", chainId: 125 },
  { value: "$0.05", chain: "OKT Chain", chainId: 155 },
  { value: "$0.04", chain: "Arbitrum Nova", chainId: 175 },
  { value: "$0.06", chain: "Harmony ", chainId: 116 },
  { value: "$0.07", chain: "Moonbeam", chainId: 126 },
  { value: "$0.07", chain: "Gnosis", chainId: 145 },
  { value: "$0.07", chain: "CoreDAO", chainId: 153 },
  { value: "$0.07", chain: "Kava", chainId: 177 },
  { value: "$0.06", chain: "Tenet", chainId: 173 },
];

function App() {
  const [bridgedChains, setBridgedChains] = useState(supportedBridgingChains);

  const [txInProgress, setProgress] = useState(false);

  const onCheckBoxChange = (payload, event) => {
    if (txInProgress) return;
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
              <div className="h-full flex flex-col justify-center items-center gap-3">
                <div>
                  {txInProgress ? (
                    <div className="max-w-sm w-full">
                      <ProgressButton />
                    </div>
                  ) : (
                    <MintBridgeButton
                      bridgedChains={bridgedChains}
                      setProgress={setProgress}
                    />
                  )}
                </div>
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
                      value={payload.value}
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
