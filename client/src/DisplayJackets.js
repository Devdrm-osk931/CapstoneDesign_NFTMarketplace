import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import OnSale from "./OnSale";
import Web3 from 'web3';


function DisplayJackets(props) {

    // 특정 토큰(tokenOwner) 와 현재 계정을 비교함
    function ManipulateButton(props) {
        const owner = props.ownerAddress
        const me = props.myAddress
        console.log(owner)
        console.log(me)
        if (props.type == 'Main') {
            if(owner === me) {
                return (
                    <div>
                    <Button variant="outline-warning" href={'./detail/' + props.id}>Detail</Button>{' '}
                    <Button variant="outline-warning" disabled>Owner</Button>
                    </div>
                )
            }else {
                return (
                    <div>
                        <Button variant="outline-warning" href={"./detail/" + props.id}>Detail</Button>{' '}
                        <Button variant="outline-warning" onClick={(event) => {
                            event.preventDefault()
                            ClickBuy(props.unit)
                        }}>Buy</Button>
                    </div>
                )
            }
        }
        else if (props.type == 'MyPageAll') {
            // 가격이 0인 경우
            if (props.price == 0) {
                return(
                    <div>
                        <Button variant="outline-warning" href={"./detail/" + props.id}>Detail</Button>{' '}
                        <Button variant="outline-warning">Sell</Button>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Button variant="outline-warning" href={"./detail/" + props.id}>Detail</Button>{' '}
                        <Button variant="outline-warning">Edit</Button>
                    </div>
                )
            }
        }else if (props.type == 'MyPageSale') {
            return (
                <div>  
                    <Button variant="outline-warning" href={"./detail/" + props.id}>Detail</Button>{' '}
                    <Button variant="outline-warning">Edit</Button>{' '}
                    <Button variant="outline-warning">Cancel</Button>
                </div>
            )
        }
        
    }

    // 토큰 구매하기
    const ClickBuy = async(token_data) => {
        // 특정 토큰id의 주인이 누구인가
		// const ownerAddress = await props.contract.methods.ownerOf(Number(id[0])).call();
        const ownerAddress = token_data[1]
        // 특정 토큰의 가격
        const price = String(token_data[2])
        console.log("price: ", price);
		const weiPrice = Web3.utils.toWei(price);
		const isApproved = await props.contract.methods.isApprovedForAll(ownerAddress, props.contractAddress).call();
		// console.log(isApproved);
		// console.log("Owner: ", ownerAddress);
		// console.log("Contract: ", props.contractAddress);
		// console.log(typeof price);
		// console.log(typeof weiPrice);
        // 현재 접속 주소와 토큰의 주인이 동일한 경우
		if(props.account === ownerAddress)
				alert("token owner can't buy");

		else if (window.confirm("confirm on buy")) {
			// if(!props.ApprovalState)
			if(!isApproved)
				alert("approveState is false");
			else
				alert("buy");
				try {
					const response = await props.contract.methods.buyNftToken(String(token_data[0])).send({ from: props.account, value: weiPrice });

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
            <div className="set mid col-xs-12">
            <Container>
                <Row xs ={1} md={4}>
                {props.array.map(index => {
                return (
                <Col>
                <div id= "display__col">
                <a href={'./detail/' + index[0]}><OnSale index = {index[0]} src = {String(index[0]) + ".png"}/></a>
                <br/>
                <h5>#{index[0]} NFT</h5><br/>
                <h6>{index[2]} ETH</h6>
                <ManipulateButton contract = {props.contract} unit = {index} id = {index[0]} ownerAddress = {index[1]} price = {index[2]} myAddress = {props.account} type = {props.type}/>
                <br/>
                {/* <Button variant="outline-warning" href={'./detail/' + index}>Detail</Button>{' '}
                <Button variant="outline-warning" onClick={(event) =>{
					event.preventDefault()
					ClickBuy()
					}}>{props.type}</Button><br/><br/> */}
                </div>
                </Col>)
                })}
                {/* return <Col><OnSale index = {index} src = {index.toString() + ".png"}/><p></p></Col> */}

                </Row>
            </Container>
            </div>
            </div>
        </div>
    )
}

export default DisplayJackets;
