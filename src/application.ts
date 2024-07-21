import express from 'express';
import 'express-async-errors';

import bodyParser from 'body-parser';
import { PublisherType } from 'enums/publisherType.enum';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { Server } from 'http';
import { registerEnumType } from 'type-graphql';
import { MyContext } from 'config/interfaces/context';
import { initOrm, orm, config } from 'config/orm';
import { schema } from 'schema';

// TODO: create service for this
registerEnumType(PublisherType, {
  name: 'PublisherType',
  description: 'Type of the publisher',
});

export default class Application {
  public host: express.Application | null = null;
  public server: Server | null = null;

  public connect = async (): Promise<void> => {
    try {
      await initOrm({config, migrateDb: true});
    } catch (error) {
      console.error('📌 Could not connect to the database', error);
      throw new Error('Failed trying to connect to the database');
    }
  };

  public init = async (): Promise<void> => {
    this.host = express();

    if (process.env.NODE_ENV !== 'production') {
      this.host.get('/graphql', expressPlayground({ endpoint: '/graphql' }));
    }

    this.host.use(cors());

    try {
      this.host.post(
        '/graphql',
        bodyParser.json(),
        graphqlHTTP((req, res) => ({
          schema,
          context: { req, res, em: orm.entityManager.fork() } as MyContext,
          customFormatErrorFn: (error) => {
            throw error;
          },
        })),
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.host.use((error: Error, req: express.Request, res: express.Response): void => {
        console.error('📌 Something went wrong', error);
        res.status(400).send(error);
      });

      const port = process.env.PORT || 4000;
      this.server = this.host.listen(port, () => {
        console.log(`🚀 http://localhost:${port}/graphql`);
      });
    } catch (error) {
      console.error('📌 Could not start server', error);
    }
  };
}
