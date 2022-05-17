import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom'

function Minting(){
	return(
		<div>
			<h2> Upload file </h2>
			<div>
				<form>
					<input type='file'></input>
				</form>
			</div>
		</div>
	);
}

export default Minting;
