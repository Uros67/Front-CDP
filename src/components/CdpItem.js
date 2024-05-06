import { useEffect, useState } from "react";

export default function CdpItem({ cdpItem }) {
    const [cdpData, setCdpData] = useState({
        id: "",
        ilk: "",
        collateral: "",
        debt: "",
    });

    useEffect(() => {
        setCdpData({
            id: cdpItem.cdpId, 
            ilk: cdpItem.ilkString, 
            collateral: cdpItem.convertedColl, 
            debt: cdpItem.convertedDebt, 
        });
    }, [cdpItem]);

    return (
        <div className="cdpItem">
            <p className="cdp-id">{cdpData.id}</p>
            <p className="collateral">{cdpData.collateral + " " + cdpData.ilk}</p>
            <p className="debt">{cdpData.debt + " " + "DAI"}</p>
        </div>
    );
}
