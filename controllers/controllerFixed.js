const {Fixed,categoryFixed,Brand} = require("../models/index")
const fs = require('fs')
const path = require('path')
const {Op} = require('sequelize')
class Controller {
    static async getFixed(req,res) {
        try {
            const data = await Fixed.findAll({
                include : [
                    {
                        model : Brand,
                        include : [
                            {
                                model : categoryFixed
                            }
                        ]
                    }
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getClientFixed(req,res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const BrandId = req.query.BrandId; // Menggunakan parameter BrandId
        const searchTerm = req.query.searchTerm;
      
        try {
          let whereClause = {};
      
          if (BrandId) {
            const category = await Brand.findByPk(BrandId); // Mencari kategori berdasarkan ID
            if (category) {
              whereClause.BrandId = BrandId; // Menyaring berdasarkan ID kategori jika ditemukan
            }
          }
          if (searchTerm) {
            whereClause[Op.or] = [
              { name: { [Op.iLike]: `%${searchTerm}%` } },
             
            ];
          }
          const { rows, count } = await Fixed.findAndCountAll({
            where: whereClause,
            limit: perPage,
            offset: (page - 1) * perPage
          });
      
          res.json({
            totalPages: Math.ceil(count / perPage),
            currentPage: page,
            data: rows
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    static async getFixedById(req,res) {
        try {
            const {id} = req.params
            const data = await Fixed.findByPk(id,{
                include : [
                    Brand
                ]
            })
            if(!data) {
                throw{
                    name : 'Product not found'
                }
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postFixed(req,res) {
        try {
            const {
              name,
              smallImg1,
              smallImg2,
              smallImg3,
              smallImg4,
              embedVideo,
              img1,
              img2,
              img3,
              img4,
              BrandId,
              details,
            } = req.body;
            if (req.files === null)
              return res.status(400).json({ msg: "No File Uploaded" });
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;
            const url = `${req.protocol}://${req.get("host")}/Fixed/${fileName}`;
            const allowedType = [".png", ".jpg", ".jpeg"];  
            if (!allowedType.includes(ext.toLowerCase()))
              return res.status(422).json({ msg: "Invalid Images" });
            if (fileSize > 5000000)
              return res.status(422).json({ msg: "Image must be less than 5 MB" });
            file.mv(`./public/Fixed/${fileName}`, async (err) => {
              if (err) return res.status(500).json({ msg: err.message });
              try {
                await Fixed.create({
                  name: name,
                  imgProduct: fileName,
                  url: url,
                  BrandId: BrandId,
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
    static async postBrand(req,res) {
        try {
            const data = await Brand.create({
                name:req.body.name,
                imgBrand : req.body.imgBrand,
                categoryFixedId : req.body.categoryFixedId
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postCategoryFixed(req,res) {
        try {
            const data = await categoryFixed.create({
                name:req.body.name,
               
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getBrand(req,res) {
        try {
            const data = await Brand.findAll({
                include : [
                    categoryFixed

                ]
                
            })
            res.status(200).json(data)
        } catch (error) {
           console.log(error);
        }
    }
    static async getCategoryFixed(req,res) {
        try {
            const data = await categoryFixed.findAll()
            res.status(200).json(data)
        } catch (error) {
           console.log(error);
        }
    }
    static async deleteFixed(req,res) {
        const product = await Fixed.findOne({
            where:{
                id : req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "No Data Found"});
    
        try {
            if(!product.imgProduct) {
                const filepath = `./${product.imgProduct}`;
                fs.unlinkSync(filepath);
            }
            await Fixed.destroy({
                where:{
                    id : req.params.id
                }
            });
            res.status(200).json({msg: "Product Deleted Successfuly"});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({msg: "Internal Server Error"});
        }
    }
    static async updateFixed(req, res) {
        try {
            const {
                name,
                smallImg1,
                smallImg2,
                smallImg3,
                smallImg4,
                embedVideo,
                img1,
                img2,
                img3,
                img4,
                BrandId,
                details,
            } = req.body;
    
            const product = await Fixed.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!product) return res.status(404).json({ msg: "No Data Found" });
    
            let fileName = "";
    
            if (req.files === null) {
                fileName = product.imgProduct; // Gunakan product.imgProduct jika tidak ada file baru
            } else {
                const file = req.files.file;
                const fileSize = file.data.length;
                const ext = path.extname(file.name);
                fileName = file.md5 + ext;
                const allowedType = ['.png', '.jpg', '.jpeg'];
    
                if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
                if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });
    
                const filepath = `./public/Fixed/${product.imgProduct}`;
    
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
    
                file.mv(`./public/Fixed/${fileName}`, (err) => {
                    if (err) return res.status(500).json({ msg: err.message });
                });
            }
    
            const url = `${req.protocol}://${req.get("host")}/Fixed/${fileName}`;
    
            try {
                await Fixed.update({
                    name: name,
                    imgProduct: fileName,
                    url: url,
                    BrandId: BrandId,
                    details: details,
                    smallImg1: smallImg1,
                    smallImg2: smallImg2,
                    smallImg3: smallImg3,
                    smallImg4: smallImg4,
                    embedVideo: embedVideo,
                    img1: img1,
                    img2: img2,
                    img3: img3,
                    img4: img4
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({ msg: "Product Updated Successfully" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal Server Error" });
            }
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
    
    
}

module.exports = Controller