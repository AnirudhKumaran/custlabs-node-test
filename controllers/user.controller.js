import repository from '../repositories/repository';
import dao from '../repositories/dao'

export default class{

    static async createNewUser(req, res) {
        let userData = req.body
        let items = await repository.createNewUser(userData);
        return res.send({ items });
    };

    static async getAllAccounts(req, res) {
        let items = await repository.getAllAccounts();
        return res.send({ items });
    };

    static async getAccount(req, res) {
        let emailId = req.params.emailId
        console.log("email:",emailId)
        let items = await repository.getUserById(emailId);
        return res.send({ items });
    };

    static async removeAccount(req, res) {
        let bodyData = req.body
        let items = await repository.deleteAccount(bodyData.emailId);
        return res.send({ items });
    };

    static async editAccount(req, res) {
        let bodyData = req.body
        let items = await repository.updateAccount(bodyData);
        return res.send({"success":true})
    }

}