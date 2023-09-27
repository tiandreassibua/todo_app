import { web } from "./app/web.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

web.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
