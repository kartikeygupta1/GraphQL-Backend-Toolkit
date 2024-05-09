const { gql } = require('apollo-server-express');
const ProductModel = require("./models/productSchema");

const { default: mongoose } = require('mongoose');

exports.typeDefs = gql
  `type Product {
    category: String!
    productName: String!
    price: Int!
    colors: [String!]
}
type Query {
    getProductsList: [Product]
    getProduct(id: ID!): Product
}
type Mutation {
    updateProduct(id: ID ,category: String, productName: String, price: Int, colors: [String], imgPath: String): Product
    addProduct(category: String, productName: String, price: Int, colors: [String!], imgPath: String): Product
    deleteProduct(id: ID!): Boolean!
} `

const db_url = 'mongodb+srv://user:ayush@cluster0.2ue1csn.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0';


const connect = async () => {
  await mongoose.connect(db_url, { useNewUrlParser: true });
}



// resolver

exports.resolvers = {
  Query: {

    getProductsList: async (parent, args) => {
      await connect();
      const result = ProductModel.find({}).then((res) => {
        if (res) {
          console.log(res);
          return res;
        }
      })
      return result;

    },
    getProduct: async (parent, args) => {
      await connect();
      const result = ProductModel.findById(args.id).then((res) => {
        if (res) {
          return res;
        }
      })
      return result;

    }
  },

  Mutation: {
    updateProduct: async (parent, args) => {
      await connect();
      const result = ProductModel.findByIdAndUpdate(args.id,
        {
          productName: args.productName,
          category: args.category,
          price: args.price,
          imgPath: args.imgPath,
          colors: args.colors
        }, { new: true }).then((res) => {
          if (res) {
            return res;
          }
        })
      return result;
    },
    addProduct: async (parent, args) => {
      await connect();
      let product = new ProductModel({
        productName: args.productName,
        category: args.category,
        price: args.price,
        imgPath: args.imgPath,
        colors: args.colors
      });
      const result = product.save().then((res) => {
        console.log(res);
        return res;
      })
      return result;
    },
    deleteProduct: async (parent, args) => {
      try {
        await connect();
        await ProductModel.findOneAndRemove({ _id: args.id });
        return true;
      } catch (error) {
        console.log('Error while delete:', error);
        return false;
      }

    }
  }
}
