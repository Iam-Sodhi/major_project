import express from 'express';
import { createListing, getListings, purchaseListing, myListings, myPurchases } from '../controllers/marketplaceController.js';
import authUser from '../middlewares/authUser.js';

const marketplaceRouter = express.Router();

marketplaceRouter.post('/list', authUser, createListing);
marketplaceRouter.get('/listings', getListings);
marketplaceRouter.post('/purchase', authUser, purchaseListing);
marketplaceRouter.get('/mylistings', authUser, myListings);
marketplaceRouter.get('/mypurchases', authUser, myPurchases);

export default marketplaceRouter;
