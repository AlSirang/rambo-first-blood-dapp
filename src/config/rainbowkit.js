import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: "zQ2t3jnlD1iAcT68ehQO7X2BgAJo8wV4" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Rambo First Blood",
  projectId: "ebc402d25f092ff1562c63abf5fa28fd",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const RainbowKitProviderWrapper = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#16a34a",
          accentColorForeground: "#fff",
          borderRadius: "medium",
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
