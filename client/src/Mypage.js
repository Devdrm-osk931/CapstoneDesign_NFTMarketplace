import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayJackets from './DisplayJackets';

function Mypage(props) {
	const [mode, setmode] = useState('MyPageAll');

	const check_array = async () =>{
		const totalSupply = await props.contract.methods.totalSupply().call();
		const tot =[];
    	for(let i = 1; i <= totalSupply; i++){
      		tot.push(i);
    	}
		const arr=[]
		for(let tokenId of tot){
			const tokenOwner = await props.contract.methods.ownerOf(tokenId).call();
			if(String(tokenOwner) === String(props.account)){
//   const tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
				arr.push(tokenId);
			}
		  }
		set_array(arr);
	}


	const Onsale = async() =>{

    const tempnftListArray = await props.contract.methods.getSaleNftTokens().call();
    const onsale = [];

    for(let i = 0; i < tempnftListArray.length;i++){
	    //_nftTokenURI = tempnftListArray[i].nftTokenURI;
	    //_price = tempnftListArray[i].price;
      //nftArray.push(Number(tempnftListArray[i].nftTokenId));
	  const _nftTokenId = Number(tempnftListArray[i].nftTokenId);
	  const tokenOwner = await props.contract.methods.ownerOf(_nftTokenId).call();
	  if(String(tokenOwner) === String(props.account)){
		//   const tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
			onsale.push(_nftTokenId);
		}
    }
    console.log(onsale);
    set_array(onsale)
	  }

	// 내 소유의 NFT 정보를 가져온 뒤 my_array로 setting 한다
	const getMyJackets = async () => {
		const temp = await props.contract.methods.getNftTokens(props.account).call()
		console.log(temp);
		const myJackets = []
		for(let i = 0; i < temp.length; i ++ ) {
			// id, owner_address, price
			myJackets.push([Number(temp[i][0]), temp[i][1], Number(temp[i][3])]);
		}
		set_array(myJackets);
		setmode('MyPageAll');
		console.log(my_array);
	}

	// 내 소유의 NFT 중 현재 판매중인 NFT를 my_array로 setting한다
	const getMySaleJackets = async() => {
		// id, owner, uri, price
		const temp = await props.contract.methods.getSaleNftTokens().call();
		const mySaleJackets = [];

		for (let i = 0; i < temp.length; i++) {
			// 현재 계정과 토큰의 주인이 같은 경우 배열에 넣어준다
			if(temp[i][1] == props.account) {
				mySaleJackets.push([Number(temp[i][0]), temp[i][1], Number(temp[i][3])]);
			}
		}
		set_array(mySaleJackets);
		setmode('MyPageSale');
		console.log(my_array);

	}


	useEffect(getMyJackets,[]);


	const [my_array, set_array] = useState([])
	const gateway = "https://gateway.pinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/";


	return (
		<div className ='Mypage'>
			<Container style={{padding: '0px'}}>
				<div>
					<img src={ require('./image/mypage.png') } width='100%' height='100%' alt="mainlogo" margin-bottom= "20px"/>
				</div>
			</Container>

			<Container fluid>
				<Col>
					<h1>   </h1>
					<h1>   </h1>
				</Col>
			</Container>

			<Container style={{marginBottom : '20px' , border : '1px solid #d9d9d9', padding: '20px' , background: '#f7f7f7'}}>
				<div class = "profile-user-img">
					<img src={ require('./image/profile.png') } alt="profile-user-img" class="profile-user-img-img"/>
				</div>
				<br/>
				<h1>User1</h1>
				<h5>Connected account : {props.account} </h5>
			</Container>

			<Container style={{marginBottom : '20px' , border : '1px solid #d9d9d9', padding: '0px' }}>
				<br/>
				<h4>My NFTs</h4>
				<div className='Mypage__button'>
						<Button variant="outline-warning" onClick= {(event) => {
						event.preventDefault()
						// check_array()
						getMyJackets();
	 					}}>All</Button>
						{' '}
						<Button variant="outline-warning" onClick={getMySaleJackets}>On Sale</Button>
				</div>
				<div>
					<DisplayJackets array = {my_array} account = {props.account} contract={props.contract} contractAddress = {props.contractAddress} type = {mode} />
				</div>
			</Container>

		</div>
	);
}

export default Mypage;
