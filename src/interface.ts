/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

/**
 * @description User-Service parameters
 */
export interface ResDto {
  code?: number;
  result?: string;
  message?: string;
  data?: any;
}