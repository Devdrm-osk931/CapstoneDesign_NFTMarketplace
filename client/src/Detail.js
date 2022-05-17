import './App.css';
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from 'react-router-dom'

// axios.get(https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/40.json,[,config])
// .then((Response)=>{console.log(Response.data)})
//   .catch((Error)=>{console.log(Error)})

const clickBuy = () => {
  //metamask no
  if (1){  }

  if (window.confirm("confirm on buy")) {
    alert("buy");
  } else {
    alert("Cancel");
  }
};

function Detail(props) {
	const { id } = useParams();
  return (
    <div className="App">
      <header></header>
      <div id ="main"></div>
	    <div>
		    <div id ="section__image" style ={{float: "left", width: "50%", margin: "20px"}}>
			  <img id = "detail__image" src = {props.src + "/" + id.toString() +".png"}/>
		  </div>

		<div id = "etc" style ={{float: "right", width: "45%", marginTop: "60px"}}>
			<div></div>
			<h1 id="title">{id}</h1>
			<div id="price"><h4><br></br>Price if sold out text color is red<br/><br></br></h4> </div>

			<Button onClick={clickBuy} variant="outline-warning" className='detail__button'> buy </Button>
			<p id="nft description">
				<br></br>
				<br></br>
				<br></br>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
		</div>
	</div>
    </div>
  );
}

export default Detail;
