import path from "path";
import fs from 'fs';
import { IUser } from "@/types/user";

export const getData = () => {
    const filePath = path.join(process.cwd(), 'src/data', 'users.json');
    let users: IUser[] = [];
    if(!fs.existsSync(filePath)) return null;
    
    const existingData = fs.readFileSync(filePath, 'utf8');
    users = JSON.parse(existingData);

    return users;
}