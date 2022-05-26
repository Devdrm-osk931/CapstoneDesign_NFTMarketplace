import './App.css';
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { renderMatches, useParams } from 'react-router-dom'

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
		if(props.account === ownerAddress)
				alert("token owner can't buy");

		else if (window.confirm("confirm on buy")) {

			if(!props.ApprovalState)
				alert("approveState is false");
			else
				alert("buy");
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
