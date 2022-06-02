import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import Jacket from "./contracts/Jacket.json";
import getWeb3 from "./getWeb3";
import { useState } from 'react';

const Minting = (props) => {
	const [message, setmessage] = useState('');

	const mint = () => {
        props.contract.methods.mint().send({ from: props.account })
        .once('receipt', async(receipt) => {
            const id = await props.contract.methods.getmintedId().call();
            if(id > 80) {
                if (window.confirm("Rare Jacket Minted!")) {
                    window.location.replace("/mypage")
                }
            }else {
                if(window.confirm("Normal Jacket Minted!")) {
                    window.location.replace("/mypage")
                }
            }
        })
    }

	return(
		<div>
		<Container style={{padding: '0px'}}>
		<div>
		<img src={ require('./image/minting.png') } style = {{width:'100%', height:'100%', alt:"mainlogo", marginBottom: "20px", textAlign: 'center'}} />
		<img src={ require('./image/mintingins.png') } style = {{width:'100%', height:'100%', alt:"mainlogo", marginBottom: "20px", textAlign: 'center'}}/>
		</div>
		</Container>
			{/*<h2> Upload file </h2>*/}
			<div style = {{marginRight: '60px'}}>
				{/* <form>
					<input type='file'></input>
				</form> */}
				<Button style={{backgroundColor:'#feb546', border: '3px solid whitesmoke'}}onClick={(event) =>{
					event.preventDefault()
					mint()
				}}>Mint!</Button>
				<h2>{message}</h2>
			</div>
		</div>
	);
}

export default Minting;
