const express = require("express") // impor modul express
const app = express() // inisialisasi express
const port = 3000 // port

// route/
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

//route/about
app.get("/about", (req, res)=>{
    res.sendFile(__dirname + "/about.html");
});

//route/contact
app.get("/contact", (req, res)=>{
    res.sendFile(__dirname + "/contact.html");
});

// route /mahasiswa
app.get("/mahasiswa", (req, res) => {
    res.json({
        "status": "success",
        "message": "Data mahasiswa",
        "data": [
            { npm: 222624001, nama: "Angel" },
            { npm: 222624002, nama: "Budi" },
            { npm: 222624003, nama: "Cindy" }
        ]
    });
});

// route /dosen
app.get("/dosen", (req, res) => {
    res.json({
        "status": "success",
        "message": "Data dosen",
        "data": [
            { prodi: "Sistem Informasi", dosen: ["Iis", "Faris","Dafid"] },
            { prodi: "Informatika", dosen: ["Derry", "Siska", "Yohannes"] }
        ]
    });
});


// handle route yg tdk terdaftar
app.use("/", (req,res)=> {
    res.send("<h1>404 Not Found</h1>");
});

// jalankan server
app.listen(port, ()=>{
    console.log(`Server dapat diakses di http://localhost:${port}`);
});
