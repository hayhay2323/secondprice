// This file would handle authentication in a real application
// For now, it's a placeholder

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db/connect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  // Check request method
  if (req.method === 'POST') {
    try {
      const { action } = req.query;
      
      // Login endpoint
      if (action === 'login') {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        
        // Check if user exists
        if (!user) {
          return res.status(401).json({ 
            success: false, 
            message: '電郵地址或密碼不正確' 
          });
        }
        
        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return res.status(401).json({ 
            success: false, 
            message: '電郵地址或密碼不正確' 
          });
        }
        
        // Generate JWT token
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        );
        
        return res.status(200).json({
          success: true,
          user: {
            id: user._id,
            email: user.email,
            username: user.username
          },
          token
        });
      } 
      
      // Register endpoint
      else if (action === 'register') {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ 
          $or: [{ email }, { username }]
        });
        
        if (existingUser) {
          return res.status(400).json({ 
            success: false, 
            message: '電郵地址或用戶名稱已被使用' 
          });
        }
        
        // Create new user
        const user = await User.create({
          username,
          email,
          password
        });
        
        // Generate JWT token
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        );
        
        return res.status(201).json({
          success: true,
          user: {
            id: user._id,
            email: user.email,
            username: user.username
          },
          token
        });
      }
      
      // Invalid action
      else {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid action' 
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
  } else {
    // Return error for non-POST requests
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }
} 