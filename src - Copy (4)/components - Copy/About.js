import React , { useContext , useEffect } from 'react'



const About = () => {
  const consultantToken = localStorage.getItem('jwt');
  console.log(consultantToken)
  return(
      <div>
        This is About and He is in class {consultantToken}    </div>
  )
}

export default About;
