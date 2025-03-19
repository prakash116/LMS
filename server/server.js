import express from 'express';
import 'dotenv/config';
import db from './utils/database/db.js';
import adminRouter from './utils/router/admin.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import facultyRouter from './utils/router/faculty.routes.js';
import courseRouter from './utils/router/course.routes.js';
import studentRouter from './utils/router/student.routes.js';
import cookieParser from 'cookie-parser';
import fs from "fs"
import renderApi from './utils/reder/callApi.js';
import loginRouter from './utils/router/login.routes.js';
import path from 'path';
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: (_, callback) => {
      callback(null, true);
    },
    credentials: true,
  }));

  
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())


// ! Middleware log create
const file = fs.createWriteStream("./utils/logs/logs.txt", {flags: "a"})
// Use external library
// app.use(morgan("combined", {stream: file}));

const logger = (req, res, next ) => {
    if(req){
        const method = req.method;
        const url = req.url;
        const currentDate = new Date().toDateString();
        // console.log(`${currentDate} - ${method} - ${url}`)
        const log = `${currentDate} - ${method} - ${url}\n`
        file.write(log, (err) => {
            if(err)
                console.error(`Error writing log: ${err}`)
            else
                console.log(`Log saved successfully`)
        })
        next();
    }else(
        console.error("Request object is not defined")
    )
}

app.use(logger);


app.use('/api/v1', adminRouter);
app.use('/api/v1', facultyRouter);
app.use('/api/v1', courseRouter);
app.use('/api/v1', studentRouter);
app.use('/api/v1/', loginRouter)
app.use('/', renderApi)

// Static Path
const staticAdminPath = path.join("public/admin")
const staticFacultyPath = path.join("public/faculty")
const staticStudentPath = path.join("public/student")
const staticCoursePath = path.join("public/course")
app.use('/admin', express.static(staticAdminPath));
app.use('/faculty', express.static(staticFacultyPath));
app.use('/student', express.static(staticStudentPath))
app.use('/course', express.static(staticCoursePath))

app.set('view engine','ejs');

app.get('/product', (req, res) =>{
    return res.render('product');
})
const invalidRoute = (req, res) =>{
    return res.render("index")
}


app.all("*", invalidRoute);


 
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
    db()
});
