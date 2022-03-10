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
import {Activity, Course} from '../models';
import {CourseRepository} from '../repositories';

export class CourseActivityController {
  constructor(
    @repository(CourseRepository) protected courseRepository: CourseRepository,
  ) {}

  @get('/courses/{id}/activities', {
    responses: {
      '200': {
        description: 'Array of Course has many Activity through ActivityLink',
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
    return this.courseRepository.activities(id).find(filter);
  }

  @post('/courses/{id}/activities', {
    responses: {
      '200': {
        description: 'create a Activity model instance',
        content: {'application/json': {schema: getModelSchemaRef(Activity)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Course.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activity, {
            title: 'NewActivityInCourse',
            exclude: ['id'],
          }),
        },
      },
    })
    activity: Omit<Activity, 'id'>,
  ): Promise<Activity> {
    return this.courseRepository
      .activities(id)
      .create(activity, {throughData: {modelId: id, modelType: 'Course'}});
  }

  @patch('/courses/{id}/activities', {
    responses: {
      '200': {
        description: 'Course.Activity PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Activity))
    where?: Where<Activity>,
  ): Promise<Count> {
    return this.courseRepository.activities(id).patch(activity, where);
  }

  @del('/courses/{id}/activities', {
    responses: {
      '200': {
        description: 'Course.Activity DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Activity))
    where?: Where<Activity>,
  ): Promise<Count> {
    return this.courseRepository.activities(id).delete(where);
  }
}
