import '../App.css';
import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import Web3 from 'web3';
import Modal from "./Modal";
import axios from 'axios';
import { ReactComponent as ETH } from './image/ethereum-brands.svg';

function Detail(props) {

	const {id}=useParams();

	function DetailButton () {
		if(owner === props.account)
		{
			return(
				<></>
			)
		}
		return(
			<Button onClick={clickBuy} variant="outline-warning">Buy</Button>
		)
	}

	function SellButton() {
		if (price == 0 && props.ApprovalState) {
			return (
				<Button className = "Detail" variant ="outline-warning" onClick={openSellModal} >Sell</Button>
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
				<></>
			)
		}
	}

	function EditButton() {
		// 판매중이지 않은 경우
		if (price == 0 || owner != props.account) {
			return(
					<></>
			)
		}else {
			return(
					<Button className = "Detail" variant ="outline-warning" onClick={openEditModal} >Edit</Button>
			)
		}
	}

	function RemoveButton() {
		if (price == 0 || owner != props.account) {
			return(
			<></>
			)
		}else{
			return(
				<Button variant ="outline-warning" onClick = {nft_remove}>Cancel</Button>
			)
		}
	}

	function ShowPrice() {
		if (price == 0) {
			return(
				<div id="price"><h4><br></br>Not On Sale 😖</h4><hr/> </div>
			)
		}else {
			return(
				<div id="price"><h4><br></br>price : {price} <ETH style ={{height:'18px'}}/></h4><hr/> </div>
			)
		}
	}

	const nft_sell = async() =>{

		if(parseFloat(text) > 0 && !text.includes(".")){
			await props.contract.methods.setSaleNftToken(id, text).send({from: props.account});
			window.location.replace("/mypage")
		}

		else{
			alert("1 이상의 정수를 입력하세요.");
		}

	}

	const nft_change_price=async()=>{
		if(parseFloat(text) > 0 && !text.includes(".")){
		await props.contract.methods.changePrice(id, text).send({from: props.account});
		setPrice(text);
		window.location.replace('/');
		}
		else{
			alert("1 이상의 정수를 입력하세요.")
		}

	}

	const getStatus = async() => {
		const tempOwner = await props.contract.methods.ownerOf(id).call();
		const price = await props.contract.methods.getNftTokenPrice(id).call();
		setPrice(price);
		setOwner(tempOwner);
	}
	useEffect(getStatus, [props.contract]);


	const getinformation =async()=>{
		await axios.get('https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/'+id+'.json')
		.then((Response)=>{
			setInformation(Response.data.attributes);
		})
		.catch((Error)=>{console.log(Error)})
	}
	const [information, setInformation]=useState();


	function PrintJacket() {
		let percent;
		if(information && Object.keys(information).length > 1)
			percent = '10%';
		return(
			<>
			{
				(information && Object.keys(information).length > 1) &&
				<>
					<Card className = "card border-warning border-2">
						<Card.Body>
						<Card.Title className = "text-warning">{information[1].trait_type} </Card.Title>
						<Card.Text className = "card__test">
							<b> {information[1].value}   </b>
						</Card.Text>
						<Card.Subtitle className="mb-2 text-muted card__subtitle">
						{percent} have this trait
						</Card.Subtitle >
						</Card.Body>
					</Card>
				</>
			}
			</>
		);
	}


	function PrintLogo() {
		let percent;
		if(information && Object.keys(information).length > 2){
			percent =  information[2].value == ('Lotus_Black' || 'Lotus_White') ? '5%' :  '22.5%';
		}
		return(
			<div>
			{
				(information && Object.keys(information).length > 2) &&
				<div>
					<Card className = "card border-warning border-2">
						<Card.Body>
						<Card.Title className = "text-warning">{information[2].trait_type} </Card.Title>
						<Card.Text className = "card__test">
							<b> {information[2].value}   </b>
						</Card.Text>
						<Card.Subtitle className="mb-2 text-muted card__subtitle">
						{percent} have this trait
						</Card.Subtitle >
						</Card.Body>
					</Card>
				</div>
			}
			</div>
		);
	}


	function PrintCollege() {
		let percent;
		if(information && Object.keys(information).length > 3)
			percent = '25%';
		return(
			<div>
			{
				(information && Object.keys(information).length > 3) &&
				<div>
					<Card className = "card border-warning border-2">
						<Card.Body>
						<Card.Title className = "text-warning">{information[3].trait_type} </Card.Title>
						<Card.Text className = "card__test">
							<b> {information[3].value}   </b>
						</Card.Text>
						<Card.Subtitle className="mb-2 text-muted card__subtitle">
						{percent} have this trait
						</Card.Subtitle >
						</Card.Body>
					</Card>
				</div>
			}
			</div>
		);
	}


	function PrintStudent_ID() {
		let percent;
		if(information && Object.keys(information).length > 4){
			percent = information[4].value == ('17' || '19') ? '33%' :'34%';
		}
		return(
			<div>
			{
				(information && Object.keys(information).length > 4) &&
				<div>
					<Card className = "card border-warning border-2">
						<Card.Body>
						<Card.Title className = "text-warning">{information[4].trait_type} </Card.Title>
						<Card.Text className = "card__test">
							<b> {information[4].value}   </b>
						</Card.Text>
						<Card.Subtitle className="mb-2 text-muted card__subtitle">
						{percent} have this trait
						</Card.Subtitle >
						</Card.Body>
					</Card>
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

	const openSellModal = () =>{
		setModalOpen(true);
	}

	const closeSellModal = () =>{
		setModalOpen(false);
	}

	const openEditModal = () =>{
		set_edit_Modal_open(true);
	}

	const closeEditModal = () =>{
		set_edit_Modal_open(false);
	}

	const [text, setText] = useState('');

	const onChange = (event) => {
		setText(event.target.value);
	}



	const nft_remove=async()=>{

		let test1 = await props.contract.methods.removeToken(id).send({from: props.account, gas:300000});
		var array2 = await props.contract.methods.getSaleNftTokens().call();
		console.log(array2);
		window.location.replace("/");
	}

	const clickBuy = async() => {
		const ownerAddress = await props.contract.methods.ownerOf(id).call();
		const price = await props.contract.methods.nftTokenPrices(id).call();
		const weiPrice = Web3.utils.toWei(price);

		if(props.account === ownerAddress)
			alert("해당 NFT의 소유자입니다!");

		else if (window.confirm("정말 구매 하시겠습니까?")) {
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
		  alert("거래를 취소하셨습니다.");
		}
	  };

	return (
    <div className="Detail">
	<Container>
		<div className='Detail__contents'>
			<div id ="section__image" style ={{width : '60%', marginTop: '60px'}}>
				<img className= "detail__image" src = {"https://soksak.mypinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/" + id + ".png"}/>
			</div>

			<div id = "etc" style ={{width : '30%', marginTop: "60px"}}>
				<h1 id="title">Only One Ones # {id}</h1>
				<ShowPrice/>
				<h3>O.O.O. project description</h3>
				<div id="nft description">
						<p><i>NFT collection of College Jumpers</i></p>
						<p><i>Made By SOKSAK</i></p>
						<p><i>All Rights Reserved</i></p>
				</div>

				<hr/>
				<h3 className='properties'>Properties </h3>

				<div class="row row-cols-1 row-cols-md-2 g-4 mt-1 mb-1">
					<div class="col"><PrintJacket/></div>
					<div class="col"><PrintLogo/></div>
					<div class="col"><PrintCollege/></div>
					<div class="col"><PrintStudent_ID/></div>
				</div>

				<div className= "Detail__button">
					<DetailButton/>
					<React.Fragment>
						<SellButton/>{' '}
						<Modal open={modalOpen} close={closeSellModal} header="판매 정보 등록">
							<img className = "detail__image" src = {"https://soksak.mypinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/" + id + ".png"}/>
							<input onChange={onChange} value = {text} placeholder = "가격 입력"/>
							<Button variant ="outline-warning" onClick = {nft_sell} >등록</Button>
						</Modal>
					</React.Fragment>

					<React.Fragment>
						<EditButton/>{' '}
						<Modal open={edit_modal_open} close={closeEditModal} header="판매 가격 변경">
							<img className = "detail__image" src = {"https://soksak.mypinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/" + id + ".png"}/>
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
