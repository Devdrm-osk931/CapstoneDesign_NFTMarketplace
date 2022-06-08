import '../App.css';
import React from "react";
import { Container, Button } from "react-bootstrap";

const Minting = (props) => {
	const mint = () => {
		if(props.total < 100) {
			props.contract.methods.mint().send({ from: props.account })
        	.once('receipt', async(receipt) => {
            const id = await props.contract.methods.getmintedId().call();
            if(id > 90) {
                if (window.confirm("Rare Jacket Minted!")) {
                    window.location.replace("/mypage")
                }
            }else {
                if(window.confirm("Normal Jacket Minted!")) {
                    window.location.replace("/mypage")
                }
            }
        })
		}
		else {
			if (window.confirm("All Jackets are Minted!")){
				window.location.replace("/mypage");
			}
		}

    }

	// For Demo
	const mint_70 = async() => {
		for(var i =0 ; i < 4; i ++){
			await props.contract.methods.mint().send({ from: props.account })
			var id = await props.contract.methods.getmintedId().call();
			await props.contract.methods.setSaleNftToken(id, id).send({from: props.account, gas:300000});
		}
		window.location.replace('/mypage')
	}


	return(
		<div>
		<Container style={{padding: '0px'}}>
		<div>
		<img src={ require('./image/minting.png') } style = {{width:'100%', height:'100%', alt:"mainlogo", marginBottom: "20px", textAlign: 'center'}} />
		<img src={ require('./image/mintingins.png') } style = {{width:'100%', height:'100%', alt:"mainlogo", marginBottom: "20px", textAlign: 'center'}}/>
		</div>
		</Container>
			<div style = {{marginRight: '60px'}}>
				<Button variant="outline-warning" onClick={(event) =>{
					event.preventDefault()
					mint()
				}}>Mint!</Button>{' '}

				<Button variant="outline-warning" onClick={(event) => {
					event.preventDefault()
					mint_70()
				}}>DEMO</Button>
			</div>
		</div>
	);
}

export default Minting;
