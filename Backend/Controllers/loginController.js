const connection = require('../Database/databaseConnection');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const query = promisify(connection.query).bind(connection);

async function register(username, password, email) {
    try {
        const rows = await query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        if (rows.length > 0) {
            return { success: false, message: 'Username or email already exists' };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await query(
            'INSERT INTO users (username, password, email, isValid) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email, false]
        );
        if (result.affectedRows > 0) {
            const verificationToken = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1d' }); 
            sendVerificationEmail(email, verificationToken);
            return { success: true, message: 'User registered successfully' };
        } else {
            return { success: false, message: 'User registration failed' };
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'An error occurred during registration' };
    }
}

async function login(username, password) {
    try {
        const [rows] = await query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        if (!rows || rows.length === 0) {
            return { success: false, message: 'Username not found' };
        }
        const user = {
            id: rows.id,
            username: rows.username,
            email: rows.email,
            password: rows.password,
            isValid: rows.isValid
        };
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { success: false, message: 'Incorrect password' };
        }
        if (!user.isValid) {
            const verificationToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' }); 
            sendVerificationEmail(user.email, verificationToken);
            return { success: false, message: 'User account is not validated! Check your Emails' };
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        return { success: true, message: 'Login successful', token, user: { username: user.username, email: user.email } };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: 'An error occurred during login' };
    }
}

const validateToken = (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.json({ success: true, message: 'Token is valid' });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }
};

async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.EMAILPASS
        }
    });
    verificationToken = jwt.sign({ email: email}, process.env.SECRET_KEY, { expiresIn: '1d' });
    const mailOptions = {
        from: 'support@euro-2024.com',
        to: email,
        subject: 'Account Verification EURO 2024 ALBUM',
        html: `<body style="height: 100%; margin: 0; padding: 0; background-color: #1d4ed8; font-family: Arial, sans-serif;">
                    <div style="text-align: center; padding-top: 10px;">
                        <img src="https://img.uefa.com/imgml/uefacom/euro2024/rebrand/newlogo_onDark.png" alt="Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
                        <br>
                        <a href="${process.env.VERIFYLINK}?token=${verificationToken}" 
                            style="background-color: #1d4ed8; color: white; text-decoration: none; font-weight: bold; font-size: 30px; 
                                   display: inline-block; padding: 10px 20px; border-radius: 5px; text-shadow: 0 0 10px black;">
                            Verify Account
                        </a>
                    </div>
                </body>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const verifyAccount = async (req, res) => {
    const token = req.query.token; 
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const email = decoded.email;
      const result = await query(
        'UPDATE users SET isValid = ? WHERE email = ?',
        [true, email]
      );
      if (result.affectedRows > 0) {
        return res.json({ success: true, message: 'Account verified successfully' });
      } else {
        return res.status(400).json({ success: false, message: 'Account verification failed' });
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }
  };

module.exports = { register,login,validateToken,verifyAccount };
