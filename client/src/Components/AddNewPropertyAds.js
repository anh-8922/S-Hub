
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState, useEffect } from 'react';
// import { useCookies } from "react-cookie"
import { useGetUserID } from "../CustomHooks/useGetUserID"
import axios from 'axios';


export default function NewProperty() {
  const userID = useGetUserID ()
  console.log("Add property post ueseID:", userID)
  // const [cookies, setCookies] = useCookies(["access_token"])
  const [category, setCategory] = useState('')
  const [propertyType, setPropertyType] = useState('Flat')
  const [availableOn, setAvailableOn] = useState ('')
  const [rate, setRate] = useState('')
  const [addressline1, setAddressline1] = useState('')
  const [addressline2, setAddressline2] = useState('')
  const [city, setCity] = useState ('')
  const [ postCode, setPostCode] = useState ('')
  const [ beds, setBeds] = useState (0)
  const [ baths, setBaths] = useState (0)
  const [selectedImages, setSelectedImages] = useState([{url:"", file:null}])
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState ()
  const [description, setDescription] = useState ()
  const [featured, setFeatured] = useState (false)
  const address = [{addressline1}, {addressline2}, {city}, {postCode}]

  // const myLocationAPI = process.env.REACT_APP_MY_GOOGLE_API

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    console.log("category:", category)
  }

  const handlePropertyType = (e) => {
    setPropertyType(e.target.value)
    console.log("property type:", propertyType)
  }

  const handleDateChange = (e) => {
    setAvailableOn(e.target.value)
    console.log('Available on:', availableOn)
  }

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files)

  //   if (files.length > 5) {
  //     alert("You can only upload up to 5 Images.")
  //     return
  //   }

  //   if (files.length = 0) {
  //     alert("Upload an image")
  //     return
  //   }

  //   const updatedImages = files.map((file) => ({
  //     url: URL.createObjectURL(file),
  //     file: file,
  //   }));
  //   setSelectedImages(updatedImages)
  //   console.log("updated images:", updatedImages)

  // }

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const updatedImages = files.map((file) => ({
  //     url: URL.createObjectURL(file),
  //     file: file,
  //   }));
  //   setSelectedImages(updatedImages);
  //   console.log("updated images:", updatedImages);
  // };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setSelectedImages(updatedImages);
    console.log("updated images:", updatedImages);
  };

  const handleFeatured = (e) => {
    setFeatured(e.target.checked)
  }

  const handlePostCode = (e) => {
    setPostCode(e.target.value)
  }

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(`https://postcodes.io/postcodes/${postCode}`);
      const results = response.data.result;
     
       const longitude = results.longitude
        const latitude = results.latitude
        setLongitude(longitude);
        setLatitude(latitude);
        console.log("long:", longitude)
        console.log("lat:", latitude)
      
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [postCode]);



  // const fetchCoordinates = async () => {
  //   console.log("postcode google:", postCode)
  //   try {
      
  //     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${myLocationAPI}`);
  //     console.log("response:", response)
  //     const results = response.data.results;
  //    console.log('respond google:', results)
  //       const location = results[0].geometry.location;
  //       setLongitude(location.lng);
  //       setLatitude(location.lat);
    
  //   } catch (error) {
  //     console.error('Error fetching coordinates:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCoordinates();
  // }, [postCode]);


 


  useEffect(() => {
 
  }, [userID,
      category, 
      propertyType, 
      availableOn, 
      rate, 
      addressline1, 
      addressline2, 
      city, 
      postCode, 
      featured, 
      selectedImages]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
        formData.append("owner", userID )
        formData.append("category", category);
        formData.append("address[0][addressline1]", addressline1);
        formData.append("address[0][addressline2]", addressline2);
        formData.append("address[0][city]", city);
        formData.append("address[0][postcode]", postCode);
        formData.append("houseType", propertyType);
        formData.append("availableOn", availableOn);
        formData.append("longitude", longitude)
        formData.append("rate", rate);
        formData.append("latitude", latitude);
        selectedImages.forEach((image) => {
          formData.append('images', image.file);
        })
        // selectedImages.forEach((image, index) => {
        // formData.append(`images[${index}]`, image.file);
        // });
        // formData.append(`image[${index}]`, selectedImages.files);
        formData.append("baths", baths);
        formData.append("beds", beds);
        formData.append("description", description);
        formData.append("feature", featured);

        console.log("formData:", formData)
        try {
          const response = await axios.post("/housing/addnewproperty", formData, {
            headers: {
              "Content-type": "multipart/form-data; charset=UTF-8",
            },
          });
    
          // setFormSubmitted(true);
          console.log("Response:", response);
          
          // navigate("/user");
        } catch (error) {
          console.log("Error:", error);
        }

  }

  
  return (
    <Form onSubmit={handleSubmit}>
         <Row className="mb-3">
         <Form.Label>Category</Form.Label>
         <div key={`inline-radio`} className="mb-3">
         
         <Form.Check
            inline
            label="Rent"
            name="group1"
            type="radio"
            id="rent"
            value="Rent"
            checked={category === 'Rent'}
            onChange={handleCategoryChange}
          />
          
            <Form.Check
            inline
            label="Sale"
            name="group1"
            type="radio"
            id="sale"
            value="Sale"
            checked={category === 'Sale'} 
            onChange={handleCategoryChange}
          />
         </div>
         </Row>
         <Row className="mb-3">
         <Form.Group as={Col} controlId="formGridPropertyType">
         <Form.Label>Property type</Form.Label>
          <Form.Select value={propertyType} 
                       onChange={handlePropertyType}>
            {/* <option >Select...</option> */}
            <option value="Flat">Flat</option>
            <option value="2-Level Flat">2-Level Flat</option>
            <option value="Studio Flats">Studio Flats</option>
            <option value="Converted Flat">Converted Flat</option>
            <option value="Detached House">Detached House</option>
            <option value="Semi-detached House">Semi-detached House</option>
            <option value="Terraced House">Terraced House</option>
            <option value="End of Terrace House">End of Terrace House</option>
           
          </Form.Select>
         </Form.Group>

         <Form.Group as={Col} controlId="formGridBeds">
          <Form.Label>Beds</Form.Label>
          <Form.Control type="number" 
                        // defaultValue='1' 
                        value={beds} 
                        onChange={(e) => setBeds(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridBeds">
          <Form.Label>Baths</Form.Label>
          <Form.Control type="number" 
                        // defaultValue='1' 
                        value={baths} 
                        onChange={(e) => setBaths(e.target.value)}/>
        </Form.Group>

         <Form.Group as={Col} controlId="formGridAvailableOn">
          <Form.Label>Property Available on</Form.Label>
          <Form.Control type="date" 
                        placeholder="Property Available on" 
                        value={availableOn} 
                        onChange={handleDateChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Rate</Form.Label>
        <InputGroup className="mb-3" as={Col} >
          <InputGroup.Text>£</InputGroup.Text>
          <Form.Control type="text" 
                        required = {true}
                        placeholder="Rate"
                        value={rate}
                        onChange={(e) => setRate (e.target.value)} />
                        
         
          </InputGroup>
          </Form.Group>

         </Row>


         <Row className="mb-3">
      <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
        <Form.Label>Property Address</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor"
                      value={addressline1}
                      required = {true}
                      onChange={(e) => setAddressline1(e.target.value)}/>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address line 2</Form.Label>
        <Form.Control placeholder= "1234 Main St" 
                      value={addressline2}
                      required = {true}
                      onChange={(e) => setAddressline2(e.target.value)}/>
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control value={city}
                        required = {true}
                        onChange={(e) => setCity(e.target.value)}/>
        </Form.Group>

        {/* <Form.Group as={Col} controlId="formGridState">
          <Form.Label>City</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Post Code</Form.Label>
          <Form.Control  value={postCode}
                         required = {true}
                         onChange={handlePostCode} />
        </Form.Group>
      </Row>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Upload Images</Form.Label>
        <Form.Control type="file" 
                      multiple
                      required = {true}
                      onChange={handleImageChange} />
      </Form.Group>

      <Container>
    <Row>
      {/* {mockData.map((data, index) => ( */}
        <Col md={4} 
        // key={index} 
        >
          <div className="img-card" 
          // onClick={() => handleClick(data.src)}
          >
            <Image style={{ width: '300px', height: "300px" }} thumbnail 
            // src={data.src}
             />
          </div>
        </Col>
      {/* )
     )} */}
    </Row>
  </Container>
    
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Property Description</Form.Label>
        <Form.Control as="textarea" 
                      required = {true}
                      rows={10} 
                      type="text" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Featured"  checked={featured} onChange={handleFeatured}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

