import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import { Container, Nav, Navbar, NavDropdown, Button, FormControl, Form} from "react-bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DisplayJackets from "./DisplayJackets";
import DetailPage from "./DetailPage";
import Detail from "./Detail";
import Mypage from './Mypage';
import Minting from './Minting';

// const jacket_ids = Array(14).fill().map((v,i)=> i+1);

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, balance: null, sale_jackets: [], my_jackets : [], contract: null, gateway: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0])
      const sale_jackets = Array(30).fill().map((v,i)=> i+1)
      const gateway = "https://gateway.pinata.cloud/ipfs/QmPvyY9EZTkgVVKcghFwiymhhyQeyg3M2QJcZCMwEHPHsu/"


      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, balance, contract: instance, sale_jackets, gateway }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand href="/">OnlyOneOnes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Explore<span>🔎</span></Nav.Link>
              <Nav.Link href="#link">AboutUs<span>📕</span></Nav.Link>
              <NavDropdown title="MyPage🔐" id="basic-nav-dropdown">
                <NavDropdown.Item href="/mypage" eventKey="disabled">My Address: {this.state.accounts[0]}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/minting/">Minting<span> 📲 </span></Nav.Link>
            </Nav>
            <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="검색기능x"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayJackets array = {this.state.sale_jackets}/>}></Route>
        <Route path="/detail/:id" element = {<Detail src = {this.state.gateway}/>}></Route>
        <Route path ="/mypage/" element ={<Mypage account ={this.state.accounts} array={this.state.sale_jackets}/>}></Route>
        <Route path ="/minting/" element ={<Minting/>}></Route>
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
