const product=require('../models/product');

async function addproduct(name,category,description,image,link)
{
    const newproduct=new product({
        name,
        category,
        description,
        image,
        link
    });
    await newproduct.save();
    return newproduct;    
}

async function getallproduct()
{
    const products=await product.find();
    return products;
}

module.exports={addproduct,getallproduct};