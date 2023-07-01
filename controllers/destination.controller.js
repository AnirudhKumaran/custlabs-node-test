import repository from '../repositories/repository';
import dao from '../repositories/dao'

export default class{

    static async createNewDestination(req, res) {
        let postData = req.body
        let items = await repository.createNewDestination(postData);
        return res.send({ items });
    }

    static async deleteDestination(req, res) {
        let {email,url} = req.body
        let items = await repository.deleteDestination(email,url);
        return res.send({ items });
    }

    static async updateDestination(req, res) {}

    static async getAllDestinations(req, res) {
        let items = await repository.getAllDestinations();
        return res.send({ items });
    }

    static async getDestination(req, res) {
        let emailId = req.params.emailId
        console.log("email get:",emailId)
        let items = await repository.getDestinationByEmail(emailId);
        return res.send({ items });
    }

}