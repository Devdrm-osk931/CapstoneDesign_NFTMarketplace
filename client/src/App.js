import React, { Component } from "react";
import Jacket from "./contracts/Jacket.json";
import getWeb3 from "./getWeb3";
import { Container, Nav, Navbar, NavDropdown, Button, FormControl, Form} from "react-bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayJackets from "./DisplayJackets";
import Detail from "./Detail";
import Mypage from './Mypage';
import Minting from './Minting';
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import Main from './main';

class App extends Component {
  state = { storageValue: 0, minted_jackets: [], web3: null, accounts: null, balance: null, sale_jackets: [], my_jackets : [], contract: null, gateway: null, contractAddress: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0])
      //const sale_jackets = Array(30).fill().map((v,i)=> i+1)
      const gateway = "https://gateway.pinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/"

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Jacket.networks[networkId];
      const contractAddress = deployedNetwork.address
      const instance = new web3.eth.Contract(
        Jacket.abi,
        deployedNetwork && deployedNetwork.address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, balance, contract: instance, gateway, contractAddress }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, contractAddress } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
    // await contract.methods.set(5).send({ from: accounts[0] });
    // const response = await contract.methods.totalSupply().call();

    const response = await contract.methods.totalSupply().call();
    const tempnftListArray = await contract.methods.getSaleNftTokens().call();
    console.log(tempnftListArray);
    const nftArray = [];  // 현재 판매중인 NFT 리스트 받아옴

    for(let i = 0; i < tempnftListArray.length;i++){
      //_nftTokenId = tempnftListArray[i].nftTokenId;
	    //_nftTokenURI = tempnftListArray[i].nftTokenURI;
	    //_price = tempnftListArray[i].price;
      nftArray.push([Number(tempnftListArray[i][0]), tempnftListArray[i][1], Number(tempnftListArray[i][3])]);
    }
    console.log(nftArray);
    this.setState({storageValue: response, sale_jackets: nftArray})

  };

  render() {
    const giveapprove = async() =>{

      const ApprovalState = await this.state.contract.methods.isApprovedForAll(this.state.accounts[0], this.state.contractAddress).call();

      if(ApprovalState === true){
        alert('이미 권한이 부여되어 있습니다.');
      }

      else{
        await this.state.contract.methods.setApprovalForAll(this.state.contractAddress, true).send({ from: this.state.accounts[0]});
      }
    }

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        <Navbar className="navbar-custom sticky-top" expand="lg">
        <Container>
          <Navbar.Brand href="/">OnlyOneOnes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Explore<span>🔎</span></Nav.Link>
              <Nav.Link href="/aboutus">AboutUs<span>📕</span></Nav.Link>
              <Nav.Link href="/contact">ContactUs<span>📞</span></Nav.Link>
              <Nav.Link href="/minting">Minting<span> 📲 </span></Nav.Link>
              <NavDropdown title="MyPage🔐" id="basic-nav-dropdown">
                <NavDropdown.Item href="/mypage" eventKey="disabled">My Address: {this.state.accounts[0]}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item onClick = {giveapprove}>setApproved</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>


      {/* <h1>{this.state.storageValue} / 100</h1>
      <h1>{this.state.contractAddress}</h1> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main array = {this.state.sale_jackets} account = {this.state.accounts[0]} contract = {this.state.contract} contractAddress = {this.state.contractAddress} type = 'Main'/>}></Route>
        <Route path="/detail/:id" element = {<Detail contract = {this.state.contract} src = {this.state.gateway} account ={this.state.accounts[0]} ApprovalState = {this.state.ApprovalState} contractAddress = {this.state.contractAddress}/>}></Route>
        <Route path ="/mypage/" element ={<Mypage contract = {this.state.contract} account ={this.state.accounts[0]} array={this.state.sale_jackets} contractAddress = {this.state.contractAddress} type = 'MyPage'/>}></Route>
        <Route path ="/minting/" element ={<Minting contract = {this.state.contract} account = {this.state.accounts[0]}/>}></Route>
        <Route path = "/contact" element = {<Contact/>}></Route>
        <Route path = "/aboutus" element = {<AboutUs/>}></Route>
      </Routes>
      </BrowserRouter>


      {/* <div className="component-spacing">
      <DisplayJackets array = {this.state.sale_jackets}/>
      </div>

      <footer>
        <h2>This is footer</h2>
      </footer> */}
      </div>
    );
  }
}

export default App;
