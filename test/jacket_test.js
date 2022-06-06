const { assert } = require('console');

const Jacket = artifacts.require("./Jacket.sol");

contract("Jacket", accounts => {
    it("...should mint nfts with id 1 ~ 100 without duplications nor exception", async () => {
        const jacketInstance = await Jacket.deployed()
        
        // Expected Result Array
        const minted = new Array(100);
        for (var i = 0; i < minted.length; i ++) {
            minted[i] = [String(i + 1), accounts[0], String(0)]
        }
        const result = []


        // Mint 100 times
        for (var cnt = 0; cnt < 100; cnt ++) {
            await jacketInstance.mint({ from: accounts[0] });
        }

        // Result of Minting
        const temp = await jacketInstance.getNftTokens(accounts[0]);
        for(var i = 0; i < temp.length; i ++){
            result.push([temp[i][0], temp[i][1], temp[i][3]])
        }

        result.sort(function(a, b){
            return a[0]-b[0]
        })

        var assert = require('assert');
        assert.deepEqual(result, minted, "All Nft Jackets Not Minted");
    })
})

contract("Jacket", accounts => {
    it("...mint a NFT and set it for sale & buy", async() => {
        const jacketInstance = await Jacket.deployed()

        // 판매 권한 설정
        console.log(accounts[0])
        console.log(jacketInstance.address);
        var ApprovalState = await jacketInstance.isApprovedForAll(accounts[0], jacketInstance.address);
        console.log(ApprovalState);
        await jacketInstance.setApprovalForAll(jacketInstance.address, true, { from: accounts[0] });
        ApprovalState = await jacketInstance.isApprovedForAll(accounts[0], jacketInstance.address);
        console.log(ApprovalState);

        // Minting 하고 해당 Jacket의 id 받아오기
        await jacketInstance.mint({ from: accounts[0] });
        const id = await jacketInstance.getmintedId();
        console.log(id.toString(10));  // BN 객체를 10진수 형태로 전환

        // 해당 Jacket을 판매등록한다
        await jacketInstance.setSaleNftToken(Number(id.toString(10)), 10, { from: accounts[0] })

        const sale_info = await jacketInstance.getSaleNftTokens();
        console.log(sale_info)

        await jacketInstance.buyNftToken(id, { from: accounts[1], value: 10 })
        const owner = await jacketInstance.ownerOf(id)
        console.log("owner: "+owner);

        var assert = require('assert');
        assert.deepEqual([sale_info[0][0], sale_info[0][1], sale_info[0][3]], [id.toString(10), accounts[0], 10]);
        assert.deepEqual(owner, accounts[1], "Buying Not Done");
        
    })

contract("Jacket", accounts => {
    it("...Edit NFT sale price & Remove it from sale", async() => {
        const jacketInstance = await Jacket.deployed()

        // 판매 권한 설정
        console.log(accounts[0])
        console.log(jacketInstance.address);
        var ApprovalState = await jacketInstance.isApprovedForAll(accounts[0], jacketInstance.address);
        console.log(ApprovalState);
        await jacketInstance.setApprovalForAll(jacketInstance.address, true, { from: accounts[0] });
        ApprovalState = await jacketInstance.isApprovedForAll(accounts[0], jacketInstance.address);
        console.log(ApprovalState);

        // Minting 하고 해당 Jacket의 id 받아오기
        await jacketInstance.mint({ from: accounts[0] });
        const id = await jacketInstance.getmintedId();
        console.log(id.toString(10));  // BN 객체를 10진수 형태로 전환

        // 해당 Jacket을 판매등록한다
        await jacketInstance.setSaleNftToken(Number(id.toString(10)), 10, { from: accounts[0] })

        const originalPrice = await jacketInstance.getNftTokenPrice(Number(id.toString(10)));

        // 해당 Jacket의 가격을 20으로 수정한다
        await jacketInstance.changePrice(Number(id.toString(10)), 20, { from: accounts[0] })

        const afterPrice = await jacketInstance.getNftTokenPrice(Number(id.toString(10)));

        console.log(originalPrice.toString(10), afterPrice.toString(10));

        var assert = require('assert')
        assert.deepEqual(afterPrice.toString(10), 20, "Price Editing Not Successful");

        // Jacket을 등록 해제 한다
        await jacketInstance.removeToken(Number(id.toString(10)))

        // 가격을 읽어온다
        const removedPrice = await jacketInstance.getNftTokenPrice(Number(id.toString(10)));
        assert.deepEqual(removedPrice.toString(10), 0, "Token isn't Removed From Sale")
        
    })
})

contract("Jacket", accounts => {
    it("mint a NFT, and burn it", async() => {
        const jacketInstance = await Jacket.deployed();

        //Mint a NFT
        await jacketInstance.mint({ from: accounts[0] });
        const id = await jacketInstance.getmintedId();

        var result = await jacketInstance.getNftTokens(accounts[0]);
        console.log(result);
        console.log(result.length == 1);

        var assert = require('assert');
        assert.deepEqual(result.length, 1, "Minting Not Successful");

        // Burn the NFT
        await jacketInstance.burn(Number(id.toString(10)));
        result = await jacketInstance.getNftTokens(accounts[0]);
        assert.deepEqual(result.length, 0, "Burn Not Successful");

    })
})
})