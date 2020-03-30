const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('Ong create', ()=>{

    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll(async ()=>{
        await connection.destroy();
    })

    it('Should be able to create a new ONG.', async ()=> {
        const response = await request(app).post('/ongs').send({
            name:"Ong teste Validacao",
            email:"ongValidacao@email.com",
            whatsapp:"8200000000",
            city:"Maceió",
            uf:"AL"
        })
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})