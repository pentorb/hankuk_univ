import {atomWithStorage, createJSONStorage} from 'jotai/utils';

export const initMember = {id:'', name:'', password:''};

// 공유할 데이터를 분리하여 선언
export const memberAtom = atomWithStorage(
    'member', // 이름
    initMember, // 초기값
    createJSONStorage(()=>sessionStorage),
);

export const tokenAtom = atomWithStorage(
    'token',
    {access_token:'', refresh_token:''},
    createJSONStorage(() => sessionStorage),
);