import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import DisplayJackets from './DisplayJackets';

function Mypage(props) {
	const [mode, setmode] = useState('MyPageAll');
	const [my_array, set_array] = useState([])


	const minted_jackets = props.array;

// 	const check_array = async () =>{
// 		const totalSupply = await props.contract.methods.totalSupply().call();
// 		const tot =[];
//     	for(let i = 1; i <= totalSupply; i++){
//       		tot.push(i);
//     	}
// 		const arr=[]
// 		for(let tokenId of tot){
// 			const tokenOwner = await props.contract.methods.ownerOf(tokenId).call();
// 			if(String(tokenOwner) === String(props.account)){
// //   const tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
// 				arr.push(tokenId);
// 			}
// 		  }
// 		set_array(arr);
// 	}


// 	const Onsale = async() =>{

//     const tempnftListArray = await props.contract.methods.getSaleNftTokens().call();
//     const onsale = [];

//     for(let i = 0; i < tempnftListArray.length;i++){
// 	    //_nftTokenURI = tempnftListArray[i].nftTokenURI;
// 	    //_price = tempnftListArray[i].price;
//       //nftArray.push(Number(tempnftListArray[i].nftTokenId));
// 	  const _nftTokenId = Number(tempnftListArray[i].nftTokenId);
// 	  const tokenOwner = await props.contract.methods.ownerOf(_nftTokenId).call();
// 	  if(String(tokenOwner) === String(props.account)){
// 		//   const tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
// 			onsale.push(_nftTokenId);
// 		}
//     }
//     console.log(onsale);
//     set_array(onsale)
// 	  }
	// 내 소유의 NFT 정보를 가져온 뒤 my_array로 setting 한다
	// const getMyJackets = async () => {
	// 	const temp = await props.contract.methods.getNftTokens(props.account).call()
	// 	console.log(temp);
	// 	const myJackets = []
	// 	for(let i = 0; i < temp.length; i ++ ) {
	// 		// id, owner_address, price
	// 		myJackets.push([Number(temp[i][0]), temp[i][1], Number(temp[i][3])]);
	// 	}
	// 	set_array(myJackets);
	// 	setmode('MyPageAll');
	// 	console.log(my_array);
	// }

	// // 내 소유의 NFT 중 현재 판매중인 NFT를 my_array로 setting한다
	// const getMySaleJackets = async() => {
	// 	// id, owner, uri, price
	// 	const temp = await props.contract.methods.getSaleNftTokens().call();
	// 	const mySaleJackets = [];

	// 	for (let i = 0; i < temp.length; i++) {
	// 		// 현재 계정과 토큰의 주인이 같은 경우 배열에 넣어준다
	// 		if(temp[i][1] == props.account) {
	// 			mySaleJackets.push([Number(temp[i][0]), temp[i][1], Number(temp[i][3])]);
	// 		}
	// 	}
	// 	set_array(mySaleJackets);
	// 	setmode('MyPageSale');
	// 	console.log(my_array);

	// }


	// useEffect(getMyJackets,[]);


	//내 소유의 NFT 정보를 가져온 뒤 my_array로 setting 한다

	const getMyJackets = async() => {
		const myJackets = []
		for(let i = 0; i < minted_jackets.length; i ++ ) {
			// id, owner_address, price
			myJackets.push([Number(minted_jackets[i][0]), minted_jackets[i][1], Number(minted_jackets[i][2])]);
			console.log(myJackets[i]);
		}
		console.log("myJackets:", myJackets);
		set_array(myJackets);
		setmode('MyPageAll');
		console.log("All:", my_array);
	}

	// 내 소유의 NFT 중 현재 판매중인 NFT를 my_array로 setting한다

	const getMySaleJackets = async() => {
		// id, owner, uri, price
		const myJackets = props.array;
		const mySaleJackets = []

		for (let i = 0; i < myJackets.length; i++) {
			// 현재 계정과 토큰의 주인이 같은 경우 배열에 넣어준다
			if(myJackets[i][2] != 0) {
				mySaleJackets.push([Number(myJackets[i][0]), myJackets[i][1], Number(myJackets[i][2])]);
			}
		}
		set_array(mySaleJackets);
		setmode('MyPageSale');
		console.log("Sale", my_array);

	}

	const OnSaleById = async() => {
		const myJackets = props.array;
		const mySaleJackets =[];
		const sortedJackets =[];
		for (let i = 0;i<myJackets.length;i++){
			if(myJackets[i][2] != 0){
				mySaleJackets.push([Number(myJackets[i][0]), myJackets[i][1], Number(myJackets[i][2])]);
			}
		}

		const test =[...myJackets].sort(function(a,b){
			return a[0] - b[0];
		});

		for(let i = 0;i<mySaleJackets.length;i++){
			sortedJackets.push([Number(test[i][0]), test[i][1], Number(test[i][2])]);
		}

		set_array(sortedJackets);
		setmode('MyPageSale');
	}

	const onSaleByPrice = async() => {
		const myJackets = props.array;
		const mySaleJackets =[];
		const sortedJackets =[];
		for (let i = 0;i<myJackets.length;i++){
			if(myJackets[i][2] != 0){
				mySaleJackets.push([Number(myJackets[i][0]), myJackets[i][1], Number(myJackets[i][2])]);
			}
		}

		const test =[...myJackets].sort(function(a,b){
			return a[2] - b[2];
		});

		for(let i = 0;i<mySaleJackets.length;i++){
			sortedJackets.push([Number(test[i][0]), test[i][1], Number(test[i][2])]);
		}

		set_array(sortedJackets);
		setmode('MyPageSale');
	}


	const allById = async() => {
		const myJackets = props.array;
		const sortedJackets = [];
		const test = [...myJackets].sort(function(a, b){
			return a[0] - b[0];
		});

		for(let i = 0 ; i < myJackets.length; i++){
			sortedJackets.push([Number(test[i][0]), test[i][1], Number(test[i][2])]);
		}
		set_array(sortedJackets);
		setmode('MyPageAll');
	}


	const jacketSort =async() => {
		const myJackets = props.array;
		const sortedJackets = [];
		const test = [...myJackets].sort(function(a, b){
			return a[2] -b[2];
		});

		for(let i = 0 ; i < myJackets.length; i++){
			sortedJackets.push([Number(test[i][0]), test[i][1], Number(test[i][2])]);
		}
		set_array(sortedJackets);
		setmode('MyPageAll');
	}

	useEffect(getMyJackets,[props.array]);




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
					<h7>   </h7>
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
						{/* <Button variant="outline-warning" style = {{marginLeft: '85%'}} onClick= {(event) => {
						event.preventDefault()
						// check_array()
						getMyJackets();
	 					}}>All</Button>
						{' '}
						<Button variant="outline-warning" onClick={getMySaleJackets}>On Sale</Button>{' '} */}
						<div style = {{ width: '100%',float:'left'}}>

							<div style = {{width: '89%'}}>

								<Dropdown>
									<Dropdown.Toggle variant="outline-warning" id="dropdown-basic" style ={{float:'right'}}>
										On Sale
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item onClick= {onSaleByPrice}>가격순</Dropdown.Item>
										<Dropdown.Item onClick= {onSaleById}>ID순</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>

								<Dropdown>
									<Dropdown.Toggle variant="outline-warning" id="dropdown-basic" style ={{marginLeft:'86.7%', float:'left'}}>
										All
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item onClick= {getMyJackets}>등록순</Dropdown.Item>
										<Dropdown.Item onClick= {allById}>ID순</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>

							</div>

						</div>

				</div>

				<div>
					<DisplayJackets array = {my_array} account = {props.account} contract={props.contract} contractAddress = {props.contractAddress} type = {mode} />
				</div>
			</Container>


		</div>
	);
}

export default Mypage;
