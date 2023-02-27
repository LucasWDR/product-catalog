import Product from "@/Models/Product";
import dbConnection from "@/services/dbConnection";

dbConnection();

export default async function handler(req, res) {
    const { method } = req;
    const { productId } = req.query;

    switch (method) {
        case "GET":
            try {
                const products = await Product.find({});
                res.status(200).json({ success: true, data: products });
            } catch (error) {
                console.log(error);
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

        case "PUT":
            try {
                const { name, value, description, stockQuantity } = req.body;
                if (!name && !value && !description && !stockQuantity) return "inavalid data";
                await Product.updateOne({ _id: productId }, { name, value, description, stockQuantity });
                res.status(200).json({ success: true });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, error });
            }
            break;

        case "DELETE":
            try {
                await Product.deleteOne({ _id: productId });
                res.status(200).json({ success: true });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, error });
            }
            break;

    }
}