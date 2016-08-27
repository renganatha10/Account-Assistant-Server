import Pawn from './../models/pawndetails';

export default class SearchService {

    getEndDate(endate){
        var endDatespilitedArray = endate.split('-');
        let year = endDatespilitedArray[0];
        let month = endDatespilitedArray[1];
        var endDateInt = parseInt(endDatespilitedArray[2]) + 1;
        return  `${year}-${month}-${endDateInt}`
    }
    
    getPawnDetailsBasedOnQuery(req, res, next) {
        if (req.query.returnDate) {
            let endDate = this.getEndDate(req.query.returnDate);
            req.query.returnDate = {  $gte : new Date(req.query.returnDate) , $lte : new Date(endDate) };
        }
        if(req.query.createdAt){
            let endDate = this.getEndDate(req.query.createdAt);
            req.query.createdAt = {  $gte : new Date(req.query.createdAt) , $lte : new Date(endDate) }
        }
        Pawn.find(req.query).exec((err, pawn) => {
            if (err) {
                return res.send({
                    err: err
                })
            } else {
                return res.json(pawn)
            };
        })
    }
}
