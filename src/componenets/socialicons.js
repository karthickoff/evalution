import React from 'react'
import fbIcon from "../assets/fb.png";
import googleIcon from "../assets/google.png";
import linkedinIcon from "../assets/linkedin.png";
import twitterIcon from "../assets/twitter.png";
import "../styles/socialicons.css";
export default function Socialicons() {
    return (
        <div>
            <ul>
                <span><img className='img' src={fbIcon} /></span>
                <span><img className='img' src={googleIcon} /></span>
                <span><img className='img' src={linkedinIcon} /></span>
                <span><img className='img' src={twitterIcon} /></span>

            </ul>
        </div>
    )
}
