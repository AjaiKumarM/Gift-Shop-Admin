class ApiFeatures {
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{}
        
        this.query.find({...keyword})

        return this
    }

    category(){
        let category = this.queryStr.category ? {
            category:{
                $regex:this.queryStr.category,
                $options:"i"
            }
        }:{}

        this.query.find({...category})

        return this
    }

    filter(){
        let queryStre = {...this.queryStr};
        let removefield = ['keyword','limit','page'];
        removefield.forEach(fileld => delete queryStre[fileld])

        let queryfilter = JSON.stringify(queryStre);
        queryfilter = queryfilter.replace(/\b(gt|gte|lt|lte)/g,match => `$${match}`)

        this.query.find(JSON.parse(queryfilter))
       return this
    }

    pagenation(resperpage){
        let cuurentPage = Number(this.queryStr.page) || 1;
        let skipcount = resperpage * (cuurentPage - 1);

        this.query.limit(resperpage).skip(skipcount);
        return this
    }

   
}

module.exports = ApiFeatures