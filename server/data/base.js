var Base = function (model) {
    var self = this;
    this.model = model;

    Base.prototype.get_by_id = function (id, callback) {
        this.model.findOne({id: id}, function (err, data) {
            return callback(err, data);
        });
    };

    Base.prototype.get_list_page = function (options, fields, sort, page, size, callback) {
        var query = self.model.find(options);
        query.count(function (err, total) {
            if (err) {
                return callback(err);
            }
            query = self.model.find(options, fields);
            query.sort(sort).skip((page - 1) * size).limit(size).exec(function (err, data) {
                if (err) {
                    return callback(err);
                }
                return callback(null, data, total)
            });
        });
    };
};


module.exports = Base;
