import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import OnSale from "./OnSale";

function DisplayJackets(props) {

    const ClickBuy = () => {
		if (window.confirm("confirm on buy")) {
			if(props.type=="buy") alert("buy");
			else alert("Sell");
		} else {
		alert("Cancel");
		}
	}

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

                <a href={'./detail/' + index}><OnSale index = {index} src = {index.toString() + ".png"}/></a>
                <br/>
                <h5>#{index} NFT</h5><br/>
                <Button variant="outline-warning" href={'./detail/' + index}>Detail</Button>{' '}<Button variant="outline-warning" onClick={(event) =>
				{
					event.preventDefault()
					ClickBuy()
					}}>{props.type}</Button><br/><br/>
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
