//configuración
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
server.use(express.json({limit: '25mb'}));

const PORT = 3001;
server.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});

//rutas endpoints -> API
const staticUrl = "./src/public";
server.use(express.static(staticUrl));


//endpoint: get data from api

const fakeData = [
    {
        "name": "Gravity Screen",
        "slogan": "Responsive Design",
        "technologies": "Figma - HTML - CSS",
        "repo": "https://github.com",
        "demo": "https://google.com",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis. Etiam vestibulum lectus sagittis, sagittis ligula quis, viverra ligula.",
        "autor": "Pepa Jeison",
        "job": "UX Designer",
        "image": "https://www.pixeden.com/media/k2/galleries/1383/001-devices-presentation-app-screens-project-showcase-graphic-psd-mockup.jpg",
        "photo": "https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
      },
      {
        "name": "Abstract",
        "slogan": "Project Presentation Scene",
        "technologies": "HTML - SCSS - JS",
        "repo": "https://github.com",
        "demo": "https://google.com",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis. Etiam vestibulum lectus sagittis, sagittis ligula quis, viverra ligula.",
        "autor": "Maricarmen",
        "job": "UX - UI Designer",
        "image": "https://images.pixeden.com/images/abstract-ui-project-scene-mockup-3_full_preview_retina.jpg",
        "photo": "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg"
      },
      {
        "name": "Nostalgia",
        "slogan": "Retro Designs",
        "technologies": "Adobe Suite - JS - HTML",
        "repo": "https://github.com",
        "demo": "https://dribbble.com/shots/17356647-Nostalgia",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis. Etiam vestibulum lectus sagittis, sagittis ligula quis, viverra ligula.",
        "autor": "Alexandra Sasha Pryakhina",
        "job": "Designer",
        "image": "https://cdn.dribbble.com/users/3344616/screenshots/17356647/media/eb2cf135bd1532868019917c06760f85.png?resize=1600x1200&vertical=center",
        "photo": "https://cdn.dribbble.com/users/3344616/avatars/normal/ecebaceeb5872d6afcdf04e4c73c8f38.png?1683199928"
      },
      {
        "name": "Milkshake Script Font",
        "slogan": "Modern handwritten script",
        "technologies": "Adobe suite",
        "repo": "https://github.com",
        "demo": "https://google.com",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis. Etiam vestibulum lectus sagittis, sagittis ligula quis, viverra ligula.",
        "autor": "Mila Garet",
        "job": "Typographer",
        "image": "https://cdn.dribbble.com/userupload/9938969/file/original-739b1cfebafdc2a5d748dee42cb0a95f.jpg?resize=1504x1003",
        "photo": "https://d3ui957tjb5bqd.cloudfront.net/images/users/278/2781/2781969/avatar-75-75-r.jpg?1661853722"
      },
      {
        "name": "Eighties Comeback",
        "slogan": "A beautifully retro typeface",
        "technologies": "Adobe Suite - JS - HTML",
        "repo": "https://github.com",
        "demo": "https://google.com",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis. Etiam vestibulum lectus sagittis, sagittis ligula quis, viverra ligula.",
        "autor": "Nicky Laatz",
        "job": "Graphic Designer",
        "image": "https://cdn.dribbble.com/users/48541/screenshots/17862119/media/65fa42866c12ecb8c6369ddc353fd233.jpg?resize=1600x1200&vertical=center",
        "photo": "https://cdn.dribbble.com/users/48541/avatars/normal/69cfae565cf79b76d879e30befb39d0a.jpg?1647000968"
      },
      {
        "name": "Apple Presentation",
        "slogan": "Alternative iPhone presentation",
        "technologies": "Photoshop",
        "repo": "https://github.com",
        "demo": "https://google.com",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis.",
        "autor": "Sergio Casas",
        "job": "Designer",
        "image": "https://www.pixeden.com/media/k2/galleries/1383/001-devices-presentation-app-screens-project-showcase-graphic-psd-mockup.jpg",
        "photo": "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
      },
      {
        "name": "Make Friends, Eat Bagels",
        "slogan": "Message by the Creative Pain",
        "technologies": "Adobe Illustrator",
        "repo": "https://github.com",
        "demo": "https://google.com",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare vulputate tellus, vel luctus dolor suscipit quis. Etiam vestibulum lectus sagittis, sagittis ligula quis, viverra ligula.",
        "autor": "Tyler Pate",
        "job": "Illustraor & Designer",
        "image": "https://cdn.dribbble.com/userupload/14615426/file/original-8eb64ce9f964eccb43a6743a2d209f20.jpg?resize=1504x1128",
        "photo": "https://cdn.dribbble.com/users/508142/avatars/normal/1cffa29a3f16e934e3b310ce18ad2c6d.jpg?1696372002"
      }
];

server.get("/getprojects", (req, res)=>{
    
    res.json({ data: fakeData, count: fakeData.length});
});

//endpoint: post new project

server.post("/newproject", (req, res)=>{
    const newProject = req.body;
    fakeData.push(newProject);
    res.json({message: "Project created successfully", data: req.body, array: fakeData});
});

//endpoint: pagina detalle:
server.get("/detailProject", ()=>{
 //aquí se puede crear otro array fake, pero es mejor dejarlo sin rellenar, es un pollo
})

//endpoint: delete

server.delete("/delete", ()=>{})

//servidores de estáticos
