import {atomWithStorage, createJSONStorage} from 'jotai/utils';

export const tokenAtom = atomWithStorage(
    'token',
    {access_token:'', refresh_token:''},
    createJSONStorage(() => sessionStorage),
);