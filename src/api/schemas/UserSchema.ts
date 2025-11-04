import Ajv, { JSONSchemaType } from 'ajv';
import {
  User,
  UserListResponse,
  SingleUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  LoginResponse,
  RegisterResponse,
  ErrorResponse,
} from '../models/User';

const ajv = new Ajv();

const userSchema: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    id: { type: 'number', nullable: true },
    email: { type: 'string', nullable: true },
    first_name: { type: 'string', nullable: true },
    last_name: { type: 'string', nullable: true },
    avatar: { type: 'string', nullable: true },
    name: { type: 'string', nullable: true },
    job: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: false,
};

const userListResponseSchema: JSONSchemaType<UserListResponse> = {
  type: 'object',
  properties: {
    page: { type: 'number' },
    per_page: { type: 'number' },
    total: { type: 'number' },
    total_pages: { type: 'number' },
    data: {
      type: 'array',
      items: userSchema,
    },
    support: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['url', 'text'],
    },
  },
  required: ['page', 'per_page', 'total', 'total_pages', 'data', 'support'],
  additionalProperties: false,
};

const singleUserResponseSchema: JSONSchemaType<SingleUserResponse> = {
  type: 'object',
  properties: {
    data: userSchema,
    support: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        text: { type: 'string' },
      },
      required: ['url', 'text'],
    },
  },
  required: ['data', 'support'],
  additionalProperties: false,
};

const createUserResponseSchema: JSONSchemaType<CreateUserResponse> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    id: { type: 'string' },
    createdAt: { type: 'string' },
  },
  required: ['name', 'job', 'id', 'createdAt'],
  additionalProperties: false,
};

const updateUserResponseSchema: JSONSchemaType<UpdateUserResponse> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['name', 'job', 'updatedAt'],
  additionalProperties: false,
};

const loginResponseSchema: JSONSchemaType<LoginResponse> = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: ['token'],
  additionalProperties: false,
};

const registerResponseSchema: JSONSchemaType<RegisterResponse> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    token: { type: 'string' },
  },
  required: ['id', 'token'],
  additionalProperties: false,
};

const errorResponseSchema: JSONSchemaType<ErrorResponse> = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
  required: ['error'],
  additionalProperties: false,
};

export const validateUserListResponse = ajv.compile(userListResponseSchema);
export const validateSingleUserResponse = ajv.compile(singleUserResponseSchema);
export const validateCreateUserResponse = ajv.compile(createUserResponseSchema);
export const validateUpdateUserResponse = ajv.compile(updateUserResponseSchema);
export const validateLoginResponse = ajv.compile(loginResponseSchema);
export const validateRegisterResponse = ajv.compile(registerResponseSchema);
export const validateErrorResponse = ajv.compile(errorResponseSchema);
