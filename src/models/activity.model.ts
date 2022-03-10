import {Entity, model, property} from '@loopback/repository';

@model()
export class Activity extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  details?: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  constructor(data?: Partial<Activity>) {
    super(data);
  }
}

export interface ActivityRelations {
  // describe navigational properties here
}

export type ActivityWithRelations = Activity & ActivityRelations;
