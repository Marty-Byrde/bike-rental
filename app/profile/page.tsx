'use client'
import React, {useState} from 'react'
import './profile.css'
import Image from 'next/image';
import userPicture from '@/public/Icons/DummyAvatar.jpg'
import creditcardPicture from '@/public/Icons/Kreditkarte_muster.png'

export default function ShowProfile() {
  
  const [transferAmount, setTransferAmount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(0);


  //---------- Handler for Opening & Closing Pop Up Window-------------

  const handleTransferClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };


  //---------- Transfer Money Function --------------------------

  const handleTransfer = (amount: number) => {
    const updatedBalance = userBalance + amount;
    setUserBalance(updatedBalance);
    setIsPopupOpen(false);
  };

  

  // ----------------Showing User Profile & Pop Up Window ---------------
  return (
    <div className="profilecard">
      <div className="gradiant"></div>
      <div className="profile-down">
        <div className="user-picture-container">
          <Image className="user-picture" src={userPicture} alt="" />
        </div>
        <div className="user-email">max.mustermann@gmx.com</div>
        <div className="user-wallet">{`€${userBalance.toFixed(2)}`}</div>
        <div className="transfer-money-button" onClick={handleTransferClick}>
          Transfer Money
        </div>
      </div>

      
      {isPopupOpen && (
      <div className="overlay">
        <div className="popup">
          <Image className="credit-card-image" src={creditcardPicture} alt="" />
          <div>
            <div>Enter transfer amount:</div>
            <input type="number" value={transferAmount} onChange={(e) => setTransferAmount(+e.target.value)}/>
          </div>
          <div className="button-container">
            <div className="transfer-button" onClick={() => handleTransfer(transferAmount)}>Transfer</div>
            <div className="cancel-button" onClick={handlePopupClose}>Cancel</div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

