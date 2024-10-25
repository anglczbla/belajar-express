const Prodi = require("../models/prodi");

const getAllProdi = async (req, res) => {
    try {
        // mengambil semua prodi dari database
        const prodi = await Prodi.find().populate("fakultas_id","nama singkatan");
        // mengirim respon dengan status 200 dan data prodi
        res.status(200).json(prodi);
    } catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const getProdiById = async (req, res) => {
    try {
        // mencari prodi berdasarkan id yang diberikan di parameter
        const prodi = await Prodi.findById(req.params.id);
        // jika prodi tidak ditemukan, kirimkan respon 404
        if (!prodi)
            return res.status(404).json({ message: "Prodi not found" });
        // mengirim respon dengan status 200 dan data prodi
        res.status(200).json(prodi);
    } catch (err) {
        // mengirim respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

const createProdi = async (req, res) => {
    // membuat instance prodi baru dari data yang diterima
    const prodi = new Prodi({
        nama: req.body.nama,
        singkatan: req.body.singkatan,
        fakultas_id: req.body.fakultas_id,
    });

    try {
        // menyimpan prodi baru ke database
        const newProdi = await prodi.save();
        // mengirim respon dengan status 201 dan data prodi baru
        res.status(201).json(newProdi);
    } catch (err) {
        // mengirim respon dengan status 400 jika ada kesalahan saat menyimpan
        res.status(400).json({ message: err.message });
    }
};

const updateProdi = async (req, res) => {
    try {
        // mencari prodi berdasarkan id yang diberikan di parameter
        const prodi = await Prodi.findById(req.params.id);
        // jika prodi tidak ditemukan, kirimkan respon 404
        if (!prodi)
            return res.status(404).json({ message: "Prodi not found" });
        
        // memperbarui nama prodi jika ada di request body
        if (req.body.nama != null) {
            prodi.nama = req.body.nama;
        }

        // memperbarui singkatan prodi jika ada di request body
        if (req.body.singkatan != null) {
            prodi.singkatan = req.body.singkatan;
        }

        if (req.body.fakultas_id != null){
            prodi.fakultas_id = req.body.fakultas_id;
        }

        // menyimpan perubahan ke database
        const updatedProdi = await prodi.save();
        // mengirimkan respons dengan status 200 dan data prodi yang diperbarui
        res.status(200).json(updatedProdi);
    } catch (err) {
        // mengirimkan respon dengan status 400 jika ada kesalahan saat memperbarui
        res.status(400).json({ message: err.message });
    }
};

const deleteProdi = async (req, res) => {
    try {
        const prodi = await Prodi.findById(req.params.id);
        // jika prodi tidak ditemukan, kirimkan respon 404
        if (!prodi)
            return res.status(404).json({ message: "Prodi not found" });

        // menghapus prodi dari database
        await prodi.deleteOne();
        // mengirimkan respon dengan status 200 dan pesan penghapusan
        res.status(200).json({ message: "Prodi deleted" });
    } catch (err) {
        // mengirimkan respon dengan status 500 jika terjadi kesalahan
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllProdi, createProdi, getProdiById, updateProdi, deleteProdi };
