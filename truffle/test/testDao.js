const Dao = artifacts.require('CollectorsDAO');
const {BN, expectRevert,expectEvent} = require("@openzeppelin/test-helpers");
const {expect} =require('chai');

contract("CollectorsDAO", accounts => {

    const owner = accounts[0];
    let daoInstance;

    describe(":::: FUNCTIONS TESTS ::::",()=>{
        describe("createDAO() test",()=> {
            beforeEach(async()=>{
                daoInstance = await Dao.new({from:owner})
            })
            it("should emit daoCreated event", async()=>{
                expectEvent(await daoInstance.createDAO('dao1',{from:owner}),"daoCreated",{daoId:new BN(0),daoName:'dao1'});
            })
            it("should increment id between each DAO",async()=>{
                expectEvent(await daoInstance.createDAO('dao1',{from:owner}),"daoCreated",{daoId:new BN(0),daoName:'dao1'});
                expectEvent(await daoInstance.createDAO('dao2',{from:owner}),"daoCreated",{daoId:new BN(1),daoName:'dao2'});
            })
        })
        describe("addDaoMember() test",()=>{
            beforeEach(async()=>{
                daoInstance = await Dao.new({from:owner})
            })
            it("should revert if caller isn't the owner",async()=>{
                await expectRevert(daoInstance.addDaoMember(accounts[1],{from:accounts[2]}),"Ownable: caller is not the owner");
            })
            it("should revert if address already registered", async()=>{
                await daoInstance.addDaoMember(accounts[1],{from:accounts[0]});
                await expectRevert(daoInstance.addDaoMember(accounts[1],{from:accounts[0]}),"already a member");
            })
            it("should emit memberAdded event", async()=>{
                expectEvent(await daoInstance.addDaoMember(accounts[1],{from:accounts[0]}),"memberAdded",{newMember:accounts[1]});
            })
        })
        describe("createProposal() test",()=>{
            beforeEach(async()=>{
                daoInstance = await Dao.new({from:owner})
                await daoInstance.createDAO('test',{from:owner});
            })
            it("should revert if the proposal's daoId doesn't exist",async()=>{
                await expectRevert(daoInstance.createProposal(new BN(1),'tt','tt',new BN(1),'tt','tt',{from:accounts[0]}),"this dao not exist");
            })
            it("should emit a proposalCreated event",async()=>{
                expectEvent(await daoInstance.createProposal(
                    new BN(0),
                    't',
                    't',
                    new BN(1),
                    't',
                    't',
                    {from:accounts[0]}),
                    "proposalCreated",
                    {daoId : new BN(0),
                    proposalId:new BN(0),
                    owner: accounts[0],
                    proposalName:'t',
                    proposalDesc: 't',
                    value: new BN(1),
                    docOwnership:'t',
                    mainImage:'t'});
            })
            it("should increment id between each proposal",async()=>{
                expectEvent(await daoInstance.createProposal(
                    new BN(0),
                    't',
                    't',
                    new BN(1),
                    't',
                    't',
                    {from:accounts[0]}),
                    "proposalCreated",
                    {daoId : new BN(0),
                    proposalId:new BN(0),
                    owner: accounts[0],
                    proposalName:'t',
                    proposalDesc: 't',
                    value: new BN(1),
                    docOwnership:'t',
                    mainImage:'t'});
                expectEvent(await daoInstance.createProposal(
                    new BN(0),
                    't',
                    't',
                    new BN(1),
                    't',
                    't',
                    {from:accounts[0]}),
                    "proposalCreated",
                    {daoId : new BN(0),
                    proposalId:new BN(1),
                    owner: accounts[0],
                    proposalName:'t',
                    proposalDesc: 't',
                    value: new BN(1),
                    docOwnership:'t',
                    mainImage:'t'});
            })
        })
        describe("vote() test",()=>{
            beforeEach(async()=>{
                daoInstance = await Dao.new({from:owner});
                await daoInstance.createDAO('dao1',{from:owner});
                await daoInstance.createProposal(new BN(0),'t','t',new BN(1),'t','t',{from:accounts[0]});
                await daoInstance.addDaoMember(accounts[0],{from:accounts[0]});
            })
            it("should revert if voter is not a DAO member",async()=>{
                await expectRevert(daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[1]}),"not member of the DAO");
            })
            it("should revert if voter already voted for this proposal",async()=>{
                await daoInstance.addDaoMember(accounts[1],{from:accounts[0]});
                daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[1]});
                await expectRevert(daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[1]}),"already voted");
            })
            it("should revert if voter is the applicant of the proposal",async()=>{
                await expectRevert(daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[0]}),"applicant can't vote for his proposal");
            })
            it("should update the proposal status function of the vote",async()=>{
                let status = await daoInstance.getProposalStatus(new BN(0));
                expect(status).to.equal(false);
                await daoInstance.addDaoMember(accounts[1],{from:accounts[0]});
                await daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[1]});
                status = await daoInstance.getProposalStatus(new BN(0));
                expect(status).to.equal(true);
            })
            it("should set the final value as the average value of all the 'yes' vote ",async()=>{
                await daoInstance.addDaoMember(accounts[1],{from:accounts[0]});
                await daoInstance.addDaoMember(accounts[2],{from:accounts[0]});
                await daoInstance.addDaoMember(accounts[3],{from:accounts[0]});
                await daoInstance.addDaoMember(accounts[4],{from:accounts[0]});
                await daoInstance.vote(new BN(0),new BN(30),new BN(1),{from:accounts[1]});
                await daoInstance.vote(new BN(0),new BN(3),new BN(0),{from:accounts[2]});
                await daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[3]});
                await daoInstance.vote(new BN(0),new BN(2),new BN(0),{from:accounts[4]});
                expectEvent(await daoInstance.closeProposal(new BN(0),{from:accounts[1]}),"proposalClosed",{proposalId:new BN(0),finalValue:new BN(2),votingStatus:"accepted"}); 
            })
            it("should emit a voteSetted event",async()=>{
                await daoInstance.addDaoMember(accounts[1],{from:accounts[0]});
                expectEvent(await daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[1]}),"voteSetted",{proposalId:new BN(0),voter:accounts[1],vote:new BN(0),updatedProposalStatus:true});
            })
        })
        describe("closeProposal() test",()=>{
            beforeEach(async()=>{
                daoInstance = await Dao.new({from:owner});
                await daoInstance.createDAO('dao1',{from:owner});
                await daoInstance.createProposal(new BN(0),'t','t',new BN(1),'t','t',{from:accounts[0]});
                await daoInstance.addDaoMember(accounts[1],{from:accounts[0]});
                daoInstance.vote(new BN(0),new BN(1),new BN(0),{from:accounts[1]});
            })
            it("should revert if caller is not a DAO member",async()=>{
                await expectRevert(daoInstance.closeProposal(new BN(0),{from:accounts[0]}),"not member of the DAO")
            })
            it("should set the voting status to 'accepted' if vote 'yes' win",async()=>{
                expectEvent(await daoInstance.closeProposal(new BN(0),{from:accounts[1]}),"proposalClosed",{proposalId:new BN(0),finalValue:new BN(1),votingStatus:"accepted"});
            })
            it("should set the voting status to 'refused' and value to '0' if vote 'no' win",async()=>{
                await daoInstance.addDaoMember(accounts[2],{from:accounts[0]});
                await daoInstance.addDaoMember(accounts[3],{from:accounts[0]});
                await daoInstance.vote(new BN(0),new BN(1),new BN(1),{from:accounts[2]});
                await daoInstance.vote(new BN(0),new BN(3),new BN(1),{from:accounts[3]});
                expectEvent(await daoInstance.closeProposal(new BN(0),{from:accounts[1]}),"proposalClosed",{proposalId:new BN(0),finalValue:new BN(0),votingStatus:"refused"});
            })
        })
    })
})

