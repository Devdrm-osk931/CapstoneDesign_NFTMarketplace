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

	return (
		<div className ='Mypage'>
			<div className='profile'>
				{<p> account : {props.account} </p>}
				<h4> My Page </h4>
			</div>
			<div className='Mypage__button'>
				<Button variant="outline-warning" onClick= {(event) => {
					event.preventDefault()
					check_array()
					}}>All</Button>
				{' '}
				<Button variant="outline-warning" onClick={Onsale}>On Sale</Button>
				<br></br>
				<br></br>
			</div>
			<div>
			<DisplayJackets array = {my_array} type = {props.type}/>
			</div>
		</div>
	);
}

export default Mypage;
