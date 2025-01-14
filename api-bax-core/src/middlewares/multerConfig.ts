import { NextFunction, Request, Response } from "express";
import multer, { StorageEngine } from "multer";

export const upload = (fieldName: string) => {
   // console.log(fieldName);
    
    // Konfigurasi penyimpanan file menggunakan memory storage
    const storage: StorageEngine = multer.memoryStorage();

    // Inisialisasi Multer dengan konfigurasi penyimpanan dan validasi
    const uploadFile = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(
                    new Error(
                        "Invalid file type. Only JPG, PNG, and GIF are allowed.",
                    ),
                );
            }
        },
        limits: {
            fileSize: 5 * 1024 * 1024, // Maximum size: 5 MB
        },
    });

    // Middleware untuk menangani upload
    return (req: Request, res: Response, next: NextFunction) => {
        uploadFile.single(fieldName)(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                // Handle Multer-specific errors
                return res
                    .status(400)
                    .json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                // Handle general errors
                return res.status(400).json({ error: err.message });
            }

            // Simpan buffer file di res.locals untuk diproses lebih lanjut
            if (req.file) {
                res.locals.file = {
                    buffer: req.file.buffer, // Buffer file untuk diunggah ke cloud
                    originalname: req.file.originalname, // Nama asli file
                    mimetype: req.file.mimetype, // Tipe MIME
                    size: req.file.size, // Ukuran file
                };
            }

            next();
        });
    };
};


export const uploadLesson = (imageField: string, videoField: string) => {
    // Konfigurasi penyimpanan file menggunakan memory storage
    const storage: StorageEngine = multer.memoryStorage();

    // Inisialisasi Multer dengan konfigurasi penyimpanan dan validasi
    const uploadFile = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            const allowedMimeTypes = [
                "image/jpeg", "image/png", "image/gif",  // Untuk gambar
                "video/mp4", "video/avi", "video/mov"    // Untuk video
            ];
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error("Invalid file type. Only JPG, PNG, GIF, MP4, AVI, and MOV are allowed."));
            }
        },
        limits: {
            fileSize: 20 * 1024 * 1024, // Maksimum ukuran file 30MB
        },
    });

    // Middleware untuk menangani upload
    return (req: Request, res: Response, next: NextFunction) => {
        uploadFile.fields([
            { name: imageField, maxCount: 1 }, // Mendukung upload 1 gambar
            { name: videoField, maxCount: 1 },  // Mendukung upload 1 video
        ])(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(400).json({ error: err.message });
            }

            
            if (req.files && typeof req.files === "object") {
                const files = req.files as { [fieldname: string]: Express.Multer.File[] }; 
                res.locals.files = {
                    image: files[imageField]?.[0],
                    video: files[videoField]?.[0], 
                };
            }
            


           next();
        });
    };
};

// export const upload = (fieldName: string, allowedTypes: string[]) => {
//     const storage: StorageEngine = multer.memoryStorage();
        
//     // Inisialisasi Multer dengan konfigurasi penyimpanan dan validasi
//     const uploadFile = multer({
//         storage: storage,
//         fileFilter: (req, file, cb) => {
//             if (allowedTypes.includes(file.mimetype)) {
//                 cb(null, true);
//             } else {
//                 cb(
//                     new Error(
//                         "Invalid file type. Allowed types: " +
//                             allowedTypes.join(", "),
//                     )
//                 );
//             }
//         },
//         limits: {
//             fileSize: 20 * 1024 * 1024, // Maksimum ukuran file 20MB
//         },
//     });

//     return (req: Request, res: Response, next: NextFunction) => {
//         uploadFile.single(fieldName)(req, res, (err: any) => {
//             if (err instanceof multer.MulterError) {
//                 return res
//                     .status(400)
//                     .json({ error: `Multer error: ${err.message}` });
//             } else if (err) {
//                 return res.status(400).json({ error: err.message });
//             }

//             if (req.file) {
//                 res.locals.file = {
//                     buffer: req.file.buffer,
//                     originalname: req.file.originalname,
//                     mimetype: req.file.mimetype,
//                     size: req.file.size,
//                 };
//             }

//             next();
//         });
//     };
// };
