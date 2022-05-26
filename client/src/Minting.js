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
		.once('receipt', (receipt) => {
			window.location.replace("/mypage")
			setmessage('minting success')
		})
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
			</div>
		</div>
	);
}

export default Minting;
