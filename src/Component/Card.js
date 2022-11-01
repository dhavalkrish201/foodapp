import React, { useState } from 'react'
import { Box, TextField, Typography, Button, Card, CardMedia, CardContent, CardActions} from '@mui/material';

import '../App.css'

const FoodCard = () => {



    const [foodItems, setfoodItems] = useState([{
        id: new Date().getTime().toString(),
        name: "",
        ing: "",
        url: ""

    }])
    console.log("fooditems", foodItems);

    const [foodAllData, setFoodAllData] = useState([]);
    console.log("data", foodAllData);

    const ProductData = (e) => {

        setfoodItems({ ...foodItems, [e.target.name]: [e.target.value], id: new Date().getTime().toString() })

    }

    const [toggleSubmit, setToggleSubmit] = useState(true);

    const [updateProduct, setUpdateProduct] = useState(null)

    const UpdateData = (updateId) => {

        let NewUpdateItem = foodAllData.find((elem) => {

            return elem.id === updateId;
        });

        console.log(NewUpdateItem);
        setToggleSubmit(false);
        setfoodItems(NewUpdateItem);
        setUpdateProduct(updateId);

    }

    const DeleteData = (deleteid) => {


        const DeleteItem = foodAllData.filter((item) => item.id !== deleteid)
        setFoodAllData(DeleteItem);



    }




    const SubmitData = (e) => {

        const { name, ing, url } = foodItems;

        if (!foodItems) {
            alert("Please fill Product Details");
        } else if (foodItems && !toggleSubmit) {

            setFoodAllData(

                foodAllData.map((item) => {

                    if (item.id === updateProduct) {

                        return { ...item, name, ing, url }
                    }

                    return item;

                })
            )
            setToggleSubmit(true);
            setfoodItems({ name: "", ing: "", url: "" })
            setUpdateProduct(null);
        }
        else {

            e.preventDefault();
            setFoodAllData([...foodAllData, foodItems]);
            setfoodItems({ name: "", ing: "", url: "" })

        }

    }

    return (
        <div className='App'>
            <Box className='Appheader' style={{ border: "2px solid white", width: "300px", height: "400px", padding: "20px" }}>
                <h3 className='Product'  >Product Details</h3>
                <Typography sx={{ textAlign: 'left', paddingLeft: "10px" }}>Product Name</Typography>
                <TextField id="name" name="name" value={foodItems.name} onChange={ProductData} placeholder='Enter Your Product Name' variant='outlined' className='textfield' sx={{ input: { color: 'white' }, borderColor: "white", width: "250px", border: '1px solid white', borderRadius: 4 }} />


                <Typography sx={{ textAlign: 'left', paddingLeft: "10px", paddingTop: "10px" }}>Product ingredient</Typography>
                <TextField id="ing" name="ing" value={foodItems.ing} onChange={ProductData} placeholder='Enter Your Product ingredient' variant='outlined' className='textfield' sx={{ input: { color: 'white' }, borderColor: "white", width: "250px", border: '1px solid white', borderRadius: 4 }} />


                <Typography sx={{ textAlign: 'left', paddingLeft: "10px", paddingTop: "10px" }}>Product image URL</Typography>
                <TextField id="url" name="url" value={foodItems.url} onChange={ProductData} placeholder='Enter Your Product Image URL' variant='outlined' className='textfield' sx={{ input: { color: 'white' }, borderColor: "white", width: "250px", border: '1px solid white', borderRadius: 4 }} />



                <Typography sx={{ paddingTop: "15px", textAlign: 'left', paddingLeft: "30px" }}></Typography>
                {
                    toggleSubmit ? <Button sx={{ width: "20px" }} variant="contained" onClick={SubmitData}>Save</Button> : <Button sx={{ width: "20px" }} variant="contained" onClick={(updateId) => SubmitData(updateId)}>Update</Button>
                }


            </Box>

            {

                foodAllData.map((item, index) => {

                    return (

                        <div>
                            <h2>Product Card</h2>

                            <Card>
                                <CardMedia
                                    component='img'
                                    height='100px'
                                    src={item.url}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h5' component='div'>
                                        {item.name}
                                    </Typography>

                                    <Typography variant='body2' color='text.secondary'>
                                        {item.ing}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant='outlined' color='primary' size='small' onClick={() => UpdateData(item.id)}>Update</Button>
                                    <Button variant="outlined" color='secondary' size='small' onClick={() => DeleteData(item.id)}>Delete</Button>


                                </CardActions>
                            </Card>

                        </div>

                    )

                })
            }
        </div>
    )
}

export default FoodCard