import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import DisplayJackets from './DisplayJackets';

function Mypage(props) {
	const [mode, setmode] = useState('MyPageAll');
	const [my_array, set_array] = useState([])
	const minted_jackets = props.array;


	const getMyJackets = async() => {
		const myJackets = []
		for(let i = 0; i < minted_jackets.length; i ++ ) {
			// id, owner_address, price
			myJackets.push([Number(minted_jackets[i][0]), minted_jackets[i][1], Number(minted_jackets[i][2])]);
		}
		set_array(myJackets);
		setmode('MyPageAll');
	}


	const onSaleById = async() => {
		const myJackets = props.array;
		const mySaleJackets =[];
		const sortedJackets =[];

		for (let i = 0;i<myJackets.length;i++){
			if(myJackets[i][2] != 0){
				mySaleJackets.push([Number(myJackets[i][0]), myJackets[i][1], Number(myJackets[i][2])]);
			}
		}

		const test =[...mySaleJackets].sort(function(a,b){
			return a[0] - b[0];
		});

		for(let i = 0; i<mySaleJackets.length; i++){
			sortedJackets.push([Number(test[i][0]), test[i][1], Number(test[i][2])]);
		}

		set_array(sortedJackets);
		setmode('MyPageSale');
	}

	const onSaleByPrice = async() => {
		const myJackets = props.array;
		const mySaleJackets =[];
		const sortedJackets =[];

		for (let i = 0; i< myJackets.length; i++){
			if(myJackets[i][2] != 0){
				mySaleJackets.push([Number(myJackets[i][0]), myJackets[i][1], Number(myJackets[i][2])]);
			}
		}

		const test =[...mySaleJackets].sort(function(a,b){
			return a[2] - b[2];
		});

		for(let i = 0; i<mySaleJackets.length; i++){
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

	useEffect(getMyJackets,[props.array]);


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
					<img src="/profile2.png" alt="profile-user-img" class="profile-user-img-img"/>
				</div>
				<br/>
				<h1>Account</h1>
				<h5>{props.account} </h5>
			</Container>

			<Container style={{marginBottom : '20px' , border : '1px solid #d9d9d9', padding: '0px'}}>
				<br/>
				<h4>My NFTs</h4>
				<div className='Mypage__button'>				
					
					<div className="setmid">
						<div className="set mid col-xs-12">
							<Container>
								<Row xs ={1} md={2}>
									<Col></Col>
									
									<Col>
										<div style = {{textAlign: 'right'}}>
											<Dropdown style ={{display: 'inline'}}>
												<Dropdown.Toggle variant="outline-warning" id="dropdown-basic" style ={{display: 'inline'}}>
													All
												</Dropdown.Toggle>

												<Dropdown.Menu>
													<Dropdown.Item onClick= {getMyJackets}>민팅순</Dropdown.Item>
													<Dropdown.Item onClick= {allById}>ID순</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
									
											{' '}
							
											<Dropdown style ={{display: 'inline'}}>
												<Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
													On Sale
												</Dropdown.Toggle>

												<Dropdown.Menu>
													<Dropdown.Item onClick= {onSaleById}>ID순</Dropdown.Item>
													<Dropdown.Item onClick= {onSaleByPrice}>가격순</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</Col>
								</Row>
							</Container>
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
