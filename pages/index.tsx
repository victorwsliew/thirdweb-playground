import {
  ThirdwebNftMedia,
  useNFTCollection,
  useNFT,
  ConnectWallet,
  useAddress,
  useNFTDrop,
  useOwnedNFTs,
  useClaimNFT,
  useEditionDrop,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const contract = useNFTCollection(
    process.env.NEXT_PUBLIC_DISPLAY_NFT_COLLECITION_CONTRACT_ADDRESS as string
  );

  const { data: nft, isLoading: isLoadingNft } = useNFT(contract, 1);

  const createEncryptNft = async () => {
    setIsLoading(true);
    // Create and encrypt the NFTs
    const init = async () => {
      await fetch("/api/create-delayed-reveal-nft", {
        method: "POST",
      });
      return;
    };

    init().then(() => {
      setIsLoading(false);
    });
  };

  const address = useAddress();
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_NFT_DROP_CONTRACT_ADDRESS as string);

  const {
    mutate: claim,
    isLoading: isClaiming,
    isSuccess,
    data: tx,
    error,
  } = useClaimNFT(nftDrop);
  const claimNFT = async () => {
    const quantity = 1;
    try {
      if (!nftDrop || !address) return;
      nftDrop?.interceptor.overrideNextTransaction(() => ({
        gasLimit: 3000000,
      }));
      claim({
        to: address,
        quantity,
      });
    } catch (err) {
      console.log("💩 Error claiming NFT: ", err);
    }
  };

  const { data: ownedNFTs, isLoading: isLoadingNfts } = useOwnedNFTs(
    nftDrop,
    address
  );

  useEffect(() => {
    if (error) {
      console.error("failed to claim nft", error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      console.log("claimed nft", tx);
    }
  }, [isSuccess, tx]);

  return (
    <div>
      <ConnectWallet accentColor="white" colorMode="light" />

      <hr />

      <button onClick={createEncryptNft} disabled={isLoading}>
        {isLoading ? "loading...." : "Create Delayed Reveal NFTs"}
      </button>

      <hr />

      <h1>Test ThirdwebNftMedia Component</h1>

      <div style={{ width: "200px" }}>
        {!isLoadingNft && nft ? (
          <ThirdwebNftMedia metadata={nft.metadata} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <hr />

      <h1>Test gasless claim</h1>

      <button
        onClick={claimNFT}
        disabled={isClaiming}
        style={{ marginBottom: "50px" }}
      >
        {isClaiming ? "loading...." : "claim NFT"}
      </button>

      <div style={{ margin: "2px", display: "flex", flexDirection: "row" }}>
        {(ownedNFTs ?? []).length > 0 &&
          ownedNFTs?.map((nft, index) => {
            return (
              <div key={index} style={{ width: "50px" }}>
                {!isLoadingNfts && nft ? (
                  <ThirdwebNftMedia metadata={nft.metadata} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            );
          })}
      </div>
      
    </div>
  );
};

export default Home;
