import { createAuth } from '@keystone-next/auth'
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session'
import 'dotenv/config'
import { config, createSchema } from '@keystone-next/keystone/schema';
import { insertSeedData } from './seed-data';
const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long should they stay signed in
    secret: process.env.COOKIE_SECRET
}

const { withAuth } = createAuth({
    listKey: 'User', // the schema that is responsible for
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password']
        // todo: add inital roles here
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        async onConnect(keystone) {
            console.log('connected to db')
            if (process.argv.includes('--seed-data')) {
                await insertSeedData(keystone);
            }

        }
    },
    lists: createSchema({
        User,
        Product,
        ProductImage
    }),
    ui: {
        isAccessAllowed: ({ session }) => {
            console.log(session, 'session')
            return !!session?.data
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // graphql query
        User: 'id email password'
    })
}))