import React from "react";
import "./App.css";



function OnSale(props) {
    const gateway = "https://soksak.mypinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/"
    return(
        <div className='Onsale'>
            <img className="ipfsimg" src = {gateway + props.src} />
        </div>
    )
}

export default OnSale;
