'use strict';
const {
  Model
} = require('sequelize');
const validator = require('validator')
const {hash} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    email:{
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        args : true , msg : 'email has already in use'
      },
      validate : {
        notEmpty : {
          msg : 'email is required'
        },
        notNull : {
          msg : 'email is required'
        },
        isEmail : {
          args : true , msg : 'must be e-mail format'
        }
    },
  }, 
    fullName:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Name is required'
        },
        notNull : {
          msg : 'Name is required'
        },
      }
    }, 
    password :{
     type :  DataTypes.STRING,
     allowNull : false,
     validate : {
       notEmpty : {
         msg : 'password is required'
       },
       notNull : {
         msg : 'password is required'
       },
       len : {
         args : [5,Infinity],
         msg : 'character password minimum 5'
       }
     }
    },
    noHp : {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        isIndonesianPhoneNumber(value) {
          if (!validator.isMobilePhone(value, 'id-ID')) {
            throw new Error('Nomor handphone tidak valid');
          }
        },
        notEmpty : {
          msg : 'phoneNumber is required'
        },
        notNull : {
          msg : 'phoneNumber is required'
        },
        
      }
    }, 
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate(user => {
    user.password = hash(user.password)
  })
  return Admin;
};