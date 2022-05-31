import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import OnSale from "./OnSale";
import Web3 from 'web3';
import Modal from "./Modal";


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

                        {/* <Button variant="outline-warning" onClick = {(event) => {
                            event.preventDefault()
                            Sell_NFT(props.id)
                        }}>Sell</Button>{' '} */}

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

                        {/* <Button variant="outline-warning" onClick = {(event) => {
                        event.preventDefault()
                        Edit(props.id)

                        }}>Edit</Button>{' '} */}

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

                    {/* <Button variant="outline-warning" onClick = {(event) => {
                        event.preventDefault()
                        Edit(props.id)

                    }}>Edit</Button>{' '} */}

                    <Button variant="outline-warning" onClick = {(event) => {
                        event.preventDefault()
                        Cancel(props.id)
                    }}>Cancel</Button>
                </div>
            )
        }

    }

    function CheckPrice(props) {
        if(props.price == 0) {
            return (<h6>Not On Sale</h6>)
        }else {
            return (<h6>{props.price} ETH</h6>)
        }
    }


    /*const nft_sell = async() =>{
		var test = await props.contract.methods.setSaleNftToken(id, text).send({from: props.account, gas:300000});
		var array = await props.contract.methods.getSaleNftTokens().call();
		console.log(array);
		window.location.replace("/mypage")
	}*/

    const [text, setText] = useState('');

	const onChange = (event) => {
		setText(event.target.value);
	}

    const Edit = async(token_id) => {
        await props.contract.methods.getSaleNftTokens().call();
		await props.contract.methods.changePrice(token_id, "20").send({from: props.account, gas:300000});
		await props.contract.methods.getSaleNftTokens().call();
        window.location.reload()
    }

    const Cancel = async(token_id) => {
        if(window.confirm("판매를 취소하시겠습니까?")){
            await props.contract.methods.removeToken(token_id).send({from: props.account, gas:300000});
		await props.contract.methods.getSaleNftTokens().call();
		window.location.replace("/mypage")
        }  else{

        }

    }

    const Sell_NFT = async(token_id) => {
        await props.contract.methods.setSaleNftToken(token_id, "10").send({from: props.account, gas:300000});
		await props.contract.methods.getSaleNftTokens().call();
		window.location.replace("/mypage")
    }

    const token_burn = async(token_id) => {
        //console.log(token_id)
        //await props.contract.methods.burn(token_id).send({ from: props.account});
        if(window.confirm("토큰을 삭제하시겠습니까?")){
            await props.contract.methods.burn(token_id).send({ from: props.account});
            window.location.reload();
        }  else{

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
                            <h5>#{index[0]} NFT</h5>
                            <CheckPrice price = {index[2]}/>
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
