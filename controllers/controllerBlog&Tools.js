const { Sequelize } = require('sequelize');
const {Blogs,Tools,toolsCategory} = require('../models/index')


class Controller {
    static async getblogs(req,res) {
        try {
            const limit = 4; 
            const data = await Blogs.findAll({
                order: Sequelize.literal('RANDOM()'), 
                limit: limit,
            });
    
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async readBlogs(req,res) {
        try {
            const data = await Blogs.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getClientBlogs(req,res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10
        const searchTerm = req.query.searchTerm;
      
        try {
          let whereClause = {};
      
          if (searchTerm) {
            whereClause[Op.or] = [
              { name: { [Op.iLike]: `%${searchTerm}%` } },
             
            ];
          }
          const { rows, count } = await Blogs.findAndCountAll({
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
    static async postBlogs(req,res) {
        try {
            const {name,image,desc,urls} = req.body 
            const data = await Blogs.create({
                name,
                image,
                desc,
                urls
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getBlogsId(req,res) {
        try {
            const {id} = req.params
       
            const data = await Blogs.findByPk(id)
            if(!data) {
                throw {
                    name : 'Blogs not found'
                }
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async updateBlogs(req,res) {
        try {
            const {id} = req.params
            const {name,image,desc} = req.body 
            const data = await Blogs.findByPk(id)
            if(!data) {
                throw {
                    name : 'Blogs not found'
                }
            }
            await Blogs.update({
                name,
                image,
                desc
            })
            res.status(200).json({
                msg : 'Updated Successufly'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteBlogs(req,res) {
        try {
            const {id} = req.params
            const data = await Blogs.findByPk(id)
            if(!data) {
                throw {
                    name : 'Blogs not found'
                }
            }
            await Blogs.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : "Deletes Successfuly"
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async getTools(req,res) {
        try {
            const data = await Tools.findAll({
                include : [
                    toolsCategory
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getClientTools(req,res) {
        try {
            const categoryId = req.query.category_id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const searchQuery = req.query.search;
        
            const options = {
              include: [{
                model: toolsCategory,
                attributes: ['id', 'name'],
              }],
            };
        
            let tools = await Tools.findAll(options);
        
            if (categoryId) {
              tools = tools.filter(tool => tool.toolsCategoryId == categoryId);
            }
        
            if (searchQuery) {
              tools = tools.filter(tool => tool.name.includes(searchQuery));
            }
        
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedTools = tools.slice(startIndex, endIndex);
        
            res.json({
              tools: paginatedTools,
              totalItems: tools.length,
              currentPage: page,
              totalPages: Math.ceil(tools.length / limit),
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
      }
    static async postTools(req,res) {
        try {
            const {name,link,toolsCategoryId} = req.body
            const data = await Tools.create({
                name,
                link,
                toolsCategoryId
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteTools(req,res) {
        try {
            const {id} = req.params
            const data = await Tools.findByPk(id)
            if(!data) {
                throw {
                    name : 'Tools not found'
                }
            }
            await Tools.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'Deleted Succesfully'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async updateTools(req,res) {
        try {
            const {id} = req.params
            const {name,link} = req.body 
            const data = await Tools.findByPk(id)
            if(!data) {
                throw {
                    name : 'Tools not found'
                }
            }
            await Tools.update({
                name,
                link
            })
            res.status(200).json({
                msg : 'Updated Successufly'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async getToolsId(req,res) {
        try {
            const {id} = req.params
       
            const data = await Tools.findByPk(id)
            if(!data) {
                throw {
                    name : 'Tools not found'
                }
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async postCategoryTools(req,res) {
        try {
            const {name} = req.body
            const data = await toolsCategory.create({
                name,
                
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getCategoryTools(req,res) {
        try {
            const data = await toolsCategory.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    
}



module.exports = Controller