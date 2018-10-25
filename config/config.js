require('dotenv').config();

CONFIG = {};

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || '123@123';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

CONFIG.SPEED_SMS_URL = 'api.speedsms.vn';
CONFIG.SPEED_SMS_AUTH_TOKEN = '8GnLUYn3_nEaKIySzEH9sA5bfCOXrGQL';
CONFIG.SPEED_SMS_TYPE = 2;
CONFIG.EXPIRATION_SMS_CODE = 600000;
CONFIG.UPLOAD_FOLDER = '../client/public/images';

