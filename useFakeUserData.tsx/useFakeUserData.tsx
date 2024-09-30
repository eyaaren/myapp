import { faker } from '@faker-js/faker';


interface IUser{
    id : string
    name : string
    surname : string
    avatar : string
    email : string
}

export const useFakeUserData =() =>{
    const users: Array <IUser> =[];
    for (let i=0; i<4; i++){
        users.push(
            {
               id: faker.string.uuid(),
               name: faker.person.firstName(),
               surname: faker.person.lastName(),
               avatar: faker.image.avatarLegacy(),
               email: faker.internet.email(),
            }
        )
    }
    return users;
}
