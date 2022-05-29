import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import OnSale from "./OnSale";
import Web3 from 'web3';


function DisplaySaleJackets(props) {

    const ClickBuy = async(id) => {
        console.log(typeof id);
		const ownerAddress = await props.contract.methods.ownerOf(Number(id[0])).call();
		// const myAddress = props.account;
		// const price = await props.contract.methods.nftTokenPrices(id).call();
        const price = String(id[1])
        console.log("price: ", price);
		const weiPrice = Web3.utils.toWei(price);
		const isApproved = await props.contract.methods.isApprovedForAll(ownerAddress, props.contractAddress).call();
		// console.log(isApproved);
		// console.log("Owner: ", ownerAddress);
		// console.log("Contract: ", props.contractAddress);
		// console.log(typeof price);
		// console.log(typeof weiPrice);
		if(props.account === ownerAddress)
				alert("token owner can't buy");

		else if (window.confirm("confirm on buy")) {

			// if(!props.ApprovalState)
			if(!isApproved)
				alert("approveState is false");
			else
				alert("buy");
				try {
					const response = await props.contract.methods.buyNftToken(id[0]).send({ from: props.account, value: weiPrice });

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
        <div className="component-spacing">
            {/* <h2>On Sale NFTs</h2> */}
            <br/>
            <div className="setmid">
            <div className="set mid col-md-12">

            {/* 작동 BUT 비효율 */}
            <Container fluid>
                <Row xs={1} md={4}>
                {props.array.map(index => {
                return (
                <Col>
                <a href={'./detail/' + index[0]}><OnSale index = {index[0]} src = {index[0].toString() + ".png"}/></a>
                <br/>
                <h5>#{index[0]} NFT</h5>
                <p>{index[1]} ETH</p>
                <Button variant="outline-warning" href={'./detail/' + index}>Detail</Button>{' '}<Button variant="outline-warning" onClick={(event) =>
				{
					event.preventDefault()
					ClickBuy(index);
					}}>Buy</Button><br/><br/>
                </Col>)
                })}
                </Row>
            </Container>

            </div>
            </div>
        </div>
    )
}

export default DisplaySaleJackets;
