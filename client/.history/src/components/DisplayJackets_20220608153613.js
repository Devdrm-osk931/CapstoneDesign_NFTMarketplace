import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import OnSale from "./OnSale";
import Web3 from 'web3';
import { ReactComponent as ETH } from './image/ethereum-brands.svg';


function DisplayJackets(props) {

    // 특정 토큰(tokenOwner) 와 현재 계정을 비교함
    function ManipulateButton(props) {
        const owner = props.ownerAddress
        const me = props.myAddress

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
                        <Button variant="outline-warning" onClick = {(event) => {
                            event.preventDefault()
                            token_burn(props.id)
                        }}>Burn</Button>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Button variant="outline-warning" href={"./detail/" + props.id}>Detail</Button>{' '}
                        <Button variant="outline-warning" onClick = {(event) => {
                        event.preventDefault()
                        Cancel(props.id)
                        }}>Cancel</Button>
                    </div>
                )
            }
        }else if (props.type == 'MyPageSale') {
            return (
                <div>
                    <Button variant="outline-warning" href={"./detail/" + props.id}>Detail</Button>{' '}
                    <Button variant="outline-warning" onClick = {(event) => {
                        event.preventDefault()
                        Cancel(props.id)
                    }}>Cancel</Button>
                </div>
            )
        }
    }

    function ShowPrice(props) {
        if(props.price == 0) {
            return (<h6>Not On Sale</h6>)
        }else {
            return (<h6>{props.price}<ETH style ={{height:'18px'}}/></h6>)
        }
    }


    const Cancel = async(token_id) => {
        if(window.confirm("판매를 취소하시겠습니까?")){
            await props.contract.methods.removeToken(token_id).send({from: props.account });
		window.location.replace("/mypage")
        }  else{
            // 판매등록 취소 거부
        }

    }


    const token_burn = async(token_id) => {
        if(window.confirm("토큰을 삭제하시겠습니까?")){
            await props.contract.methods.burn(token_id).send({ from: props.account });
            window.location.reload();
        }  else{
            alert("취소");
        }
    }

    // 토큰 구매하기
    const ClickBuy = async(token_data) => {
        // 특정 토큰id의 주인이 누구인가
        const ownerAddress = token_data[1]
        // 특정 토큰의 가격
        const price = String(token_data[2])
		const weiPrice = Web3.utils.toWei(price);

		if(props.account === ownerAddress)
				alert("해당 NFT의 소유자입니다!");

		else if (window.confirm("정말 구매 하시겠습니까?")) {
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
		  alert("거래를 취소하셨습니다.");
		}
	  };


    return (
        <div className="component-spacing">
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
                            <h5>#{index[0]} NFT</h5>
                            <ShowPrice price = {index[2]}/>
                            <ManipulateButton contract = {props.contract} unit = {index} id = {index[0]} ownerAddress = {index[1]} price = {index[2]} myAddress = {props.account} type = {props.type}/>
                            <br/>
                        </div>
                    </Col>)
                })}

                </Row>
            </Container>
            </div>
            </div>
        </div>
    )
}

export default DisplayJackets;
