import { useState, useEffect } from "react";
import { connectWallet } from "../web3Client";
import CdpList from "../components/CdpList";



export default function Home() {
    const [searchValue, setSearchValue] = useState('')
    const [roughCdpId, setRoughCdpId] = useState("");
    const [sellectedCollateral, setSellectedCollateral] = useState("ALL");



    useEffect(() => {
        handleConnectWallet();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRoughCdpId(searchValue);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchValue])

    async function handleConnectWallet() {
        await connectWallet();
    }


    function handleChange(e) {
        setSearchValue(e.target.value);
    }
    function handleCollateralChange(e) {
        setSellectedCollateral(e.target.value);
    }

    return (
        <>
            <header>
                <div className="logo">
                    <div className="image"></div>
                    <h1>CDP EXPLORE</h1>
                </div>
            </header>
            <div id="input-block">
                <div className="input" id="input-id">
                    <input type="text" id="rough-cdp-id" placeholder="ID" value={searchValue} onChange={handleChange} />
                </div>
                <div id="positions-header">
                    <h2>Positions</h2>
                    <div className="input" id="input-col">
                        <label htmlFor="collateral-type" >Collateral type:</label>
                        <select className="Collateral Type" id="collateral-type" value={sellectedCollateral} onChange={handleCollateralChange}>
                            <option value="ALL" className="collateralOptions">ALL</option>
                            <option value="ETH-A" className="collateralOptions">ETH-A</option>
                            <option value="WBTC-A" className="collateralOptions">WBTC-A</option>
                            <option value="WSTETH-A" className="collateralOptions">WSTETH-A</option>
                        </select>
                    </div>
                </div>
            </div>
            {roughCdpId && <CdpList roughCdpId={roughCdpId} sellectedCollateral={sellectedCollateral} />}
        </>
    );
}
