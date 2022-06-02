import './App.css';
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { renderMatches, useParams } from 'react-router-dom'
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import Mypage from './Mypage';
import Modal from "./Modal";
import axios from 'axios';

// axios.get(https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/40.json,[,config])
// .then((Response)=>{console.log(Response.data)})
//   .catch((Error)=>{console.log(Error)})

function Detail(props) {

	const {id}=useParams();

	function DetailButton () {
		console.log("owner",typeof(owner), owner);
		console.log("props.account",typeof(props.account),props.account);
		if(owner === props.account)
		{
			return(
				<Button variant="outline-warning" disabled>Owner</Button>
			)
		}
		else
		return(
			<Button onClick={clickBuy} variant="outline-warning">Buy</Button>
		)

	}

	function SellButton() {
		console.log(props.ApprovalState);
		if (price == 0 && props.ApprovalState) {
			return (
				<Button className = "Detail" variant ="outline-warning" onClick={openModal} >Sell</Button>
			)
		}else if(price == 0 & !props.ApprovalState) {
			return (
				<Button className = "Detail" variant ="outline-warning" onClick={() => {
					alert("�뙋留� 沅뚰븳�씠 �뾾�뼱�슂!")
				}} >Sell</Button>
			)
		}
		else {
			return(
				<Button className = "Detail" variant ="outline-warning" disabled>Sell</Button>
			)
		}
	}

	function EditButton() {
		// �뙋留ㅼ쨷�씠吏� �븡��� 寃쎌슦
		if (price == 0 || owner != props.account) {
			return(
					<Button className = "Detail" variant = "outline-warning" disabled>Edit</Button>
			)
		}else {
			return(
					<Button className = "Detail" variant ="outline-warning" onClick={openModal2} >Edit</Button>
			)
		}
	}

	function RemoveButton() {
		if (price == 0 || owner != props.account) {
			return(<Button variant = "outline-warning" disabled>Remove</Button>)
		}else{
			return(
				<Button variant ="outline-warning" onClick = {nft_remove}>Remove</Button>
			)
		}
	}

	function ShowPrice() {
		if (price == 0) {
			return(
				<div id="price"><h4><br></br>Not On Sale �윑�<br/><br></br></h4> </div>
			)
		}else {
			return(
				<div id="price"><h4><br></br>{price} ETH<br/><br></br></h4> </div>
			)
		}
	}

	const nft_sell = async() =>{
		var test = await props.contract.methods.setSaleNftToken(id, text).send({from: props.account, gas:300000});
		var array = await props.contract.methods.getSaleNftTokens().call();
		console.log(array);
		window.location.replace("/mypage")
	}

	const getStatus = async() => {
		const tempOwner = await props.contract.methods.ownerOf(id).call();
		console.log("getowner",owner,typeof(owner));
		const price = await props.contract.methods.getNftTokenPrice(id).call();
		setPrice(price);
		setOwner(tempOwner);
		console.log(owner);
	}
	useEffect(getStatus, [props.contract]);

	const getinformation =async()=>{
		await axios.get('https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/'+id+'.json')
		.then((Response)=>{
			// console.log(Response.data);
			// console.log(typeof(Response.data));
			console.log(Response.data.attributes)
			console.log(typeof(Response.data.attributes))
			console.log(typeof(Object.entries(Response.data.attributes)))
			setInformation(Response.data.attributes);
			// console.log("information",information)

			Response.data.attributes.map((info)=>{
				console.log(info.trait_type,":", info.value)})
		})
		.catch((Error)=>{console.log(Error)})
	}
	const [information, setInformation]=useState();

	function PrintAttribute() {

		console.log("information",information);
		console.log("information type",typeof(information));
		// console.log(JSON.stringify(information['1']));
		return(
			<div>
			{}
			</div>
		);
	}

	useEffect(getinformation,[]);

	const [modalOpen, setModalOpen] = useState(false);
	const [edit_modal_open, set_edit_Modal_open] = useState(false);
	const [price, setPrice] = useState(0);
	const [owner, setOwner] = useState();

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
		setPrice(text);
		window.location.replace('/');
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
			{/* <div id="price"><h4><br></br>{price} ETH<br/><br></br></h4> </div> */}
			<ShowPrice/>

			<h4>O.O.O. project description</h4>
			<p id="nft description">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
			<br></br>
				<br></br>
				<br></br>
				<PrintAttribute></PrintAttribute>
			{/* <Button variant ="outline-warning" onClick = {nft_change_price}>change_price</Button> */}
			{/* <Button onClick={clickBuy} variant="outline-warning" className='detail__button'> Buy </Button>{' '} */}
			<DetailButton/>{' '}


			<React.Fragment>
      	{/* <Button className = "Detail" variant ="outline-warning" onClick={openModal} >Sell</Button>{' '} */}
		  <SellButton/>{' '}
		<Modal open={modalOpen} close={closeModal} header="�뙋留� �젙蹂� �벑濡�">

	  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>

		<input onChange={onChange} value = {text} placeholder = "媛�寃� �엯�젰"/>

		<Button variant ="outline-warning" onClick = {nft_sell} >�벑濡�</Button>
      </Modal>
    </React.Fragment>

	<React.Fragment>
      {/* <Button className = "Detail" variant ="outline-warning" onClick={openModal2} >Edit</Button>{' '} */}
	  <EditButton/>{' '}
		<Modal open={edit_modal_open} close={closeModal2} header="�뙋留� 媛�寃� 蹂�寃�">

	  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>

		<input onChange={onChange} value = {text} placeholder = "媛�寃� �엯�젰"/>

		<Button variant ="outline-warning" onClick = {nft_change_price} >媛�寃� 蹂�寃�</Button>
      </Modal>
    </React.Fragment>
	{/* <Button variant ="outline-warning" onClick = {nft_remove}>Remove</Button>{' '} */}
	<RemoveButton/>

		</div>
    </div>
  	);
}

export default Detail;
