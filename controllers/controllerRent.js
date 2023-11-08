const { Rent, categoryRent, SubCategoryRent } = require("../models/index");
const fs = require("fs");
const path = require("path");
class Controller {
  static async getRent(req, res) {
    try {
      const data = await Rent.findAll({
        include: [
          {
            model: SubCategoryRent,
            include: [
              {
                model: categoryRent,
              },
            ],
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async postRent(req, res) {
    try {
      const {
        name,
        price,
        smallImg1,
        smallImg2,
        smallImg3,
        smallImg4,
        embedVideo,
        img1,
        img2,
        img3,
        img4,
        subCategoryId,
        details,
      } = req.body;
      if (req.files === null)
        return res.status(400).json({ msg: "No File Uploaded" });
      const file = req.files.file;
      //   console.log(file);
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/Rent/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });

      file.mv(`./public/Rent/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
          await Rent.create({
            name: name,
            imgProduct: fileName,
            url: url,
            subCategoryId: subCategoryId,
            price : price,
            details : details,
            smallImg1 : smallImg1,
            smallImg2 : smallImg2,
            smallImg3 : smallImg3,
            smallImg4 : smallImg4,
            embedVideo : embedVideo , 
            img1 : img1,
            img2 : img2 ,
            img3 : img3,
            img4 : img4

          });
          res.status(201).json({ msg: "Product Created Successfuly" });
        } catch (error) {
          console.log(error.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async postCategoryRent(req, res) {
    try {
      const data = await categoryRent.create({
        name: req.body.name,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async updateRent(req, res) {
    try {
      const {
        name,
        price,
        smallImg1,
        smallImg2,
        smallImg3,
        smallImg4,
        embedVideo,
        img1,
        img2,
        img3,
        img4,
        subCategoryId,
        details,
      } = req.body;
      const product = await Rent.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = product.imgProduct;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/Rent/${product.imgProduct}`;
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
      }

        file.mv(`./public/Rent/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const url = `${req.protocol}://${req.get("host")}/Rent/${fileName}`;
    
    try {
        await Rent.update({
            name: name,
            imgProduct: fileName,
            url: url,
            subCategoryId: parseInt(subCategoryId),
            price : price,
            details : details,
            smallImg1 : smallImg1,
            smallImg2 : smallImg2,
            smallImg3 : smallImg3,
            smallImg4 : smallImg4,
            embedVideo : embedVideo , 
            img1 : img1,
            img2 : img2 ,
            img3 : img3,
            img4 : img4
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Updated Successfuly"});
    } catch (error) {
      console.log(error);
        console.log(error.message);
    }

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  static async getCategoryRent(req, res) {
    try {
      const data = await categoryRent.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteRent(req, res) {
    const product = await Rent.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    try {
      if (!product.imgProduct) {
        const filepath = `./${product.imgProduct}`;
        fs.unlinkSync(filepath);
      }
      await Rent.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ msg: "Product Deleted Successfuly" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  static async postSubCategoryRent(req, res) {
    try {
      const data = await SubCategoryRent.create({
        name: req.body.name,
        categoryRentId: req.body.categoryRentId,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async getSubCategory(req, res) {
    try {
      const data = await SubCategoryRent.findAll({
        include: [categoryRent],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async getRentDetail(req, res) {
    try {
      const { id } = req.params;
      const data = await Rent.findByPk(id, {
        include: [SubCategoryRent],
      });
      if (!data) {
        throw {
          name: "Product not found",
        };
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteSubCategoryRent(req, res) {
    try {
      const product = await SubCategoryRent.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) {
        throw {
          name: "Product Not found",
        };
      }
      await SubCategoryRent.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        msg: "SubCategory deleted Successfuly",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
