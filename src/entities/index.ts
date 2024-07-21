import { AnyEntity, EntityClass } from '@mikro-orm/postgresql';
import { Author } from './author';
import { Book } from './book';
import { Publisher } from './publisher';
import { Tag } from './tag';

export * from './author';
export * from './book';
export * from './publisher';
export * from './tag';


export const allEntities: EntityClass<AnyEntity>[] = [ 
    Author,
    Book,
    Publisher,
    Tag,
];