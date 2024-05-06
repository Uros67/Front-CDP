import { useEffect, useState } from "react";
import { getCdp } from "../web3Client";
import CdpItem from "./CdpItem"

export default function CdpList({ roughCdpId, sellectedCollateral }) {
    const [cdpList, setCdpList] = useState([]);
    const [semaphore, setSemaphore] = useState(5);
    let lLength = 0;

    useEffect(() => {
        handleCdpList();

        return () => {

            setCdpList([]);
        };
    }, [roughCdpId, sellectedCollateral]);

    useEffect(() => {
        console.log(`Selected collateral is: ${sellectedCollateral}`);
    }, [sellectedCollateral]);

    async function handleCdpList(step = 0) {
        let id = parseInt(roughCdpId);


        try {
            const [cdpIds, newStep] = getIds(id, step, sellectedCollateral);
            step = newStep;
            await Promise.all(cdpIds.map(fetchCdp));
            if (lLength < 20) {
                handleCdpList(newStep);
            }


        } catch (error) {
            console.error("Error fetching CDPs:", error);
        }


    }

    function getIds(id, step) {
        let idList = [];
        while (idList.length < 20) {
            idList.push(id += (step % 2 === 0 ? step : -step))
            step += 1
        }
        return [idList, step]
    }

    async function fetchCdp(cdpId) {
        if (semaphore === 0) return;
        setSemaphore(prev => prev - 1);

        try {
            const response = await getCdp(cdpId, sellectedCollateral);
            if (response.ilkString === sellectedCollateral || sellectedCollateral === "ALL") {
                if (lLength < 20) {
                    setCdpList(prevList => [...prevList, response]);
                    lLength += 1
                }
            }
        } catch (error) {
            console.error("Error fetching CDP:", cdpId, error);
        } finally {
            setSemaphore(prev => prev + 1);
        }
    }

    return (
        <div className="listCDP">
            <div className="listHeader">
                <section className="idSection">ID</section>
                <section className="collateralSection">COLLATERAL</section>
                <section className="debtSection">DEBT</section>
            </div>
            <div className="CdpList">
                {cdpList.map((cdp, index) => (
                    <CdpItem key={index} cdpItem={cdp} />
                ))}
            </div>
        </div>
    );
}
