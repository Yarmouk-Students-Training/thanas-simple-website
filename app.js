const { sequelize} = require('./models');

async function build(){
    await sequelize.sync({force: true});
}
build();