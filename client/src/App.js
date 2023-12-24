import './App.css'
import axios from 'axios'
import { CONTRACT_ADDRESS, ABI } from './config/config'
import Web3 from 'web3';

function App () {

  async function begin () {
    const button = document.querySelector('.twoToneButton')
    button.innerHTML = 'Verifying.. '
    await verifyMe();
    button.innerHTML = 'Verify '
    
  }

  async function verifyMe () {
    try {
      const web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
  
      const resp = await axios.post('http://localhost:4040/verifyMe', {
        email: document.getElementById('email').value
      })
  
      console.log('resp', resp)
  
      if(resp.proof == 'Error: You Are Below The Required Age Limit!') {
        document.body.innerText = "Failed!"
      }
  
      await contract.methods.verify(resp.data.proof, resp.data.encryptedSecret).send({
        from: accounts[0]
      }).once('confirmation', () => {
        console.log('Confirmed ...............');
      }).once('receipt', (receipt) => {
        console.log('receipt => ', receipt.events.Verification.returnValues.success);
        if(receipt.events.Verification.returnValues.success) {
          document.body.innerText = "Successful!"
        } else {
          document.body.innerText = "Failed!"
        }
      })
    } catch (error) {
      console.log('err', error);
      document.body.innerText = "Failed!";
    }
  }
  return (
    <div className='App'>
      <h1> Zero Knowledge Age Verification</h1>
      <input id='email' placeholder='Enter Your Email' />
      <button className='twoToneButton' onClick={begin} type='submit'>
        {' '}
        Verify{' '}
      </button>
    </div>
  )
}

export default App
