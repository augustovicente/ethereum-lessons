const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let lotery;

beforeEach(async () => {
    // Get a list of all accounts
    try {
        accounts = await web3.eth.getAccounts();
        lotery = await new web3.eth.Contract(abi)
            .deploy({
                data: evm.bytecode.object,
                arguments: [],
            })
            .send({ from: accounts[0], gas: '1000000' });
    }
    catch (error) {
        console.log(error);
    }
});

describe('Lotery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lotery.options.address);
    });

    it('allows one account to enter', async () => {
        await lotery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.2', 'ether'),
        });

        const players = await lotery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.strictEqual(accounts[0], players[0], 'Player 1 is not in the list');
        assert.strictEqual(1, players.length, 'There are not 1 player in the list');
    })

    it('allows multiple accounts to enter', async () => {
        await lotery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.2', 'ether'),
        });

        await lotery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.2', 'ether'),
        });

        await lotery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.2', 'ether'),
        });

        const players = await lotery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.strictEqual(accounts[0], players[0], 'Player 1 is not in the list');
        assert.strictEqual(accounts[1], players[1], 'Player 2 is not in the list');
        assert.strictEqual(accounts[2], players[2], 'Player 3 is not in the list');
        assert.strictEqual(3, players.length, 'There are not 3 players');
    })

    it('requires a minimum amount of ether to enter', async () => {
        try
        {
            await lotery.methods.enter().send({
                from: accounts[0],
                value: 0,
            });
            assert(false);
        }
        catch(error)
        {
            assert(error);
        }
    })

    it('only manager can call pickWinner', async () => {
        try
        {
            await lotery.methods.pickWinner().send({
                from: accounts[1],
            });
            assert(false);
        }
        catch(error)
        {
            assert(error);
        }
    });

    it("sends money to the winner and resets the players array", async () => {
        await lotery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether'),
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lotery.methods.pickWinner().send({
            from: accounts[0],
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;
        
        assert(difference > web3.utils.toWei('1.8', 'ether'))
    })
});