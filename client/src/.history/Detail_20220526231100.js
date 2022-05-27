import { useParams } from 'react-router-dom';
import './App.css';

// axios.get(https://gateway.pinata.cloud/ipfs/QmTPfn16CPYFt1gKmhuSJTxDqzwk6xEdN9ZNK3fntHhpvj/40.json,[,config])
// .then((Response)=>{console.log(Response.data)})
//   .catch((Error)=>{console.log(Error)})

const clickBuy = () => {
  if (window.confirm("confirm on buy")) {
    alert("buy");
  } else {
    alert("Cancel");
  }
};

function Detail() {
	const token_id = useParams();
  return (
    <div className="App">
      <header></header>
      <div id ="main"></div>
	    <div>
		    <div id ="section__image" style ={{float: "left", width: "50%", margin: "20px"}}>
			  <img id = "image" src = "https://gateway.pinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/40.png"/>
		  </div>

		<div id = "etc" style ={{float: "right", width: "45%", marginTop: "60px"}}>
			<div></div>
			<h1 id="title">NFT</h1>
			<div id="price"><p>Price if sold out text color is red<br/></p> </div>

			<button onClick={clickBuy} class ='dongja'> buy </button>
			<p id="nft description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
		</div>
	</div>
    </div>
  );
}

export default Detail;
