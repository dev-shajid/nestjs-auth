import { SetMetadata } from "@nestjs/common";

export const IS_PUBLICK_KEY = 'IS_PUBLIC'
export const Public = () => SetMetadata(IS_PUBLICK_KEY, true);