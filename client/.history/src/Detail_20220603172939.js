import './App.css';
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { renderMatches, useParams } from 'react-router-dom'
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import Mypage from './Mypage';
import Modal from "./Modal";
import axios from 'axios';
import { ReactComponent as ETH } from './image/ethereum-brands.svg';

// axios.get(https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/40.json,[,config])
// .then((Response)=>{console.log(Response.data)})
//   .catch((Error)=>{console.log(Error)})

function Detail(props) {

	const {id}=useParams();

	function DetailButton () {
		console.log("owner",typeof(owner), owner);
		console.log("props.account",typeof(props.account),props.account);
		console.log("image src",imageSrc);
		if(owner === props.account)
		{
			return(
				// <Button variant="outline-warning" disabled>Owner</Button>
				<></>
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
					alert("판매 권한이 없어요!")
				}} >Sell</Button>
			)
		}
		else {
			return(
				// <Button className = "Detail" variant ="outline-warning" disabled>Sell</Button>
				<></>
			)
		}
	}

	function EditButton() {
		// 판매중이지 않은 경우
		if (price == 0 || owner != props.account) {
			return(
					// <Button className = "Detail" variant = "outline-warning" disabled>Edit</Button>
					<></>
			)
		}else {
			return(
					<Button className = "Detail" variant ="outline-warning" onClick={openModal2} >Edit</Button>
			)
		}
	}

	function RemoveButton() {
		if (price == 0 || owner != props.account) {
			return(
			// <Button variant = "outline-warning" disabled>Remove</Button>
			<></>
			)
		}else{
			return(
				<Button variant ="outline-warning" onClick = {nft_remove}>Remove</Button>
			)
		}
	}

	function ShowPrice() {
		if (price == 0) {
			return(
				<div id="price"><h4><br></br>Not On Sale 😖</h4> </div>
			)
		}else {
			return(
				<div id="price"><h4><br></br>price : {price} <ETH style ={{height:'18px'}}/></h4> </div>
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
			// console.log(Response.data.attributes)
			// console.log(typeof(Response.data.attributes))
			setImageSrc(Response.data.image);
			setInformation(Response.data.attributes);
			// console.log("information",information)

			Response.data.attributes.map((info)=>{
				console.log(info.trait_type,":", info.value)})
		})
		.catch((Error)=>{console.log(Error)})
	}
	const [information, setInformation]=useState();
	const [imageSrc, setImageSrc] = useState();

	function PrintJacket() {

		let percent;
		if(information)
			percent = '10%';

		return(
			<div>
			{
				(information && Object.keys(information).length > 1) &&
				<div>
					<hr/>
					<h2>Properties</h2>
					<h4>{information[1].trait_type} : {information[1].value} </h4>
					<p> {percent} have this trait</p>
				</div>
			}
			</div>
		);
	}
	function PrintLogo() {

		let percent;
		if(information){
			percent =  information[2].value == ('Lotus_Black' || 'Lotus_White') ? '5%' :  '22.5%';
		}

		return(
			<div>
			{
				(information && Object.keys(information).length > 2) &&
				<div>
					<h4>{information[2].trait_type} : {information[2].value} </h4>
					<p>{percent}  have this trait</p>
				</div>
			}
			</div>
		);
	}
	function PrintCollege() {

		let percent;
		if(information)
			percent = '25%';

		return(
			<div>
			{
				(information && Object.keys(information).length > 3) &&
				<div>
					<h4>{information[3].trait_type} : {information[3].value} </h4>
					<p>{percent} have this trait</p>
				</div>
			}
			</div>
		);
	}
	function PrintStudent_ID() {

		let percent;
		if(information){
			percent = information[4].value == ('17' || '19') ? '33%' :'34%';
		}

		return(
			<div>
			{
				(information && Object.keys(information).length > 4) &&
				<div>
					<h4>{information[4].trait_type} : {information[4].value} </h4>
					<p>{percent} have this trait</p>
				</div>
			}
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
	<Container>
		<div className='Detail__contents'>
			<div id ="section__image" style ={{width : '70%', marginTop: '60px'}}>
				<img id = "detail__image" src = {imageSrc}/>
			</div>

			<div id = "etc" style ={{marginTop: "60px"}}>

			<div>
			<h1 id="title">Only One Ones # {id}</h1>
					<ShowPrice/>
				<h3>O.O.O. project description</h3>
				<div id="nft description">
					<p><i>NFT collection of College Jumpers</i></p>
					<p><i>Made By SOKSAK</i></p>
					<p><i>All Rights Reserved</i></p>
				</div>
			</div>


			<div>
			<PrintJacket/>
				<PrintLogo/>
				<PrintCollege/>
				<PrintStudent_ID/>
			<DetailButton/>
			<React.Fragment>
		  <SellButton/>{' '}
		<Modal open={modalOpen} close={closeModal} header="판매 정보 등록">

	    <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>

		<input onChange={onChange} value = {text} placeholder = "가격 입력"/>

		<Button variant ="outline-warning" onClick = {nft_sell} >등록</Button>
        </Modal>
        </React.Fragment>

	    <React.Fragment>
      {/* <Button className = "Detail" variant ="outline-warning" onClick={openModal2} >Edit</Button>{' '} */}
	  <EditButton/>{' '}
		<Modal open={edit_modal_open} close={closeModal2} header="판매 가격 변경">

	  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>

		<input onChange={onChange} value = {text} placeholder = "가격 입력"/>

		<Button variant ="outline-warning" onClick = {nft_change_price} >가격 변경</Button>
      </Modal>
      </React.Fragment>
	  <RemoveButton/>
			</div>

			</div>
		</div>
	</Container>
    </div>
  	);
}

export default Detail;
