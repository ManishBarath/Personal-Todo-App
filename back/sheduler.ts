import { Op } from "sequelize";
import sequelize from "./database";
import Todo from "./users";
import Accounts from "./Accounts";
import { sendDueEmail } from "./mailer";

const today: Date = new Date();

const year: number = today.getFullYear();
const month: string = String(today.getMonth() + 1).padStart(2, '0');
const day: string = String(today.getDate()).padStart(2, '0');

const fDate: string = `${year}-${month}-${day}`;

let userIds:number[];

async function fetchAllDates(fDate:string){

    try{
        await sequelize.sync();
        const datas = Todo.findAll({
            attributes : ['userId'],
            where : {
                Due :  fDate
                
            }
        });
        userIds = (await datas).map( datas => datas.userId);
        await findEmails();

    }catch(error){
        console.error("unable to fetch data",error);
    }
}

let emails:string[];

async function findEmails(){

    try{
        await sequelize.sync();
        const datas = Accounts.findAll({
            attributes : ['email'],
            where : {
                id :  {[Op.in]: userIds}
                
            }
        });

        emails = (await datas).map(data => data.email);
        for(const email of emails){
            await sendDueEmail(email);
        }
    }catch(error){
        console.error("unable to fetch data",error);
    }
}


fetchAllDates(fDate)