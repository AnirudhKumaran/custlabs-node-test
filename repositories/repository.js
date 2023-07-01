import njwt from 'njwt';
import dao from './dao';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export default class {

    // static async getUserByUsername(username) {
    //     return dao.get("SELECT * FROM accounts WHERE username =?", [username]);
    // }

    static async getUserById(id) {
        return dao.get('SELECT * FROM accounts WHERE emailId = ?', [id]);
    }

    static async getAllAccounts() {
        return await dao.all("SELECT * FROM accounts", [])
    }

    static async createNewUser(newUserData) {
        let emailId = newUserData.emailId
        let accountName = newUserData.accountName
        let accountId = await bcrypt.hash(emailId, saltRounds);
        let tokenData = {"emailId": emailId, "accountName":accountName, "accountId":accountId}
        let signingKey = "signingKey"      
        let appsecrettoken  = njwt.create(tokenData, signingKey).compact();
        let insertData = [emailId,accountId,accountName,appsecrettoken]
        let query = `INSERT INTO accounts (emailId, accountId, accountName, appsecrettoken) VALUES (?,?,?,?)`
        return dao.run(query,insertData)
    }

    static async deleteAccount(emailId){
        let query = `DELETE FROM accounts where emailId = ?`
        return dao.run(query,[emailId])
    }

    static async updateAccount(updateData){
        let emailId = updateData.emailId
        let accountId = await bcrypt.hash(emailId, saltRounds);
        let accountName = updateData.accountName
        let tokenData = {"emailId": emailId, "accountName":accountName, "accountId":accountId}
        let signingKey = "signingKey"      
        let appsecrettoken  = njwt.create(tokenData, signingKey).compact();
        let insertData = [accountName,appsecrettoken,emailId]
        let query = `UPDATE accounts SET accountName = ?, appsecrettoken = ? WHERE emailId = ?`
        return dao.run(query,insertData)
    }

    static async createNewDestination(destinationData) {
        let insertData = Object.values(destinationData)
        console.log("insertData",insertData)
        let query = `INSERT INTO destination (emailId, destinationUrl, destinationMtd, destinationHeaders) VALUES (?,?,?,?)`
        return dao.run(query,insertData)
    }

    static async deleteDestination(emailId,destUrl){
        console.log()
        let query = `DELETE FROM destination where emailId = ? and destinationUrl = ?`
        return dao.run(query,[emailId,destUrl])
    }

    static async deleteDestinationByEmail(emailId){
        let query = `DELETE FROM destination where emailId = ?`
        return dao.run(query,[emailId])
    }

    static async getAllDestinations() {
        return await dao.all("SELECT * FROM destination", [])
    }

    static async getDestinationByEmail(id) {
        return await dao.get("SELECT * FROM destination where emailId = ?", [id])
    }

    static async updateDestination(updateData){
        let email = updateData.emailId
        let url = updateData.url
        let method = updateData.method
        let headers = updateData.headers
        let valueData = [email,url,method,headers,email,url]
        let query = `UPDATE destination SET emailId = ?, destinationUrl = ?, destinationMtd = ?, destinationHeaders = ?  WHERE emailId = ? and destinationUrl = ?`
        return dao.run(query,valueData)
        
    }

}
