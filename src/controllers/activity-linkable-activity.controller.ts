import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
ActivityLinkable,
ActivityLinks,
Activity,
} from '../models';
import {ActivityLinkableRepository} from '../repositories';

export class ActivityLinkableActivityController {
  constructor(
    @repository(ActivityLinkableRepository) protected activityLinkableRepository: ActivityLinkableRepository,
  ) { }

  @get('/activity-linkables/{id}/activities', {
    responses: {
      '200': {
        description: 'Array of ActivityLinkable has many Activity through ActivityLinks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Activity)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Activity>,
  ): Promise<Activity[]> {
    return this.activityLinkableRepository.activities(id).find(filter);
  }

  @post('/activity-linkables/{id}/activities', {
    responses: {
      '200': {
        description: 'create a Activity model instance',
        content: {'application/json': {schema: getModelSchemaRef(Activity)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ActivityLinkable.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activity, {
            title: 'NewActivityInActivityLinkable',
            exclude: ['id'],
          }),
        },
      },
    }) activity: Omit<Activity, 'id'>,
  ): Promise<Activity> {
    return this.activityLinkableRepository.activities(id).create(activity);
  }

  @patch('/activity-linkables/{id}/activities', {
    responses: {
      '200': {
        description: 'ActivityLinkable.Activity PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activity, {partial: true}),
        },
      },
    })
    activity: Partial<Activity>,
    @param.query.object('where', getWhereSchemaFor(Activity)) where?: Where<Activity>,
  ): Promise<Count> {
    return this.activityLinkableRepository.activities(id).patch(activity, where);
  }

  @del('/activity-linkables/{id}/activities', {
    responses: {
      '200': {
        description: 'ActivityLinkable.Activity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Activity)) where?: Where<Activity>,
  ): Promise<Count> {
    return this.activityLinkableRepository.activities(id).delete(where);
  }
}
