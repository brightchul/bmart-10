pm2 stop backend

cd project/bmart-10/

git pull origin release

cd backend/
yarn install

pm2 start backend