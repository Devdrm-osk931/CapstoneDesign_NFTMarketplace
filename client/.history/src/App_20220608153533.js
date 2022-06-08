import React, { Component } from "react";
import Jacket from "./contracts/Jacket.json";
import getWeb3 from "./components/getWeb3";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from "./Detail";
import Mypage from './Mypage';
import Minting from './pages/Minting';
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import Main from './Main';
import Footer from './components/Footer';

class App extends Component {
  state = { total: 0, ApprovalState: null, minted_jackets: [], web3: null, accounts: null, sale_jackets: [], contract: null, gateway: null, contractAddress: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const gateway = "https://soksak.mypinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/"

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Jacket.networks[networkId];
      const contractAddress = deployedNetwork.address
      const instance = new web3.eth.Contract(
        Jacket.abi,
        deployedNetwork && deployedNetwork.address,
      );


      this.setState({ web3, accounts, contract: instance, gateway, contractAddress }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, contractAddress } = this.state;

    const ApprovalState = await contract.methods.isApprovedForAll(this.state.accounts[0], contractAddress).call();
    const totalSupply = await contract.methods.totalSupply().call();
    const tempnftListArray = await contract.methods.getSaleNftTokens().call();
    const nftArray = [];  // 현재 판매중인 NFT 리스트 받아옴


    for(let i = 0; i < tempnftListArray.length;i++){
      nftArray.push([Number(tempnftListArray[i][0]), tempnftListArray[i][1], Number(tempnftListArray[i][3])]);
    }

    const temp = await contract.methods.getNftTokens(accounts[0]).call()
		const minted_jackets = []
		for(let i = 0; i < temp.length; i ++ ) {
			// id, owner_address, price
			minted_jackets.push([Number(temp[i][0]), temp[i][1], Number(temp[i][3])]);
		}
    this.setState({ApprovalState: ApprovalState, total: totalSupply, sale_jackets: nftArray, minted_jackets: minted_jackets})
  };

  render() {
    const giveApprove = async() =>{
      if(this.state.ApprovalState === true){
        alert('이미 권한이 부여되어 있습니다.');
      }
      else{
        const response = await this.state.contract.methods.setApprovalForAll(this.state.contractAddress, true).send({ from: this.state.accounts[0]});
        if(response) {
          this.setState({ApprovalState:true});
        }
      }
    }

    const revokeApprove = async() => {
      if (this.state.ApprovalState === false) {
        alert("이미 권한이 철회 되었습니다.")
      }else {
        const response = await this.state.contract.methods.setApprovalForAll(this.state.contractAddress, false).send({from: this.state.accounts[0]});
        if (response) {
          this.setState({ApprovalState: false});
        }
      }
    }

    if (!this.state.web3) {
      return <div>
              <h3>연결된 계정을 찾을 수 없습니다!<br/>
              O.O.O Marketplace에 접속하려면 메타마스크 연결을 확인해주세요! 😥<br/>
              <br/>
              <a href="https://metamask.io/">메타마스크 설치하기 🦊</a>
              </h3></div>;
    }



    return (
      <div className="App">

        <Navbar className="navbar-custom sticky-top" expand="lg">
        <Container>
          <Navbar.Brand href="/"><img src={ require('./image/Logo.png') } style = {{width:'45px', height:'45px'}}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Explore<span> 🔎 </span></Nav.Link>
              <Nav.Link href="/aboutus">AboutUs<span> 📕 </span></Nav.Link>
              <Nav.Link href="/contact">ContactUs<span> 📞 </span></Nav.Link>
              <Nav.Link href="/minting">Minting<span> 📲 </span></Nav.Link>
              <NavDropdown title="MyPage🔐" id="basic-nav-dropdown">
                <NavDropdown.Item href="/mypage" eventKey="disabled">My Address: {this.state.accounts[0]}</NavDropdown.Item>
                <NavDropdown.Item onClick = {giveApprove}>Grant</NavDropdown.Item>
                <NavDropdown.Item onClick = {revokeApprove}>Revoke</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main array = {this.state.sale_jackets} account = {this.state.accounts[0]} contract = {this.state.contract} contractAddress = {this.state.contractAddress} type = 'Main'/>}></Route>
            <Route path="/detail/:id" element = {<Detail contract = {this.state.contract} src = {this.state.gateway} account ={this.state.accounts[0]} ApprovalState = {this.state.ApprovalState} contractAddress = {this.state.contractAddress}/>}></Route>
            <Route path ="/mypage/" element ={<Mypage contract = {this.state.contract} account ={this.state.accounts[0]} array={this.state.minted_jackets} contractAddress = {this.state.contractAddress} type = 'MyPage'/>}></Route>
            <Route path ="/minting/" element ={<Minting contract = {this.state.contract} account = {this.state.accounts[0]} total = {this.state.total}/>}></Route>
            <Route path = "/contact" element = {<Contact/>}></Route>
            <Route path = "/aboutus" element = {<AboutUs/>}></Route>
          </Routes>
        </BrowserRouter>

        <Footer></Footer>
      </div>
    );
  }
}

export default App;
