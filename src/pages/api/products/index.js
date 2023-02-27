import Product from "@/Models/Product";
import dbConnection from "@/services/dbConnection";

dbConnection();

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const products = await Product.find({});
                res.status(200).json({ success, data: products });
            } catch (error) {
                res.status(500).json({ success: false, error });
            }

            break;

        case "POST":
            try {
                const { name, value, description, stockQuantity } = req.body;

                if (!name && !value && !description && !stockQuantity) throw "invalid data";

                const product = await Product.create({ name, value, description, stockQuantity });

                res.status(201).json({ success: true, data: product })
            } catch (error) {
                res.status(500).json({ success: false, error });
            }

            break;

    }
}