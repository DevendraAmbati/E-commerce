import Carousel from 'react-bootstrap/Carousel';


function Carousels() {
  return (
    <Carousel fade>
      <Carousel.Item>
       <img src='https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg' alt='img  ' width='100%' />
        
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://offerer.com/view/img/slider.jpg' alt='img'  width='100%'/>
       
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg' alt='img'  width='100%'/>
    
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;