import './App.css';
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { renderMatches, useParams } from 'react-router-dom'
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import Mypage from './Mypage';
import Modal from "./Modal";

// axios.get(https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/40.json,[,config])
// .then((Response)=>{console.log(Response.data)})
//   .catch((Error)=>{console.log(Error)})

function Detail(props) {

	const {id}=useParams();

	const nft_sell = async() =>{
		var test = await props.contract.methods.setSaleNftToken(id, text).send({from: props.account, gas:300000});
		var array = await props.contract.methods.getSaleNftTokens().call();
		console.log(array);
		window.location.replace("/mypage")
	}

	const getPrice = async() => {
		const price = await props.contract.methods.getNftTokenPrice(id).call();
		setPrice(price);
	}
	useEffect(getPrice, []);

	const [modalOpen, setModalOpen] = useState(false);
	const [edit_modal_open, set_edit_Modal_open] = useState(false);
	const [price, setPrice] = useState(0);

	const openModal = () =>{
		setModalOpen(true);
	}

	const closeModal = () =>{
		setModalOpen(false);
	}

	const openModal2 = () =>{
		set_edit_Modal_open(true);
	}

	const closeModal2 = () =>{
		set_edit_Modal_open(false);
	}

	const [text, setText] = useState('');

	const onChange = (event) => {
		setText(event.target.value);
	}

	const nft_change_price=async()=>{

		var array2 = await props.contract.methods.getSaleNftTokens().call();
		console.log('first array',array2);

		let test = await props.contract.methods.changePrice(id, text).send({from: props.account, gas:300000});
		var array = await props.contract.methods.getSaleNftTokens().call();
		console.log(array);
	}

	const nft_remove=async()=>{

		let test1 = await props.contract.methods.removeToken(id).send({from: props.account, gas:300000});
		var array2 = await props.contract.methods.getSaleNftTokens().call();
		console.log(array2);
		window.location.replace("/");
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
			<div id="price"><h4><br></br>{price} ETH<br/><br></br></h4> </div>

			<h4>O.O.O. project description</h4>
			<p id="nft description">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
			<br></br>
				<br></br>
				<br></br>
			{/* <Button variant ="outline-warning" onClick = {nft_change_price}>change_price</Button> */}
			<Button onClick={clickBuy} variant="outline-warning" className='detail__button'> Buy </Button>{' '}
			<Button variant ="outline-warning" onClick = {nft_remove}>Remove</Button>{' '}

			<React.Fragment>
      <Button className = "Detail" variant ="outline-warning" onClick={openModal} >Sell</Button>{' '}
		<Modal open={modalOpen} close={closeModal} header="판매 정보 등록">

	  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>

		<input onChange={onChange} value = {text} placeholder = "가격 입력"/>

		<Button variant ="outline-warning" onClick = {nft_sell} >등록</Button>
      </Modal>
    </React.Fragment>

	<React.Fragment>
      <Button className = "Detail" variant ="outline-warning" onClick={openModal2} >Edit</Button>
		<Modal open={edit_modal_open} close={closeModal2} header="판매 가격 변경">

	  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>

		<input onChange={onChange} value = {text} placeholder = "가격 입력"/>

		<Button variant ="outline-warning" onClick = {nft_change_price} >가격 변경</Button>
      </Modal>
    </React.Fragment>


		</div>
    </div>
  	);
}

export default Detail;
