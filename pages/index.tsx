import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createEncryptNft = async () => {
    setIsLoading(true);
    // Create and encrypt the NFTs
    const init = async () => {
      await fetch("/api/create-delayed-reveal-nft", {
        method: "POST",
      });
      return;
    }

    init().then(() => {
      setIsLoading(false);
    })
  };

  return (
    <div>
      <ConnectWallet accentColor="white" colorMode="light" />

      <hr />

      <button onClick={createEncryptNft} disabled={isLoading}>
        {isLoading ? 'loading....' : 'Create Delayed Reveal NFTs'}
      </button>
    </div>
  );
};

export default Home;
