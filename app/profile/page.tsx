'use client'
import React, {useState} from 'react'
import './profile.css'
import Image from 'next/image';
import userPicture from '@/public/Icons/DummyAvatar.jpg'

export default function ShowProfile(){

        return(
            <div className="profilecard">
            <div className="gradiant"></div>
            <div className="profile-down">
              <div className="user-picture-container">
                <Image className="user-picture" src={userPicture} alt="" />
              </div>
              <div className="user-email">max.mustermann@gmx.com</div>
              <div className="user-wallet">€€,€€</div>
              <div className="transfer-button">Transfer Money</div>
            </div>
          </div>
        
        )
}
