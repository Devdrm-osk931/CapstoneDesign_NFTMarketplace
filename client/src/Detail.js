import './App.css';
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { renderMatches, useParams } from 'react-router-dom'
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import Mypage from './Mypage';

// axios.get(https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/40.json,[,config])
// .then((Response)=>{console.log(Response.data)})
//   .catch((Error)=>{console.log(Error)})

function Detail(props) {

	const {id}=useParams();

	const nft_sell = async() =>{
		var test = await props.contract.methods.setSaleNftToken(id, "12").send({from: props.account, gas:300000});
		var array = await props.contract.methods.getSaleNftTokens().call();
		console.log(array);
	}

	const clickBuy = async() => {
		const ownerAddress = await props.contract.methods.ownerOf(id).call();
		const myAddress = props.account;
		const price = await props.contract.methods.nftTokenPrices(id).call();
		const weiPrice = Web3.utils.toWei(price);
		const isApproved = await props.contract.methods.isApprovedForAll(ownerAddress, props.contractAddress).call();
		console.log(isApproved);
		console.log(props.ApprovalState);
		console.log("Owner: ", ownerAddress);
		console.log("Contract: ", props.contractAddress);
		console.log(price);
		console.log(weiPrice);
		if(props.account === ownerAddress)
				alert("token owner can't buy");

		else if (window.confirm("confirm on buy")) {

			// if(!props.ApprovalState)
			if(!isApproved)
				alert("approveState is false");
			else
				alert("buy");
				try {
					const response = await props.contract.methods.buyNftToken(id).send({ from: props.account, value: weiPrice });

					if(response.status) {
						window.location.replace("/mypage");
					}
				} catch(err) {
					console.log(err);
					throw err;
				}
		}
		else {
		  alert("Cancel");
		}
	  };

	return (
    <div className="Detail">
		<div id ="section__image" style ={{float: "left", width: "50%", margin: "20px"}}>
			  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>
		  </div>

		<div id = "etc" style ={{float: "right", width: "45%", marginTop: "60px"}}>
			<div></div>
			<h1 id="title">Only One Ones # {id}</h1>
			<div id="price"><h4><br></br>Price if sold out text color is red<br/><br></br></h4> </div>

			<Button onClick={clickBuy} variant="outline-warning" className='detail__button'> buy </Button>
			<p id="nft description">
				<br></br>
				<br></br>
				<br></br>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
			<Button variant ="outline-warning" onClick = {nft_sell}>sell</Button>
		</div>
    </div>
  	);
}

export default Detail;
