import styled from 'styled-components'
import React from 'react'
import {Link} from 'react-router-dom'
 const Footer = () => {
   return (
      <Container>
         <div className='footer_container'>
          <div className='link_container'>  <Link className='links' to={'/Subscription'}>Send Free Trial to Friends {'>'}</Link></div>
          <div className='link_container'>  <Link className='links' to={'/Subscription'}>Browse by Genre   {'>'}</Link></div>
          <div className='link_container'>  <Link className='links' to={'/Subscription'}>Decades   {'>'}</Link></div>
          <div className='link_container'>  <Link className='links' to={'/moods'}>Moods and Activities   {'>'}</Link></div>
          <div className='link_container'>  <Link className='links' to={'/Subscription'}>WorldWide   {'>'}</Link></div>
          <div className='link_container'>  <Link className='links' to={'/Subscription'}>Charts   {'>'}</Link></div>
           <div className='link_container'>  <Link className='links' to={'/Subscription'}>Music Videos   {'>'}</Link></div>
           <div className='link_container'> <Link className='links' to={'/Subscription'}>Spatial Audio   {'>'}</Link></div>

         </div>
      </Container>
   )
 }
 
 export default Footer

 const Container=styled.div`
 
.footer_container{
    display: flex;
    flex-wrap:wrap;
    .link_container{
        display: flex;
        height:70px;
        width:350px;
        border-radius: 10px;
        background-color: rgba(60,60,67,.03);
        align-items: center;
        justify-content: center;
        margin:10px;
        
    }

    .links{
       
        text-decoration: none;
        color: #d60017;
       
 
    }
}
 
 `;
