# customer-feedback

A full-stack web application where customers can give feedbacks without authentication(as a guest). The admins will have to register/login themselves to view all the feedbacks submitted.

## Technologies used
- Frontend: React.js, React Router, Axios, Yup
- Backend: Node.js, JWT, Express
- Database: MongoDB Atlas

## Endpoints built & consumed

### `POST /login` - Login as an Admin.

Body
```json
{
    "email": "john.doe@gmail.com",
    "password": "123456"
}
```
Response
```json
{
    "_id": "6524ed3807d9349ca9fcb28d",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@gmail.com",
    "password": "$2a$10$XgX/UdtUy.J2uMm37Ewpe.5y1RWtGNDVe9OEkKu91XDHnzvKQcZmC",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjUyNGVkMzgwN2Q5MzQ5Y2E5ZmNiMjhkIiwiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE2OTY5NzI5MDIsImV4cCI6MTY5Njk4MDEwMn0.nFqkeSfZjOAkffcwndNsHCP5MDisEtfs8QMb82FVJZE"
}
```

### `POST /register` - Register as an Admin.

Body
```json
{
    "firstName": "Jazz",
    "lastName": "Singh",
    "email": "jazz.test@gmail.com",
    "password": "123456" 
}
```
Response
```json
{
    "firstName": "Jazz",
    "lastName": "Singh",
    "email": "jazz.test@gmail.com",
    "password": "$2a$10$f8Smhg91XOCNbiApLEO/7etOu1Y9m1Hd2nSH73Gwf3udEb19PRTUe",
    "_id": "6525a8cc198e459d4b250c88",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjUyNWE4Y2MxOThlNDU5ZDRiMjUwYzg4IiwiZW1haWwiOiJqYXp6LnRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjk2OTY2ODYwLCJleHAiOjE2OTY5NzQwNjB9.EE9-5TxJRDPo9NjmYWJLw0sfToNvp2-TLv_hIOQbzII"
}
```

### `POST /feedback/save` - Submit a feedback to the database.

Body
```json
{
    "name": "Cierra",
    "email": "cierra@test.com",
    "company": "British Telecom",
    "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}
```
Response
```json
{
    "status": "success",
    "message": "feedback submitted succesfully!"
}
```

### `GET /feedback/all` - Fetch all feedbacks from the database.

Request Headers

`x-access-token`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjUyNGVkMzgwN2Q5MzQ5Y2E5ZmNiMjhkIiwiZW1haWwiOiJqb2huLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE2OTY5ODg0MjgsImV4cCI6MTY5Njk5NTYyOH0.LzwCRIGxVzfLwWV1URZHFJhvSzxlzsDJ4B4K9MWiFT0

Response
```json
{
    "status": "success",
    "feedbacks": [
        {
            "_id": "6525e2b6eaf9e4f2e3a6e019",
            "name": "Cierra",
            "email": "cierra@test.com",
            "company": "British Telecom",
            "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "__v": 0
        },
        {
            "_id": "6525fc5c646ce7c53b6c8403",
            "name": "Piyush",
            "email": "piyush@test.com",
            "company": "ABC Inc",
            "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "__v": 0
        }
    ]
}
```

