const {Project,FixedProject,CategoryProjectFixed,categoryProject} = require('../models/index')
const {Op} = require('sequelize')

class Controller {
    static async getProjectRent(req,res) {
        try {
            const data = await Project.findAll({
                include : [
                    categoryProject
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getProjectRentById(req,res) {
        try {
            const data = await Project.findOne({
                where : {
                    id : req.params.id
                }
            })
            if(!data) {
                throw {
                    name : 'Project not found'
                }
            }
            res.status(200).json(data)
         } catch (error) {
            console.log(error);
        }
    }
    static async getClientRentProject(req,res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const categoryProjectId = req.query.categoryProjectId; // Menggunakan parameter categoryProjectId
        const searchTerm = req.query.searchTerm;
      
        try {
          let whereClause = {};
      
          if (categoryProjectId) {
            const category = await categoryProject.findByPk(categoryProjectId); // Mencari kategori berdasarkan ID
            if (category) {
              whereClause.categoryProjectId = categoryProjectId; // Menyaring berdasarkan ID kategori jika ditemukan
            }
          }
          if (searchTerm) {
            whereClause[Op.or] = [
              { name: { [Op.iLike]: `%${searchTerm}%` } },
             
            ];
          }
          const { rows, count } = await Project.findAndCountAll({
            include: [
              categoryProject
            ],
            where: whereClause,
            limit: perPage,
            offset: (page - 1) * perPage
          },
          {
            
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
    static async postProjectRent(req,res) {
        try {
            // const url = req.body.embedVideo;
            
            const embedVideo = req.body.embedVideo.map(link => {
                const splitUrl = link.split("/reel/");
                return splitUrl.length > 1 ? splitUrl[1] : null;
              });
            //   console.log(reelIds);
            const {name,description,imgProject,mainImage,categoryProjectId} = req.body
            const data = await Project.create({
                name,
                description,
                imgProject,
                mainImage,
                categoryProjectId,
                embedVideo
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getCategoryProjectRent(req,res) {
        try {
            const data = await categoryProject.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postCategoryProjectRent(req,res) {
        try {
            const data = await categoryProject.create({
                name : req.body.name
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async updateProjectRent(req,res) {
        try {
            const {name,description,imgProject,mainImage,categoryProjectId} = req.body
            const {id} = req.params
            const data = await Project.findByPk(id)
            if (!data) {
                throw {
                    name : 'Project not found'
                }
            }
            await Project.update({
                name,
                description,
                imgProject,
                mainImage,
                categoryProjectId
            },{
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'updated successfuly'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async deletedProjectRent(req,res) {
        try {
            const {id} = req.params
            const data = await Project.findByPk(id)
            if (!data) {
                throw {
                    name : 'Project not found'
                }
            }
            await Project.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'deleted succesfully'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async deletedCategoryProjectRent(req,res) {
        try {
            const {id} = req.params
            const data = await categoryProject.findByPk(id)
            if (!data) {
                throw {
                    name : 'categoryProject not found'
                }
            }
            await categoryProject.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'deleted succesfully'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async getProjectFixed(req,res) {
        try {
            const data = await FixedProject.findAll({
                include : [
                    CategoryProjectFixed
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getClientFixedProject(req,res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const categoryProjectFixedId = req.query.categoryProjectFixedId; // Menggunakan parameter categoryProjectFixedId
        const searchTerm = req.query.searchTerm;
      
        try {
          let whereClause = {};
      
          if (categoryProjectFixedId) {
            const category = await CategoryProjectFixed.findByPk(categoryProjectFixedId); // Mencari kategori berdasarkan ID
            if (category) {
              whereClause.categoryProjectFixedId = categoryProjectFixedId; // Menyaring berdasarkan ID kategori jika ditemukan
            }
          }
          if (searchTerm) {
            whereClause[Op.or] = [
              { name: { [Op.iLike]: `%${searchTerm}%` } },
             
            ];
          }
          const { rows, count } = await FixedProject.findAndCountAll({
            include: [
              CategoryProjectFixed
            ],
            where: whereClause,
            limit: perPage,
            offset: (page - 1) * perPage
          },
          {
            
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
    static async getProjectFixedById(req,res) {
        try {
            const data = await FixedProject.findOne({
                where : {
                    id : req.params.id
                }
            })
            if(!data) {
                throw {
                    name : 'FixedProject not found'
                }
            }
            res.status(200).json(data)
         } catch (error) {
            console.log(error);
        }
    }
    static async postProjectFixed(req,res) {
        try {
            const {title,descTitle,imgProject,mainImage,embedVideo,categoryProjectFixedId} = req.body
            console.log(req.body);
            const data = await FixedProject.create({
                title,
                descTitle,
                imgProject,
                mainImage,
                categoryProjectFixedId,
                embedVideo
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postCategoryProjectFixed(req,res) {
        try {
            const data = await CategoryProjectFixed.create({
                name : req.body.name
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getCategoryProjectFixed(req,res) {
        try {
            const data = await CategoryProjectFixed.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async deletedCategoryProjectFixed(req,res) {
        try {
            const {id} = req.params
            const data = await CategoryProjectFixed.findByPk(id)
            if (!data) {
                throw {
                    name : 'CategoryProjectFixed not found'
                }
            }
            await CategoryProjectFixed.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'deleted succesfully'
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller