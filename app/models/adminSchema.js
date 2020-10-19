class AdminSchema {
    constructor(app) {
        this.app = app;
        this.mongoose = app.mongoose;
        this.Schema = this.mongoose.Schema;
    }
    getModal(){
        const AdminSchema = new this.Schema({
            adminType: { type: Number  },
            loginName: { type: String  },
            loginNickName: { type: String  },
            password: { type: String  },
          });
        
          return this.mongoose.model('admin', AdminSchema);
    }

}

module.exports = AdminSchema;