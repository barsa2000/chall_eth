const {ethers} = require('hardhat');
const {expect} = require('chai');

function make_pass(length) {
  var result = '';
  var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('[Challenge] Duper Super Safe Safe', function() {
  let deployer, attacker;

  const INITIAL_SAFE_BALANCE = ethers.utils.parseEther('30');
  const ATTACKER_ETH = ethers.utils.parseEther('100');

  before(async function() {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    await ethers.provider.send("hardhat_setBalance", [
      attacker.address, "0x56bc75e2d63100000" // 100 eth
    ]);

    expect(await ethers.provider.getBalance(attacker.address))
        .to.equal(ATTACKER_ETH);

    const pass1 = ethers.utils.formatBytes32String(make_pass(31));
    const pass2 = ethers.utils.formatBytes32String(make_pass(31));

    this.safe = await (await ethers.getContractFactory(
                           'DuperSuperSafeSafe',
                           deployer,
                           ))
                    .deploy(pass1, pass2, {value : INITIAL_SAFE_BALANCE});

    expect(await ethers.provider.getBalance(this.safe.address))
        .to.equal(INITIAL_SAFE_BALANCE);

    expect(await this.safe.isSolved()).to.be.false;
  });

  it('Exploit', async function() {
    /** CODE YOUR EXPLOIT HERE */
  });

  after(async function() {
    /** SUCCESS CONDITIONS */

    expect(await this.safe.isSolved()).to.be.true;
  });
});
