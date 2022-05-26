import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayJackets from './DisplayJackets';

function Mypage(props) {

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


	useEffect(check_array,[]);


	const [my_array, set_array] = useState([])
	const gateway = "https://gateway.pinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/";

	// return (
	// 	<div className ='Mypage'>
	// 		<div className='profile'>
	// 			{<p> account : {props.account} </p>}
	// 			<h4> My Page </h4>
	// 		</div>
	// 		<div className='Mypage__button'>
	// 			<Button variant="outline-warning" onClick= {(event) => {
	// 				event.preventDefault()
	// 				check_array()
	// 				}}>All</Button>
	// 			{' '}
	// 			<Button variant="outline-warning" onClick={Onsale}>On Sale</Button>
	// 			<br></br>
	// 			<br></br>
	// 		</div>
	// 		<div>
	// 		<DisplayJackets array = {my_array} type = {props.type}/>
	// 		</div>
	// 	</div>
	// );

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

			<Container style={{marginBottom : '20px' , border : '1px solid #d9d9d9', padding: '20px' }}>
				<h4>My NFTs</h4>
				<div className='Mypage__button'>
						<Button variant="outline-warning" onClick= {(event) => {
						event.preventDefault()
						check_array()
	 					}}>All</Button>
						{' '}
						<Button variant="outline-warning" onClick={Onsale}>On Sale</Button>
				</div>
				<div>
					<DisplayJackets array = {my_array} type = {props.type} />
				</div>
			</Container>

		</div>
	);
}

export default Mypage;
