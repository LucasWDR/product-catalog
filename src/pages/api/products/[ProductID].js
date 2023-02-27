import Product from "@/Models/Product";
import dbConnection from "@/services/dbConnection";

dbConnection();

export default async function handler(req, res) {
    const { method } = req;
    const { ProductID } = req.query;

    switch (method) {
        case "PUT":
            try {
                const { name, value, description, stockQuantity } = req.body;
                if (!name && !value && !description && !stockQuantity) return "inavalid data";
                await Product.updateOne({ _id: ProductID }, { name, value, description, stockQuantity });
                res.status(200).json({ success: true });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, error });
            }
            break;

        case "DELETE":
            try {
                await Product.deleteOne({ _id: ProductID });
                res.status(200).json({ success: true });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, error });
            }
            break;

    }
}