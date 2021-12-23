const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const emailCheck = await User.findOne({ email: email });
      const usernameCheck = await User.findOne({ username: username });

      if (emailCheck)
        return res.status(400).json({ msg: 'The email already exists.' });
      if (usernameCheck)
        return res.status(400).json({ msg: 'The username already exists.' });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        password: passwordHash,
      });
      await newUser.save();
      res.json({ msg: 'Sign up Success' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' });

      // if login success create token
      const payload = { id: user._id, email: user.email };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '7d',
      });

      res.json({ token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header('Authorization');
      //   const token =
      //     req.body.token || req.query.token || req.headers['x-access-token'];
      //   if (!token) return res.send(false);
      if (!token) return res.status(400).send('no token');

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        // if (err) return res.send(false);
        if (err) return res.status(400).send('err');

        const user = await User.findById(verified.id);
        // if (!user) return res.send(false);
        if (!user) return res.status(400).send('no user');

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsername: async (req, res) => {
    try {
      const users = await User.findById(req.params.id);
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
