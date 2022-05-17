import React, { Component } from "react";
import "./App.css";
import { Card, Button } from "react-bootstrap";


function OnSale(props) {
    const gateway = "https://gateway.pinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/"
    // const url = "./" + props.index.toString()
    return(
        <div>
            <img className="ipfsimg" src = {gateway + props.src} />
            {/* <p>{gateway+props.src}</p> */}
            {/* <img className="ipfsimg" src = {gateway + "1.png"} /> */}

            
            {/* <Card style={{ width: '13rem' }}>
            <a href={'./' + props.index}><Card.Img className="ipfsimg" variant="top" src= {gateway + props.src}/></a>
            <Card.Body>
            <Card.Title>NFT #{props.index}</Card.Title>
            <Card.Text>
                이것은 {props.index}번째 NFT입니다.
            </Card.Text>
            <Button variant="outline-warning" href={'./' + props.index}>Detail</Button>{' '}<Button variant="outline-warning">Buy</Button>
            </Card.Body>
            </Card> */}

        </div>
    )
}

export default OnSale;