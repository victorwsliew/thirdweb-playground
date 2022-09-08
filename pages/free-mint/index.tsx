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
  ChainId,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3Wrapper } from "../../web3-wrapper/hooks/use-web3-wrapper-context";

const FreeMint: NextPage = () => {
  const { push } = useRouter();
  const address = useAddress();
  const nftDrop = useEditionDrop(
    process.env.NEXT_PUBLIC_GASLESS_NFT_DROP_CONTRACT_ADDRESS as string
  );

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
      claim({
        to: address,
        tokenId: 0,
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


  const [_, setWeb3Config] = useWeb3Wrapper();
  useEffect(() => {
    setWeb3Config({
      chainId: ChainId.Rinkeby,
      isGasless: true,
    });
    
  }, []);

  return (
    <div>
      <ConnectWallet accentColor="white" colorMode="light" />

      <hr />

      <h1>Test gasless claim</h1>

      <button
        onClick={claimNFT}
        disabled={isClaiming}
        style={{ marginBottom: "50px" }}
      >
        {isClaiming ? "loading...." : "claim NFT"}
      </button>

      <br />
      <h4>my nfts</h4>
      <div style={{ margin: "2px", display: "flex", flexDirection: "row" }}>
        {isLoadingNfts && <p>Loading...</p>}
        {!isLoadingNfts &&
          (ownedNFTs ?? []).length > 0 &&
          ownedNFTs?.map((nft, index) => {
            return (
              <div key={index}>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  style={{ width: "200px" }}
                />
              </div>
            );
          })}
      </div>
      <hr />
      <button onClick={() => push("/")}>Back to Home</button>
    </div>
  );
};

export default FreeMint;
