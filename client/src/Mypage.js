import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import DisplayJackets from './DisplayJackets';

function Mypage(props) {
	return (
		<div className ='Mypage'>
			<div className='profile'>
				{/* <h4> account : {props.account} </h4> */}
				<h4> My Page </h4>
			</div>
			<div className='Mypage__button'>
				<Button variant="outline-warning">All</Button>
				{' '}
				<Button variant="outline-warning">On Sale</Button>
				<br></br>
				<br></br>
			</div>
			<div>
			<DisplayJackets array = {props.array} />
			</div>
		</div>
	);
}

export default Mypage;
