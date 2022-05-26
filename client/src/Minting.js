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
	const [tot, settot] = useState(0);

	const mint = () => {
		props.contract.methods.mint().send({ from: props.account })
		.once('receipt', (receipt) => {
			setmessage('minting success')
			window.location.reload()
		})
	}

	const supply = async () => {
		const temp = await props.contract.methods.totalSupply().call();
		settot(temp);
	}
	return(
		<div>
			<h2> Upload file </h2>
			<div>
				{/* <form>
					<input type='file'></input>
				</form> */}
				<Button onClick={(event) =>{
					event.preventDefault()
					mint()
				}}>Mint!</Button>
				<h2>{message}</h2>

				<Button onClick = {(event) => {
					event.preventDefault()
					supply()
				}}>Check Total</Button>
				<h2>{tot}</h2>
			</div>
		</div>
	);
}

export default Minting;
