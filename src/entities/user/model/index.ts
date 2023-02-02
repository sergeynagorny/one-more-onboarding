import { createEffect } from 'effector';

import { userApi } from 'shared/api';

const getUserFx = createEffect(userApi.getUser);

export const stores = {};

export const events = {};

export const effects = {
    getUserFx,
};
