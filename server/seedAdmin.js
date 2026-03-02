const mongoose = require('mongoose');
const UsersModel = require('./models/UsersModel');
const bcrypt = require('bcrypt'); 

require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);

    const email = 'admin@test.ru';

    const existing = await UsersModel.findOne({ email });
    if (existing) {
      console.log('Администратор уже существует');
      return;
    }

    const password = 'admin'; 
    const passwordHash = await bcrypt.hash(password, 10);

    await UsersModel.create({
        username: 'Сергей Семёнов',
        email,
        passwordHash,
        role: 'admin',
    });

    console.log('Администратор создан');
    console.log('Email:', email);
    console.log('Пароль:', password);
  } catch (e) {
    console.error('Ошибка при создании админа:', e);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();