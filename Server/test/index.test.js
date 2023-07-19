const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

const users = require('../src/utils/users');
const axios = require('axios')

describe("Test de RUTAS", () => {

    const charA = {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1'
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
    }

    const charB = {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: {
            name: 'unknown',
            url: ''
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
    }

    /** ============================ GET CHARACTER ============================ */
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1');
            
            expect(response.body).toEqual({
                id: expect.anything(),
                name: expect.anything(),
                species: expect.anything(),
                gender: expect.anything(),
                status: expect.anything(),
                origin: expect.anything(),
                image: expect.anything()
            });

            // expect(response.body).toHaveProperty('id');
            // expect(response.body).toHaveProperty('name');
            // expect(response.body).toHaveProperty('species');
            // expect(response.body).toHaveProperty('gender');
            // expect(response.body).toHaveProperty('status');
            // expect(response.body).toHaveProperty('origin');
            // expect(response.body).toHaveProperty('image');
        });

        it("Si hay un error responde con status: 404", async () => {
            await agent.get('/rickandmorty/charactter/1').expect(404);
        });
    });

    /** ============================ LOGIN ============================ */
    describe("GET /rickandmorty/login", () => {
        it('Responde con el objeto "{ access: true }" si le pasan un usuario existente por query', async () => {
            const response = await agent.get('/rickandmorty/login?email=ejemplo@gmail.com&password=asd123');

            expect(response.body).toEqual({
                access: true
            });

            expect(users).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: 'ejemplo@gmail.com',
                        password: 'asd123' 
                    })
                ])
            );
        });

        it('Responde con el objeto "{ access: false }" si le pasan un usuario inexistente por query', async () => {
            const response = await agent.get('/rickandmorty/login?email=noexist@gmail.com&password=noexist');

            expect(response.body).toEqual({
                access: false
            });

            expect(users).toEqual(
                expect.not.arrayContaining([
                    expect.objectContaining({
                        email: 'noexist@gmail.com',
                        password: 'noexist' 
                    })
                ])
            );
        });
    });

    /** ============================ POST FAV ============================ */
    describe("POST /rickandmorty/fav", () => {
        it("El personaje que se envie por body debe ser devuelto en un arreglo", async () => {

            const responseA = await agent.post('/rickandmorty/fav').send(charA)
            
            expect(responseA.body).toEqual([
                {...charA}
            ]);
        });
        
        it("Si se envia otro pesonaje, debe retornar un arreglo con ambos personajes", async () => {

            const responseB = await agent.post('/rickandmorty/fav').send(charB)
            
            expect(responseB.body).toEqual([
                {...charA},
                {...charB}
            ]);
        });
    });

    /** ============================ DELETE FAV ============================ */
    describe("DELETE /rickandmorty/fav/:id", () => {
        it("Si no existe el personaje que se desea eliminar, devuelve el mismo arreglo, sin modificaciones", async () => {

            const responseB = await agent.delete('/rickandmorty/fav/999')
            
            expect(responseB.body).toEqual([
                {...charA},
                {...charB}
            ]);
        });

        it("Si existe, devuelve el mismo arreglo filtrado, sin el personaje que se elimino", async () => {

            const responseB = await agent.delete('/rickandmorty/fav/1')
            
            expect(responseB.body).toEqual([
                {...charB}
            ]);
        });
    });
});